import json
import re

class DiseaseData:
    def __init__(self, file_path):
        """Load the JSON data from the given file."""
        with open(file_path, "r") as file:
            self.data = json.load(file)
        # Do not modify the original 'name' field.
    
    @staticmethod
    def _sanitize(text):
        """Remove non-alphanumeric characters and convert to lowercase."""
        return re.sub(r'[^a-z0-9]', '', text.lower())
    
    def get_all_diseases(self):
        """Return the list of all disease dictionaries."""
        return self.data.get("diseases", [])
    
    def get_all_disease_names(self):
        """Return a list of disease names (original display version)."""
        return [disease["name"] for disease in self.get_all_diseases()]
    
    def get_disease_by_name(self, query):
        """
        Return the disease dictionary for a given disease name.
        Matches are based on whether the sanitized query is a substring
        of the sanitized disease name.
        """
        sanitized_query = self._sanitize(query)
        for disease in self.get_all_diseases():
            sanitized_disease = self._sanitize(disease.get("name", ""))
            if sanitized_query in sanitized_disease:
                return disease
        return None

    def get_introduction(self, name):
        """Return the introduction for the specified disease."""
        disease = self.get_disease_by_name(name)
        return disease.get("introduction") if disease else None

    def get_symptoms(self, name):
        """Return the list of symptoms for the specified disease."""
        disease = self.get_disease_by_name(name)
        return disease.get("symptoms") if disease else None

    def get_causes(self, name):
        """Return the causes for the specified disease."""
        disease = self.get_disease_by_name(name)
        return disease.get("causes") if disease else None

    def get_diagnosis(self, name):
        """Return the diagnosis information for the specified disease."""
        disease = self.get_disease_by_name(name)
        return disease.get("diagnosis") if disease else None

    def get_treatment(self, name):
        """Return the treatment information for the specified disease."""
        disease = self.get_disease_by_name(name)
        return disease.get("treatment") if disease else None

    def get_prevention(self, name):
        """Return the prevention measures for the specified disease."""
        disease = self.get_disease_by_name(name)
        return disease.get("prevention") if disease else None

    def get_pathogen_name(self, name):
        """Return the pathogen name for the specified disease."""
        disease = self.get_disease_by_name(name)
        return disease.get("pathogen_name") if disease else None

    def get_pathogen_type(self, name):
        """Return the pathogen type for the specified disease."""
        disease = self.get_disease_by_name(name)
        return disease.get("pathogen_type") if disease else None

# Usage example:
if __name__ == "__main__":
    # Initialize the class with your JSON file
    file_path = "backend/data/diseases_description.json"
    disease_data = DiseaseData(file_path)

    # Get all disease names (displaying the original, capitalized version)
    #disease_names = disease_data.get_all_disease_names()
    #print("Number of diseases:", len(disease_names))
    #print("Disease Names:", disease_names)

    # Retrieve details using a substring query like "monkey"

    #The code below is to create instance
    '''
    query = "covid"
    disease = disease_data.get_disease_by_name(query)
    if disease:
        print(f"\nDetails for '{query}':")
        print("Name:", disease.get("name"))
        print("Introduction:", disease.get("introduction"))
        print("Symptoms:", disease.get("symptoms"))
        print("Causes:", disease.get("causes"))
        print("Diagnosis:", disease.get("diagnosis"))
        print("Treatment:", disease.get("treatment"))
        print("Prevention:", disease.get("prevention"))
        print("Pathogen Name:", disease.get("pathogen_name"))
        print("Pathogen Type:", disease.get("pathogen_type"))
    else:
        print(f"No disease found matching '{query}'")
    '''
