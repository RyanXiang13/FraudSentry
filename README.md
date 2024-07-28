#### link to training dataset: https://www.kaggle.com/datasets/kartik2112/fraud-detection?select=fraudTrain.csv

FraudSentry
FraudSentry is an advanced fraud detection system designed to analyze credit card statements and identify potential fraudulent activities. The system is built using a combination of machine learning for fraud detection and a user-friendly React frontend for data input and visualization.

# FraudSentry

FraudSentry is an advanced fraud detection system designed to analyze credit card statements and identify potential fraudulent activities. The system is built using a combination of machine learning for fraud detection and a user-friendly React frontend for data input and visualization.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## Features

- **Fraud Detection**: Utilizes machine learning models to identify potentially fraudulent transactions.
- **User-Friendly Interface**: React-based frontend allows users to input data and receive results intuitively.
- **Dynamic Search**: Live search functionality for job and city inputs, enhancing user experience.
- **Data Privacy**: Secure handling of user data and sensitive information.

## Installation

### Prerequisites

- **Node.js**: Version 12 or higher
- **Python**: Version 3.7 or higher
- **npm**: Package manager for Node.js
- **pip**: Package manager for Python
- **Virtual Environment**: Recommended for Python dependencies

### Backend Installation

1. **Clone the Repository**
   ```bash
   
   git clone https://github.com/yourusername/FraudSentry.git
   cd FraudSentry/backend

2. **Set Up Python Virtual Environment**
   ```bash
  
   python3 -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`

3. **Install Backend Dependencies**
   ```bash

   pip install -r requirements.txt

4. **Run Backend Server**
   ```bash

   uvicorn api:app --reload

### Frontend Installation

1. **Navigate to Frontend Directory**
   ```bash

   cd ../frontend

2. **Install Frontend Dependencies**
   ```bash

   npm install

3. **Run Frontend Server**
   ```bash

   npm start

## Usage

1. Start the backend and frontend servers as described in the installation section.
2. Navigate to the frontend URL, typically http://localhost:3000.
3. Use the application to input credit card statement data.
4. View the fraud detection results displayed after submission.

## License

This project is licensed under the MIT License - see the LICENSE file for details.



  
   
