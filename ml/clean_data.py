import pandas as pd
import numpy as np
import re

# Paths
RAW_JSON  = '/Users/maryam/Desktop/Auto-Deal-main/ml/data/car_data.json'
CLEAN_CSV = '/Users/maryam/Desktop/Auto-Deal-main/ml/data/cleaned_car_data.csv'

# Columns to keep (excluding 'engine' since it's not present)
KEEP_COLS = [
    'category_name', 'price', 'model', 'car_type',
    'year', 'distance', 'gear_type', 'color',
    'vehicle_type'
]

def clean_data():
    # 1. Load raw JSON
    df = pd.read_json(RAW_JSON)

    # 2. Drop listings priced in UZS (sum) by detecting 'UZS' or 'сум'
    mask_uzs = df['price'].str.contains(r'UZS|сум', case=False, na=False)
    print(f"Dropping {mask_uzs.sum()} rows priced in UZS/soum…")
    df = df.loc[~mask_uzs].copy()

    # 3. Clean the price column (extract digits)
    def clean_price(p):
        if isinstance(p, str):
            cleaned = re.sub(r"[^0-9]", "", p)
            return int(cleaned) if cleaned else np.nan
        return np.nan

    df['price'] = df['price'].apply(clean_price)

    # 4. Clean the distance/mileage column
    def clean_mileage(d):
        if isinstance(d, str):
            s = d.replace(' ', '').replace('км', '')
            try:
                return int(s)
            except ValueError:
                return np.nan
        return np.nan

    df['distance'] = df['distance'].apply(clean_mileage)

    # 5. Drop rows with invalid price or distance
    df = df[df['price'].notna() & (df['price'] > 0)]
    df = df[df['distance'].notna() & (df['distance'] >= 0)]

    # 6. Keep only the specified columns
    existing = [c for c in KEEP_COLS if c in df.columns]
    missing = set(KEEP_COLS) - set(existing)
    if missing:
        print(f"⚠️  Missing columns, skipped: {missing}")
    df = df[existing]

    # 7. Reset index
    df = df.reset_index(drop=True)

    # 8. Save cleaned dataset
    df.to_csv(CLEAN_CSV, index=False)
    print(f"Cleaned dataset saved to '{CLEAN_CSV}'")

if __name__ == '__main__':
    clean_data()
