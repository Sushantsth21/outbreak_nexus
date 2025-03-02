from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from disease_gemini_details import get_disease_info
import json
import os

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
    # Get disease info as JSON string
    json_response = get_disease_info(disease_name)
    
    # Parse the JSON string to return as a proper JSON response
    # This assumes get_disease_info returns a JSON string
    return json.loads(json_response)

@app.post("/disease")
def disease_info_post(disease_name: str):
    json_response = get_disease_info(disease_name)
    return json.loads(json_response)

if __name__ == "__main__":
    # Ensure we're running from the correct directory for relative file paths
    script_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(script_dir)
    
    uvicorn.run(app, host="0.0.0.0", port=8000)