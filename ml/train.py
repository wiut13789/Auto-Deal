import pandas as pd
import numpy as np
import joblib

from sklearn.model_selection import train_test_split
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.ensemble import HistGradientBoostingRegressor
from sklearn.metrics import mean_squared_error

# Config
DATA_PATH  = 'data/cleaned_car_data.csv'
MODEL_PATH = 'models/auto_deal_final.pkl'

def train_and_save_model():
    df = pd.read_csv(DATA_PATH)
    df = df.dropna(subset=['price'])

    # 1. Desired features
    desired_feats = [
        'category_name', 'model', 'car_type',
        'year', 'distance', 'gear_type',
        'color', 'engine', 'vehicle_type'
    ]

    # 2. Filter only those that actually exist in the CSV
    features = [c for c in desired_feats if c in df.columns]
    missing = set(desired_feats) - set(features)
    if missing:
        print(f"⚠️  Columns not found and will be skipped: {missing}")

    X = df[features]
    y = df['price']

    # 3. Split numeric vs categorical
    NUM_FEATS = [c for c in features if pd.api.types.is_numeric_dtype(df[c])]
    CAT_FEATS = [c for c in features if c not in NUM_FEATS]

    print(f"Numeric feats:     {NUM_FEATS}")
    print(f"Categorical feats: {CAT_FEATS}")

    # 4. Train/test split
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )

    # 5. Preprocessing
    num_pipe = Pipeline([
        ('impute', SimpleImputer(strategy='median')),
        ('scale',   StandardScaler())
    ])
    cat_pipe = Pipeline([
        ('impute', SimpleImputer(strategy='constant', fill_value='missing')),
        ('onehot', OneHotEncoder(handle_unknown='ignore', sparse_output=False))
    ])
    preprocessor = ColumnTransformer([
        ('num', num_pipe, NUM_FEATS),
        ('cat', cat_pipe, CAT_FEATS),
    ], sparse_threshold=0)

    # 6. Combine with a fast single model
    model = Pipeline([
        ('pre', preprocessor),
        ('reg', HistGradientBoostingRegressor(random_state=42))
    ])

    # 7. Train & evaluate
    model.fit(X_train, y_train)
    preds = model.predict(X_test)
    rmse = np.sqrt(mean_squared_error(y_test, preds))
    print(f"Test RMSE: {rmse:.2f}")

    # 8. Save
    joblib.dump(model, MODEL_PATH)
    print(f"Model saved to {MODEL_PATH}")

if __name__ == '__main__':
    train_and_save_model()
