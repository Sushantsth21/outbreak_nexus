import pandas as pd
from google import genai
import os
from dotenv import load_dotenv

def get_dataframe(disease_name):  
    disease_name = disease_name.lower().strip()       #user_input is what I want
    file_path = f"data/{disease_name}.csv"
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

def generate_disease_report(state_name, df,disease_name):
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
    state_data = df[df['Measles_Country'].str.lower() == state_name]
    
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
Generate a comprehensive {disease_name} disease control report for {state_name} with the following data:
- Population (2024): {population:,}
- {disease_name} Vaccination Rate: {vaccination_rate:.2f}%
- Number of Hospitals: {hospitals}
- GDP Per Capita: ${gdp_per_capita:,.2f}
- Estimated {disease_name} Cases: {estimated_cases:.0f}

The report should include:
1. An executive summary of the {disease_name} situation in {state_name}
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
    

def process(user_inputted_disease, user_input_state,):
    user_inputted_disease = user_inputted_disease.lower().strip()
    user_inputted_state = user_input_state.lower().strip()
    df = get_dataframe(user_inputted_disease)
    state = user_inputted_state
    report = generate_disease_report(state, df,user_inputted_disease)
    return report
    
# output = process("dengue" , "ohio")


