import pandas as pd
import numpy as np
import joblib

# Config
MODEL_PATH   = 'models/auto_deal_final.pkl'

# Load the trained model pipeline

def load_model():
    """
    Load and return the trained Auto-Deal pipeline.
    """
    return joblib.load(MODEL_PATH)

# Initialize global model instance
_model = load_model()

# Expected features for prediction
EXPECTED_FEATURES = [
    'category_name', 'model', 'car_type',
    'year', 'distance', 'gear_type',
    'color', 'vehicle_type'
]

# Mapping from incoming payload keys to model feature names
KEY_MAPPING = {
    'brand': 'category_name',
    'bodyType': 'car_type',
    'kilometers': 'distance',
    'transmissionType': 'gear_type',
    'fuelType': 'vehicle_type'
}


def predict_price(payload: dict) -> float:
    """
    Given a dict payload with keys like 'brand', 'model', 'year', 'kilometers',
    'bodyType', 'fuelType', 'transmissionType', 'color', returns the predicted price.
    """
    # Build DataFrame from payload
    df = pd.DataFrame([payload])

    # Rename keys to match training features
    df = df.rename(columns=KEY_MAPPING)

    # Ensure all expected features exist
    for col in EXPECTED_FEATURES:
        if col not in df.columns:
            df[col] = np.nan

    # Select in correct order
    X = df[EXPECTED_FEATURES]

    # Predict
    price = float(_model.predict(X)[0])
    return price


# Standalone test
if __name__ == '__main__':
    sample_payload = {
        'brand': 'Leapmotor',
        'model': 'C16',
        'year': 2024,
        'kilometers': 0,
        'bodyType': 'Другой',
        'fuelType': 'Гибрид',
        'transmissionType': 'Автоматическая',
        'color': 'Зеленый'
    }
    pred = predict_price(sample_payload)
    print(f"Predicted price: ${pred:,.2f}")
