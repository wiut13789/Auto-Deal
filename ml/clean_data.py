import pandas as pd
import numpy as np
import re

# Load the raw data
df = pd.read_json('/Users/maryam/Desktop/Auto-Deal-main/ml/data/car_data.json')

def clean_engine(engine):
    if isinstance(engine, str):
        # Keep only numbers
        cleaned_engine = re.sub(r"[^\d]", "", engine)
        return int(cleaned_engine) if cleaned_engine else None
    return engine
df['engine'] = df['engine'].apply(clean_engine)

# Clean price column
def clean_price(price):
    if isinstance(price, str):
        # Remove any non-numeric characters (including spaces and currency symbols)
        cleaned_price = re.sub(r"[^\d]", "", price)
        # Convert the cleaned price to an integer
        return int(cleaned_price) if cleaned_price != '' else np.nan
    return np.nan

df['price'] = df['price'].apply(clean_price)

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
df['distance'] = df['distance'].apply(clean_mileage)

# Drop rows with missing or zero prices
df = df[df['price'] > 0]


# Drop other unnecessary columns (example columns to drop)
columns_to_drop = ['num', 'title', 'ad_id', 'publication_type', 'date_of_publication', 'product_link', 'description', 'status']
df = df.drop(columns=columns_to_drop)

# Optionally, you can reset the index after dropping rows
df = df.reset_index(drop=True)

# Save the cleaned data to a new CSV file
df.to_csv('/Users/maryam/Desktop/Auto-Deal-main/ml/data/cleaned_car_data.csv', index=False)

print(" Cleaned dataset saved to 'data/cleaned_car_data.csv'")
