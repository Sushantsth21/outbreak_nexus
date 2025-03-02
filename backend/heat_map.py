import pandas as pd
import json
import numpy as np

# Read CSV file and standardize column names (strip spaces and convert to lower case)
csv_file = "data/5_diseases_cases.csv"
df = pd.read_csv(csv_file)
df.columns = [col.strip().lower() for col in df.columns]
print("CSV columns:", df.columns.tolist())

# Use the appropriate country column (here 'country_x')
if 'country_x' in df.columns:
    country_col = 'country_x'
else:
    raise ValueError("No 'country_x' column found in CSV file.")

# Identify disease columns (all columns except the country column)
disease_columns = [col for col in df.columns if col != country_col]

# Read GeoJSON file
geojson_file = "data/countries.geojson"
with open(geojson_file, "r") as f:
    geo_data = json.load(f)

# Function to compute decibel value
def compute_decibel(cases):
    try:
        cases = float(cases)
    except (ValueError, TypeError):
        return 0
    return 10 * np.log10(cases) if cases > 0 else 0

# Loop over each feature in the GeoJSON file
for feature in geo_data.get("features", []):
    # Attempt to get the country name from the feature properties.
    country_name = feature["properties"].get("ADMIN") or feature["properties"].get("name")
    if country_name:
        country_name = country_name.strip().lower()
    
    # Find a matching row in the CSV (using case-insensitive matching)
    row = df[df[country_col].str.lower() == country_name] if country_name else pd.DataFrame()

    if not row.empty:
        row_data = row.iloc[0]
        for disease in disease_columns:
            cases = row_data[disease]
            dB_value = compute_decibel(cases)
            feature["properties"][f"{disease}_dB"] = dB_value
    else:
        # If no matching country, set decibel values to 0 for all diseases.
        for disease in disease_columns:
            feature["properties"][f"{disease}_dB"] = 0

# Write the updated GeoJSON to a new file
output_geojson = "updated_countries.geojson"
with open(output_geojson, "w") as f:
    json.dump(geo_data, f)

print(f"Updated GeoJSON saved to {output_geojson}")
