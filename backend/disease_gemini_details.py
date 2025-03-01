# Only call get_disease_info, Modify the code if needed!
import json
import re
from get_disease_details import DiseaseData
from gemini_disease_unknown import handle_unknown_disease

def get_disease_info(disease_name):
    json_reply = ""
    file_path = "backend/data/diseases_description.json"
    disease_data = DiseaseData(file_path)
    disease = disease_data.get_disease_by_name(disease_name)

    # If disease is found in the database
    if disease:
        '''
        print("\nDisease found in our database\n")
        print(f"Details for '{disease_name}': ")
        print("Name:", disease.get("name"))
        print("Introduction:", disease.get("introduction"))
        print("Symptoms:", disease.get("symptoms"))
        print("Causes:", disease.get("causes"))
        print("Diagnosis:", disease.get("diagnosis"))
        print("Treatment:", disease.get("treatment"))
        print("Prevention:", disease.get("prevention"))
        print("Pathogen Name:", disease.get("pathogen_name"))
        print("Pathogen Type:", disease.get("pathogen_type"))
        '''
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
        '''
        
        # Extract JSON from Gemini response
        json_match = re.search(r'```(?:json)?(.*?)```', gemini_response, re.DOTALL)
        if json_match:
            json_str = json_match.group(1).strip()
        else:
            json_str = gemini_response.strip()
        
        # Parse the JSON
        try:
            parsed_data = json.loads(json_str)
            
            print("\nInformation from Gemini:\n")
            print(f"Details for '{disease_name}': ")
            print("Name:", parsed_data.get("name"))
            print("Introduction:", parsed_data.get("introduction"))
            print("Symptoms:", parsed_data.get("symptoms"))
            print("Causes:", parsed_data.get("causes"))
            print("Diagnosis:", parsed_data.get("diagnosis"))
            print("Treatment:", parsed_data.get("treatment"))
            print("Prevention:", parsed_data.get("prevention"))
            print("Pathogen Name:", parsed_data.get("pathogen_name"))
            print("Pathogen Type:", parsed_data.get("pathogen_type"))
        
        except json.JSONDecodeError as e:
            print(f"Error parsing Gemini response: {e}")
            print("Raw response from Gemini:")
            print(gemini_response)
        
        print("Note that this information may be inaccurate or incomplete as it is generated by Gemini.")
        '''

#print(get_disease_info("monkeypox"))  #-> GIVES OUTPUT FROM OUR DATABASE
print(get_disease_info("lysteria") ) #-> GIVES OUTPUT FROM GEMINI

