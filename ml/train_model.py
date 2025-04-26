import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
import joblib

df = pd.read_csv('data/cleaned_car_data.csv') 
print(df.columns)



def clean_mileage(distance):
    if isinstance(distance, str):
        distance = distance.replace(' ', '').replace('км', '')
        try:
            return int(distance)
        except ValueError:
            return 0  # or np.nan if you prefer
    elif pd.isna(distance):
        return 0  # or np.nan
    else:
        return int(distance)

# Apply the cleaning function to the mileage column
df['distance'] = df['distance'].apply(clean_distance)

# Define the features (X) and target (y)
X = df.drop('price', axis=1)  # All columns except 'price' are features
y = df['price']  # 'price' is the target variable

# Handle missing values if any (optional, based on your dataset)
X = X.dropna()  # Remove rows with missing feature values
y = y[X.index]  # Make sure the target is aligned with the features

# Split the data into training and testing sets (80% training, 20% testing)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# List of categorical columns
categorical_cols = ['category_name', 'model', 'gear_type', 'color', 'vehicle_type', 'car_type']

# Create the preprocessing step (one-hot encoding for categorical columns)
preprocessor = ColumnTransformer(
    transformers=[
        ('cat', OneHotEncoder(), categorical_cols)
    ], 
    remainder='passthrough'  # Keep other columns as is
)

# Create a pipeline with preprocessing and Random Forest model
pipeline = Pipeline(steps=[
    ('preprocessor', preprocessor),
    ('regressor', RandomForestRegressor(n_estimators=100, random_state=42))
])

# Train the model
pipeline.fit(X_train, y_train)

# Predict on the test set
y_pred = pipeline.predict(X_test)

# Evaluate the model
mae = mean_absolute_error(y_test, y_pred)
mse = mean_squared_error(y_test, y_pred)

# Print the results
print(f'Mean Absolute Error: {mae}')
print(f'Mean Squared Error: {mse}')

# Optionally, save the model using joblib
joblib.dump(pipeline, 'car_price_predictor_model.pkl')
