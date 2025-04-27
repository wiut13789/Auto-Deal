import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.ensemble import HistGradientBoostingRegressor
from sklearn.metrics import mean_squared_error
import joblib

# Config
DATA_PATH  = 'data/cleaned_car_data.csv'
MODEL_PATH = 'models/auto_deal_final.pkl'

def train_and_save_model():
    # 1. Load & drop any rows missing the target
    df = pd.read_csv(DATA_PATH)
    df = df.dropna(subset=['price'])

    # 2. Select only these columns
    features = [
        'category_name', 'model', 'car_type',
        'year', 'distance', 'gear_type',
        'color', 'engine', 'vehicle_type'
    ]
    X = df[features]
    y = df['price']

    # 3. Split into numeric vs categorical
    NUM_FEATS = ['year', 'distance', 'engine']
    CAT_FEATS = [
        'category_name', 'model', 'car_type',
        'gear_type', 'color', 'vehicle_type'
    ]

    # 4. Train/test split
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )

    # 5. Preprocessing pipelines
    num_pipe = Pipeline([
        ('imputer', SimpleImputer(strategy='median')),
        ('scaler',   StandardScaler())
    ])
    cat_pipe = Pipeline([
        ('imputer', SimpleImputer(strategy='constant', fill_value='missing')),
        ('onehot',  OneHotEncoder(handle_unknown='ignore', sparse_output=False))
    ])
    preprocessor = ColumnTransformer([
        ('num', num_pipe, NUM_FEATS),
        ('cat', cat_pipe, CAT_FEATS),
    ], sparse_threshold=0)

    # 6. Full pipeline with HGB regressor
    model = Pipeline([
        ('preprocessor', preprocessor),
        ('regressor',    HistGradientBoostingRegressor(random_state=42))
    ])

    # 7. Train
    model.fit(X_train, y_train)

    # 8. Evaluate