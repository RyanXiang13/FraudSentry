from fastapi import FastAPI, File, UploadFile, HTTPException
from pydantic import BaseModel
from typing import List
import pandas as pd
import requests
import io
import os
import logging
import joblib
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from tensorflow.keras.models import load_model

# CONSTANTS ------------------------------------------------------

threshold = 0.5  # above it is likely fraudulent, vice versa

# ----------------------------------------------- CONSTANTS END

app = FastAPI()
data = pd.read_csv('./data/fraudTrain.csv')
city_pop_data = pd.read_csv('./data/us_cities.csv')
model = load_model('./model/fraud_detection_model.keras')

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Item configuration the form submits


class UserData(BaseModel):
    gender: str
    job: str
    state: str
    city: str
    age: int


def get_city_population(city: str) -> int:
    population_row = city_pop_data[city_pop_data['city'] == city]
    if not population_row.empty:
        return int(population_row['population'].values[0])
    return -1

# Match number of input features with model features


def align_input_data(input_data, expected_features):
    # Convert input data to DataFrame if it is not already
    if isinstance(input_data, dict):
        input_data = pd.DataFrame([input_data])
    elif isinstance(input_data, list):
        input_data = pd.DataFrame(input_data)

    # Add missing columns with default values
    for feature in expected_features:
        if feature not in input_data.columns:
            if 'gender' in feature or 'job' in feature or 'state' in feature or 'city' in feature:
                # Default for categorical features
                input_data[feature] = 'Unknown'
            else:
                input_data[feature] = 0  # Default for numeric features

    # Ensure the columns are in the correct order
    input_data = input_data[expected_features]
    return input_data

# Preprocessing function


def preprocess_data(data: pd.DataFrame, preprocessor):
    expected_features = ['amt', 'gender', 'job',
                         'state', 'age', 'city', 'city_pop']
    aligned_data = align_input_data(data, expected_features)
    X_processed = preprocessor.transform(aligned_data)
    return X_processed

# Predicting function


def get_predictions():
    data_contents = pd.read_csv('./data/data_combined.csv')
    preprocessor = joblib.load('preprocessor.pkl')
    X_processed = preprocess_data(data_contents, preprocessor)

    raw_predictions = model.predict(
        X_processed).tolist()  # Predict using the model
    predictions = [prob[0] for prob in raw_predictions]
    return predictions


@app.get("/retrieve/", status_code=202)
async def get_jobs():
    try:
        job_list = set(data['job'])
        return job_list
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@app.post("/upload/", status_code=202)
async def upload_file(file: UploadFile = File(...)):
    content = await file.read()
    data_contents = pd.read_csv(io.BytesIO(content))

    if 'amt' not in data_contents.columns:
        raise HTTPException(
            status_code=400, detail="Missing 'amt' column. Fix this properly in the conversion (backend function: upload_file)")

    # Save the amounts to a temporary csv file
    data_contents.to_csv('./data/data_template.csv', index=False)
    return {"message": "File uploaded successfully"}


@app.put("/combine/", status_code=202)
async def combine_data(user_data: UserData):
    if not os.path.exists('./data/data_template.csv'):
        raise HTTPException(
            status_code=400, detail="No transaction data found. Please upload a proper CSV file first.")

    data_contents = pd.read_csv('./data/data_template.csv')
    data_contents['gender'] = user_data.gender
    data_contents['job'] = user_data.job
    data_contents['state'] = user_data.state
    data_contents['age'] = user_data.age
    data_contents['city'] = user_data.city

    # Get city population
    data_contents['city_pop'] = get_city_population(user_data.city)

    if data_contents['city_pop'].empty:
        raise HTTPException(
            status_code=404, detail="City population not found.")

    data_contents.to_csv('./data/data_combined.csv', index=False)
    return {"message": "Data has been succesfully combined, it is now ready for prediction."}

# Endpoint for making predictions


@app.get("/predict/", status_code=202)
async def predict():
    if not os.path.exists('./data/data_combined.csv'):
        raise HTTPException(
            status_code=400, detail="No combined data found. Please ensure the uploaded CSV contains the transaction amounts.")

    predictions = get_predictions()
    # Convert the probabilities into something more meaningful
    return {"Fraud": predictions}

# Start the API via uvicorn
if __name__ == "__api__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000, log_level="info")
