import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error
from sklearn.preprocessing import StandardScaler
import lightgbm as lgb
from lightgbm import LGBMRegressor
import joblib

# Configuration
DATA_PATH  = 'autodeal_ml/data/cleaned_car_data.csv'
MODEL_PATH = 'autodeal_ml/models/auto_deal_final.pkl'
CURRENT_YEAR = 2025

# 1. Load cleaned data
df = pd.read_csv(DATA_PATH)

# 2. Outlier trimming: drop top 5% most expensive
price_cutoff = df['price'].quantile(0.95)
df = df[df['price'] <= price_cutoff].copy()

# 3. Feature engineering
# Basic transforms
df['age'] = CURRENT_YEAR - df['year']
df['log_km'] = np.log1p(df['distance'])
df['km_per_year'] = df['distance'] / df['age'].replace(0, 1)
# Interaction term
df['brand_body'] = df['category_name'] + '_' + df['car_type']

# 4. Target (mean) encoding for categorical features
target = 'price'
cat_cols = ['category_name', 'model', 'car_type', 'gear_type', 'color', 'vehicle_type', 'brand_body']
for col in cat_cols:
    df[f'{col}_te'] = df.groupby(col)[target].transform('mean')

# 5. Prepare feature matrix X and target y
numeric_feats = ['age', 'log_km', 'km_per_year']
encoded_feats = [f'{col}_te' for col in cat_cols]
features = numeric_feats + encoded_feats
X = df[features]
y = df[target]

# 6. Train/test split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# 7. Scale numeric features safely using .loc
scaler = StandardScaler()
X_train.loc[:, numeric_feats] = scaler.fit_transform(X_train[numeric_feats])
X_test.loc[:, numeric_feats] = scaler.transform(X_test[numeric_feats])

# 8. Train LightGBM with early stopping via callbacks
model = LGBMRegressor(
    n_estimators=1000,
    learning_rate=0.05,
    random_state=42
)
model.fit(
    X_train,
    y_train,
    eval_set=[(X_test, y_test)],
    eval_metric='rmse',
    callbacks=[
        lgb.early_stopping(stopping_rounds=50),
        lgb.log_evaluation(period=0)
    ]
)

# 9. Evaluate (compute RMSE manually)
y_pred = model.predict(X_test)
mse = mean_squared_error(y_test, y_pred)
rmse = np.sqrt(mse)
print(f'Test RMSE: {rmse:.2f}')

# 10. Save model and scaler and encodings
joblib.dump({
    'model': model,
    'scaler': scaler,
    'mean_encodings': {col: df.groupby(col)[target].mean() for col in cat_cols}
}, MODEL_PATH)
print(f'Model saved to {MODEL_PATH}')
# import pandas as pd
# import numpy as np
# from sklearn.model_selection import train_test_split
# from sklearn.metrics import mean_squared_error
# from sklearn.preprocessing import StandardScaler
# import lightgbm as lgb
# from lightgbm import LGBMRegressor
# import joblib

# # Configuration
# DATA_PATH  = 'autodeal_ml/data/cleaned_car_data.csv'
# MODEL_PATH = 'autodeal_ml/models/auto_deal_final.pkl'
# CURRENT_YEAR = 2025

# # 1. Load cleaned data
# df = pd.read_csv(DATA_PATH)

# # 2. Outlier trimming: drop top 5% most expensive
# price_cutoff = df['price'].quantile(0.95)
# df = df[df['price'] <= price_cutoff].copy()

# # 3. Feature engineering
# # Basic transforms
# df['age'] = CURRENT_YEAR - df['year']
# df['log_km'] = np.log1p(df['distance'])
# df['km_per_year'] = df['distance'] / df['age'].replace(0, 1)
# # Interaction term
# df['brand_body'] = df['category_name'] + '_' + df['car_type']

# # 4. Target (mean) encoding for categorical features
# target = 'price'
# cat_cols = ['category_name', 'model', 'car_type', 'gear_type', 'color', 'vehicle_type', 'brand_body']
# for col in cat_cols:
#     df[f'{col}_te'] = df.groupby(col)[target].transform('mean')

# # 5. Prepare feature matrix X and target y
# numeric_feats = ['age', 'log_km', 'km_per_year']
# encoded_feats = [f'{col}_te' for col in cat_cols]
# features = numeric_feats + encoded_feats
# X = df[features]
# y = df[target]

# # 6. Train/test split
# X_train, X_test, y_train, y_test = train_test_split(
#     X, y, test_size=0.2, random_state=42
# )

# # 7. Scale numeric features safely using .loc
# scaler = StandardScaler()
# X_train.loc[:, numeric_feats] = scaler.fit_transform(X_train[numeric_feats])
# X_test.loc[:, numeric_feats] = scaler.transform(X_test[numeric_feats])

# # 8. Train LightGBM with early stopping via callbacks
# model = LGBMRegressor(
#     n_estimators=1000,
#     learning_rate=0.05,
#     random_state=42
# )
# model.fit(
#     X_train,
#     y_train,
#     eval_set=[(X_test, y_test)],
#     eval_metric='rmse',
#     callbacks=[
#         lgb.early_stopping(stopping_rounds=50),
#         lgb.log_evaluation(period=0)
#     ]
# )

# # 9. Evaluate (compute RMSE manually)
# y_pred = model.predict(X_test)
# mse = mean_squared_error(y_test, y_pred)
# rmse = np.sqrt(mse)
# print(f'Test RMSE: {rmse:.2f}')

# # 10. Save model and scaler and encodings
# joblib.dump({
#     'model': model,
#     'scaler': scaler,
#     'mean_encodings': {col: df.groupby(col)[target].mean() for col in cat_cols}
# }, MODEL_PATH)
# print(f'Model saved to {MODEL_PATH}')