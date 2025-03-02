import pandas as pd
from google import genai
import os
from dotenv import load_dotenv


def generate_disease_news_report(country_name, disease_name):
    # Load environment variables from .env file
    load_dotenv()

    # Read the API key from the environment
    api_key = os.getenv("GEMINI_API_KEY")  # Ensure the key name matches the .env variable

    # Initialize the client with the key from .env
    client = genai.Client(api_key=api_key)
    
    """
    Generate a news-style report for a specific state and disease using Gemini API
    """
    # Create the prompt for Gemini, focused on the latest news in the area of disease
    prompt = f'''
Latest News Report: {disease_name} Situation in {country_name}

Generaate 10 news reports.

Please ensure the report is formatted as a professional news article, capturing the latest developments.
    '''
    
    # Call the Gemini API with the prompt
    try:
        response = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=prompt
        )
        return response.text.strip()
    except Exception as e:
        return f"Error generating news report: {str(e)}"
    

print(generate_disease_news_report("Nepal", "Measles"))
