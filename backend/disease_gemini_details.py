# Only call get_disease_info, Modify the code if needed!
import json
import re
import os
from get_disease_details import DiseaseData
from gemini_disease_unknown import handle_unknown_disease
from google import genai

def get_disease_info(disease_name):
    json_reply = ""
    
    # Get the directory of the current script
    current_dir = os.path.dirname(os.path.abspath(__file__))
    # Construct absolute path to the JSON file
    file_path = os.path.join(current_dir, "data", "diseases_description.json")
    
    try:
        disease_data = DiseaseData(file_path)
        disease = disease_data.get_disease_by_name(disease_name)

        # If disease is found in the database
        if disease:
            disease_info = {
                "name": disease.get("name"),
                "introduction": disease.get("introduction"),
                "symptoms": disease.get("symptoms"),
                "causes": disease.get("causes"),
                "diagnosis": disease.get("diagnosis"),
                "treatment": disease.get("treatment"),
                "prevention": disease.get("prevention"),
                "pathogen_name": disease.get("pathogen_name"),
                "pathogen_type": disease.get("pathogen_type"),
                "gemini_reply": False
            }
            json_reply = json.dumps(disease_info)
            return json_reply
        else:
            # If disease is not found in the database, query Gemini
            print(f"No disease found matching from our database '{disease_name}'")
            print("Searching Gemini for disease details....")
            gemini_response = handle_unknown_disease(disease_name)
            json_reply = gemini_response
            return json_reply
    except FileNotFoundError:
        print(f"Error: Could not find file at {file_path}")
        error_info = {
            "error": f"Database file not found. Please check if '{file_path}' exists.",
            "name": disease_name
        }
        return json.dumps(error_info)
    except Exception as e:
        print(f"Error in get_disease_info: {str(e)}")
        error_info = {
            "error": f"An error occurred: {str(e)}",
            "name": disease_name
        }
        return json.dumps(error_info)
    
print(get_disease_info("lysteria"))