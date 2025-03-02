import pandas as pd
def read_data(file_path):
    df = pd.read_csv(file_path)
    df['Percent_Vaccinated_Measles'] = df['Percent_Vaccinated_Measles'].replace({'%': ''}, regex=True).astype(float) / 100
    
    # Calculate indices first - before applying the function
    df['Healthcare_Access_Index'] = df['No_Hospitals'] / df['Population_2024']
    max_healthcare_index = df['Healthcare_Access_Index'].max()
    df['Normalized_Healthcare_Index'] = df['Healthcare_Access_Index'] / max_healthcare_index
    
    df['GDP_Per_Capita_Index'] = df['Per_Capita($)'] / df['Per_Capita($)'].max()
    
    # Apply the function to each row and create a new column 'Estimated Measles Cases'
    df['Estimated_Measles_Cases'] = df.apply(lambda row: estimate_measles_cases(row), axis=1)
    return df

def estimate_measles_cases(row):
    # Extract values from the row
    population = row['Population_2024']
    vaccination_rate = row['Percent_Vaccinated_Measles']
    gdp_per_capita_index = row['GDP_Per_Capita_Index']
    healthcare_access_index = row['Normalized_Healthcare_Index']
    
    # Estimate measles cases
    estimated_cases = (population * (1 - vaccination_rate)) * (1 - (gdp_per_capita_index * healthcare_access_index))
    return estimated_cases