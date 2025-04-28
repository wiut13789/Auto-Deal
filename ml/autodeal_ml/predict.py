import pandas as pd
import numpy as np
import joblib
from pathlib import Path

# Config
# MODEL_PATH = 'autodeal_ml/models/auto_deal_final.pkl'

MODEL_PATH = Path(__file__).parent / "models" / "auto_deal_final.pkl"
CURRENT_YEAR = 2025

# Load trained pipeline
_pipeline = joblib.load(MODEL_PATH)

# Map incoming payload keys to training feature names
KEY_MAP = {
    'brand': 'category_name',
    'bodyType': 'car_type',
    'kilometers': 'distance',
    'transmissionType': 'gear_type',
    'fuelType': 'vehicle_type'
}

# Feature order used during training
ALL_FEATURES = [
    'category_name', 'model', 'car_type', 'gear_type',
    'color', 'vehicle_type', 'age', 'log_distance', 'km_per_year'
]


def predict_price(payload: dict) -> float:
    """
    Predict car price given payload keys:
      brand, model, year, kilometers, bodyType, fuelType, transmissionType, color
    """
    # Build DataFrame and rename columns
    df = pd.DataFrame([payload]).rename(columns=KEY_MAP)

    # Lowercase all text columns
    for col in df.select_dtypes(include='object').columns:
        df[col] = df[col].str.lower()

    # Feature engineering
    df['age'] = CURRENT_YEAR - df['year'].astype(int)
    df['log_distance'] = np.log1p(df['distance'].astype(float))
    df['km_per_year'] = df['distance'].astype(float) / df['age'].replace(0, 1)

    # Select features in correct order
    X = df[ALL_FEATURES]

    # Pipeline does preprocessing & prediction
    pred = _pipeline.predict(X)
    return float(pred[0])


if __name__ == '__main__':
    sample = {
        'brand': 'chevrolet',
        'model': 'cobalt',
        'year': '2025',
        'kilometers': '0',
        'bodyType': 'Sedan',
        'fuelType': 'Gasoline',
        'transmissionType': 'Automatic',
        'color': 'Black'
    }
    price = predict_price(sample)
    print(f"Predicted price: ${price:,.2f}")
