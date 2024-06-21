data = pd.read_csv('D:\Projects\FraudDetect\FraudDetector\FraudDetector2\fraudTrain.csv')

data = data.fillna(0)
features = data.drop('isFraud', axis=1)
labels = data['isFraud']

scaler = StandardScaler()
features = scaler.fit_transform(features)

features_train, features_test, labels_train, labels_test = train_test_split(features, labels, test_size=0.2, random_state=42)

model = tf.keras.models.Sequential([
    tf.keras.layers.Dense(1, input_shape=(features.shape[1],), activation='sigmoid')
])

model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])

model.fit(features_train, labels_train, epochs=10)

loss, accuracy = model.evaluate(features_test, labels_test)
print(f'Loss: {loss}, Accuracy: {accuracy}')
