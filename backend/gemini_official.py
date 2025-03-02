import pandas as pd
from google import genai
import os
from dotenv import load_dotenv

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
