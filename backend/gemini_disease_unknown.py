#Do not touch this! This file is a gemini client!
from google import genai
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Read the API key from the environment
api_key = os.getenv("GEMINI_API_KEY")  # Ensure the key name matches the .env variable

# Initialize the client with the key from .env
client = genai.Client(api_key=api_key)



def handle_unknown_disease(disease_name):
    # Create the prompt for the specific disease
    prompt = f'''
For the disease "{disease_name}", provide the following details as a JSON file. Do not provide anything else. If it is not a disease, return None for all fields:
{{
    "name": "",
    "introduction": "",
    "symptoms": ["", ""],
    "causes": "",
    "diagnosis": "",
    "treatment": "",
    "prevention": "",
    "pathogen_name": "",
    "pathogen_type": "",
    "gemini-reply": "true"
}}
    '''
    
    # Call the API with the prompt
    response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents=prompt
    )
    json_output = response.text.strip()
    
    return json_output  # Return the content of the response as text

# Example usage
#disease_name = "UnknownDisease"
#result = handle_unknown_disease(disease_name)
#print(result)