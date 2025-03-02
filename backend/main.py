from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from disease_gemini_details import get_disease_info, get_name
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

@app.get("/disease-name/{disease_name}")
def get_standardized_disease_name(disease_name: str):
    name = get_name(disease_name)
    return {"standardized_name": name}



@app.post("/disease")
def disease_info_post(disease_name: str):
    name = get_name(disease_name)
    json_response = get_disease_info(name)
    return json.loads(json_response)

if __name__ == "__main__":
    # Ensure we're running from the correct directory for relative file paths
    script_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(script_dir)
    
    uvicorn.run(app, host="0.0.0.0", port=8000)