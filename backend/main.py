from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import json
import os
import asyncio
from disease_gemini_details import get_disease_info, get_name
from load_data import process
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

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

@app.get("/")
def read_root():
    return {"message": "Server is running"}

@app.get("/disease-report/{disease}/{state}")
async def get_disease_report(disease: str, state: str):
    logger.info(f"Received request for disease: {disease}, state: {state}")
    try:
        report = process(disease, state)
        logger.info(f"Report generated successfully for disease: {disease}, state: {state}")
        return {"status": "success", "report": report}
    except FileNotFoundError:
        logger.error(f"Disease data not found for disease: {disease}, state: {state}")
        raise HTTPException(status_code=404, detail="Disease data not found")
    except Exception as e:
        logger.error(f"Error generating report for disease: {disease}, state: {state} - {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/disease/{disease_name}")
def get_disease_by_name(disease_name: str):
    # Get standardized disease name
    name = get_name(disease_name)
    # Get disease info as JSON string
    json_response = get_disease_info(name)
    data = json.loads(json_response)
    # Check if "gemini-reply" exists in the response
    if ("gemini_reply" not in data) or (data["gemini_reply"] == False):
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


# Synchronous process function

if __name__ == "__main__":
    # Ensure we're running from the correct directory for relative file paths
    script_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(script_dir)
    uvicorn.run(app, host="0.0.0.0", port=8000)
