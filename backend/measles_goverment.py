import pandas as pd
from google import genai
import os
from dotenv import load_dotenv

def read_data(file_path):
    df = pd.read_csv(file_path)
    df['Percent_Vaccinated_Measles'] = df['Percent_Vaccinated_Measles'].replace({'%': ''}, regex=True).astype(float) / 100
    # Calculate healthcare access index for all rows at once
    df['Healthcare_Access_Index'] = df['No_Hospitals'] / df['Population_2024']
    # Calculate GDP per capita index for all rows at once
    df['GDP_Per_Capita_Index'] = df['Per_Capita($)'] / df['Per_Capita($)'].max()
    # Apply the function to each row and create a new column 'Estimated Measles Cases'
    df['Estimated_Measles_Cases'] = df.apply(estimate_measles_cases, axis=1)
    return df

'''
Namugga, Barbara, et al. "The immediate treatment outcomes and cost estimate for managing clinical measles in children admitted at Mulago Hospital: a retrospective cohort study." PLOS Global Public Health 3.7 (2023): e0001523.
'''

# Define the function to estimate measles cases
def estimate_measles_cases(row):
    # Extract values from the row
    population = row['Population_2024']
    vaccination_rate = row['Percent_Vaccinated_Measles']
    gdp_per_capita_index = row['GDP_Per_Capita_Index']
    healthcare_access_index = row['Healthcare_Access_Index'] / row['Healthcare_Access_Index'].max() if 'Healthcare_Access_Index' in row else 0
    
    # Estimate measles cases
    estimated_cases = (population * (1 - vaccination_rate)) * (1 - (gdp_per_capita_index * healthcare_access_index))
    return estimated_cases

def generate_disease_report(state_name, df):
    # Load environment variables from .env file
    load_dotenv()

    # Read the API key from the environment
    api_key = os.getenv("GEMINI_API_KEY")  # Ensure the key name matches the .env variable

    # Initialize the client with the key from .env
    client = genai.Client(api_key=api_key)
    """
    Generate a disease control report for a specific state using Gemini API
    """
    # Get state data
    state_data = df[df['Measles_Country'] == state_name]
    
    if state_data.empty:
        return f"Error: State '{state_name}' not found in the dataset."
    
    # Extract relevant information
    population = state_data['Population_2024'].values[0]
    vaccination_rate = state_data['Percent_Vaccinated_Measles'].values[0] * 100  # Convert back to percentage
    hospitals = state_data['No_Hospitals'].values[0]
    gdp_per_capita = state_data['Per_Capita($)'].values[0]
    estimated_cases = state_data['Estimated_Measles_Cases'].values[0]
    
    # Create the prompt for Gemini
    prompt = f'''
Generate a comprehensive measles disease control report for {state_name} with the following data:
- Population (2024): {population:,}
- Measles Vaccination Rate: {vaccination_rate:.2f}%
- Number of Hospitals: {hospitals}
- GDP Per Capita: ${gdp_per_capita:,.2f}
- Estimated Measles Cases: {estimated_cases:.0f}

The report should include:
1. An executive summary of the measles situation in {state_name}
2. Risk assessment based on vaccination rates and healthcare infrastructure
3. Recommended interventions prioritized by urgency and impact
4. Resource allocation suggestions for disease control
5. Timeline for implementation of control measures

Format the report in a clear, professional manner suitable for health officials.
    '''
    
    # Call the Gemini API with the prompt
    try:
        response = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=prompt
        )
        return response.text.strip()
    except Exception as e:
        return f"Error generating report: {str(e)}"

# Function to process one state at a time
def process_state_report():
    df = read_data('measles.csv')
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

if __name__ == "__main__":
    process_state_report()