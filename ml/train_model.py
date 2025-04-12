import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import LabelEncoder
import joblib

# Load the dataset
df = pd.read_csv("data/car_data.csv")

# # Clean and prepare the data
# df.dropna(inplace=True)
# df["brand_encoded"] = LabelEncoder().fit_transform(df["brand"])

# X = df[["brand_encoded", "year", "mileage"]]
# y = df["price"]

# # Split into training and test sets
# X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# # Train a model
# model = RandomForestRegressor()
# model.fit(X_train, y_train)

# # Evaluate (optional)
# score = model.score(X_test, y_test)
# print(f"Model R² Score: {score:.2f}")

# # Save model and encoder
# joblib.dump(model, "outputs/car_price_model.pkl")
# print("✅ Model saved successfully!")
print(df.columns)
