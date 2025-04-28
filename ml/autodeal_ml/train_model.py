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
CURRENT_YEAR = 2025


def train_and_save_model():
    # 1. Load and clean data
    df = pd.read_csv(DATA_PATH)
    df = df.dropna(subset=['price'])
    df = df[df['price'] <= df['price'].quantile(0.99)]

    # 2. Normalize text columns
    for col in df.select_dtypes(include='object').columns:
        df[col] = df[col].str.lower()

    # 3. Feature engineering
    df['age'] = CURRENT_YEAR - df['year']
    df['log_distance'] = np.log1p(df['distance'])
    df['km_per_year'] = df['distance'] / df['age'].replace(0, 1)

    # 4. Prepare features and target
    cat_feats = ['category_name','model','car_type','gear_type','color','vehicle_type']
    num_feats = ['age','log_distance','km_per_year']
    features = cat_feats + num_feats
    X = df[features]
    y = df['price']

    # 5. Train/test split
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # 6. Build preprocessing pipelines
    num_pipe = Pipeline([
        ('imputer', SimpleImputer(strategy='median')),
        ('scaler', StandardScaler())
    ])
    cat_pipe = Pipeline([
        ('imputer', SimpleImputer(strategy='constant', fill_value='missing')),
        ('ohe', OneHotEncoder(handle_unknown='ignore', sparse_output=False))
    ])
    preprocessor = ColumnTransformer([
        ('num', num_pipe, num_feats),
        ('cat', cat_pipe, cat_feats)
    ], sparse_threshold=0)

    # 7. Create and train model pipeline
    pipeline = Pipeline([
        ('prep', preprocessor),
        ('reg', HistGradientBoostingRegressor(random_state=42, early_stopping=True))
    ])
    pipeline.fit(X_train, y_train)

    # 8. Evaluate
    preds = pipeline.predict(X_test)
    rmse = np.sqrt(mean_squared_error(y_test, preds))
    print(f"Test RMSE: {rmse:.2f}")

    # 9. Save pipeline
    joblib.dump(pipeline, MODEL_PATH)
    print(f"Model saved to {MODEL_PATH}")


if __name__ == '__main__':
    train_and_save_model()
