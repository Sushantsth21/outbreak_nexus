import pandas as pd
from google import genai
from gemini_official import generate_disease_report

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

def process_state_report():
    # Use the correct path to the CSV file
    try:
        df = read_data('measles.csv')
    except FileNotFoundError:
        try:
            print("Select disease: measles,covid,dengue")
            disease = input("Enter the name of the disease: ")
            if disease.lower().strip() == 'measles': #1
                df = read_data('backend/data/measles.csv')
            elif disease.lower().strip() == 'covid': #2
                df = read_data('backend/data/covid.csv')
            elif disease.lower().strip() == 'dengue': #4
                df = read_data('backend/data/dengue.csv')
        except FileNotFoundError:
            print("Error: Could not find the measles.csv file. Please provide the correct path.")
            while True:
                file_path = input("Enter the path to the measles.csv file: ")
                if file_path.lower() == 'quit':
                    print("Exiting program.")
                    return
                try:
                    df = read_data(file_path)
                    break
                except FileNotFoundError:
                    print(f"File not found at: {file_path}")
                except Exception as e:
                    print(f"Error reading file: {str(e)}")
    
    while True:
        print("\nAvailable states:")
        for state in df['Measles_Country'].unique():
            print(f"- {state}")
        
        state_input = input("\nEnter a state name for measles report (or 'quit' to exit): ")
        
        if state_input.lower() == 'quit':
            print("Exiting program.")
            break
        
        report = generate_disease_report(state_input, df)
        print("\n" + "="*80 + "\n")
        print(f"MEASLES CONTROL REPORT - {state_input.upper()}")
        print("="*80 + "\n")
        print(report)
        print("\n" + "="*80)


def get_report(user_input):          #user_input is what I want
    file_path = f"backend/data/{user_input}.csv"
    df = read_data(file_path)
    return df