import pandas as pd
import numpy as np
import joblib

# Config
ARTIFACT_PATH = 'autodeal_ml/models/auto_deal_final.pkl'  # Path to saved LightGBM artifacts
CURRENT_YEAR  = 2025

# 1. Load model, scaler, and mean encodings
def load_artifacts():
    data = joblib.load(ARTIFACT_PATH)
    if not isinstance(data, dict):
        raise ValueError("Expected a dict with 'model','scaler','mean_encodings'.")
    return data['model'], data['scaler'], data['mean_encodings']

_model, _scaler, _encodings = load_artifacts()

# 2. Mapping from incoming payload to training raw feature names
KEY_MAP = {
    'brand':           'category_name',
    'bodyType':        'car_type',
    'kilometers':      'distance',
    'transmissionType':'gear_type',
    'fuelType':        'vehicle_type'
}

# 3. Define feature lists
NUM_FEATS      = ['age', 'log_km', 'km_per_year']
CAT_COLS       = ['category_name', 'model', 'car_type', 'gear_type', 'color', 'vehicle_type', 'brand_body']
ENCODE_FEATS   = [f'{c}_te' for c in CAT_COLS]

# 4. Prediction function
def predict_price(payload: dict) -> float:
    # a) Build DataFrame and rename fields
    df = pd.DataFrame([payload]).rename(columns=KEY_MAP)

    # b) Derived numeric features
    df['age']         = CURRENT_YEAR - df['year'].astype(int)
    df['log_km']      = np.log1p(df['distance'].astype(float))
    df['km_per_year'] = df['distance'].astype(float) / df['age'].replace(0, 1)

    # c) Interaction feature
    df['brand_body'] = df['category_name'] + '_' + df['car_type']

    # d) Target (mean) encode each categorical
    for col in CAT_COLS:
        te_series = _encodings.get(col)
        if isinstance(te_series, pd.Series):
            mapping = te_series
            global_mean = te_series.mean()
        else:
            mapping = {}
            global_mean = 0.0
        df[f'{col}_te'] = df[col].map(mapping).fillna(global_mean)

    # e) Assemble numeric matrix and scale
    X_num = df[NUM_FEATS].values
    X_num_scaled = _scaler.transform(X_num)

    # f) Assemble encoded features
    X_enc = df[ENCODE_FEATS].values

    # g) Final feature matrix
    X = np.hstack([X_num_scaled, X_enc])

    # h) Predict
    pred = _model.predict(X)
    return float(pred[0])

# 5. Standalone test
if __name__ == '__main__':
    sample = {
        'brand':           'Leapmotor',
        'model':           'C11 EV',
        'year':            2023,
        'kilometers':      12000,
        'bodyType':        'sedan',
        'fuelType':        'electric',
        'transmissionType':'automatic',
        'color':           'black'
    }
    price = predict_price(sample)
    print(f"Predicted price: ${price:,.2f}")