from fastapi import FastAPI,Query
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from gemini_official import generate_disease_report
from disease_gemini_details import get_name, get_disease_info

import json
import os
import requests

app = FastAPI(debug=True)

origins = [
    "http://localhost:5173",
    # Add more allowed origins here if needed
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/disease/{disease_name}")
def get_disease_by_name(disease_name: str):
    # Get standardized disease name
    name = get_name(disease_name)
    
    # Get disease info as JSON string
    json_response = get_disease_info(name)
    data = json.loads(json_response)  # Parse JSON
    # Check if "gemini-reply" exists in the response
    if ("gemini_reply" not in data) or ("gemini_reply" == False):
        return data
    else:
        return json.loads(json_response) 
    
@app.post("/disease")
def disease_info_post(disease_name: str):
    name = get_name(disease_name)
    json_response = get_disease_info(name)
    return json.loads(json_response)
    


@app.get("/disease-report")
def get_disease_report(
    disease: str = Query(..., description="Disease name (measles, covid, dengue)"),
    state: str = Query(..., description="State or Country name (like Nepal, India, USA)")
):
    file_path = f"backend/data/{disease.lower()}.csv"

    try:
        # Read data
        df = read_data(file_path)

        # Generate report for the selected state/country
        report = generate_disease_report(state, df)

        return {
            "status": "success",
            "disease": disease,
            "state": state,
            "report": report
        }
    except FileNotFoundError:
        return {"status": "error", "message": f"No data found for disease: {disease}"}
    except Exception as e:
        return {"status": "error", "message": str(e)}
    

@app.get("/disease-info")
def get_disease_info_api(disease_name: str = Query(...)):
    name = get_name(disease_name)
    json_response = get_disease_info(name)
    data = json.loads(json_response)

    if "gemini_reply" not in data or not data["gemini_reply"]:
        return data
    return json.loads(json_response)


if __name__ == "__main__":
    # Ensure we're running from the correct directory for relative file paths
    script_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(script_dir)
    
    uvicorn.run(app, host="0.0.0.0", port=8000)



def read_data(file_path):
    df = pd.read_csv(file_path)
    df['Percent_Vaccinated_Measles'] = df['Percent_Vaccinated_Measles'].replace({'%': ''}, regex=True).astype(float) / 100

    # Calculate indices
    df['Healthcare_Access_Index'] = df['No_Hospitals'] / df['Population_2024']
    max_healthcare_index = df['Healthcare_Access_Index'].max()
    df['Normalized_Healthcare_Index'] = df['Healthcare_Access_Index'] / max_healthcare_index

    df['GDP_Per_Capita_Index'] = df['Per_Capita($)'] / df['Per_Capita($)'].max()

    # Estimated measles cases per state
    df['Estimated_Measles_Cases'] = df.apply(lambda row: estimate_measles_cases(row), axis=1)

    return df

def estimate_measles_cases(row):
    population = row['Population_2024']
    vaccination_rate = row['Percent_Vaccinated_Measles']
    gdp_per_capita_index = row['GDP_Per_Capita_Index']
    healthcare_access_index = row['Normalized_Healthcare_Index']

    estimated_cases = (population * (1 - vaccination_rate)) * (1 - (gdp_per_capita_index * healthcare_access_index))
    return estimated_cases

