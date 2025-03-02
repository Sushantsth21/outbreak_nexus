from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import json
import os
import asyncio
from disease_gemini_details import get_disease_info, get_name
from load_data import process
import logging
import google.generativeai as genai
from datetime import datetime
from typing import List, Dict, Optional

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
import requests
from disease_gemini_details import get_disease_info, get_name


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

# Configure Gemini API
def configure_gemini():
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        logger.error("GEMINI_API_KEY environment variable not set")
        raise HTTPException(status_code=500, detail="Gemini API key not configured")
    
    genai.configure(api_key=api_key)
    return genai.GenerativeModel('gemini-2.0-flash')

# Function to get recent disease outbreaks for a location
async def get_recent_outbreaks(location: str, limit: int = 10) -> List[Dict]:
    try:
        model = configure_gemini()
        
        current_date = datetime.now().strftime("%B %d, %Y")
        prompt = f"""
        Based on your knowledge as of October 2024, provide information about the 10 most recent disease outbreaks in or affecting {location}.
        
        For each outbreak, include:
        1. Disease name
        2. Start date (approximate if exact date unknown)
        3. Status (ongoing, contained, etc.)
        4. Severity (low, medium, high)
        5. Brief description (1-2 sentences)
        
        Format the response as a JSON array with the following structure for each outbreak:
        {{
            "disease": "Disease name",
            "start_date": "YYYY-MM-DD" or "YYYY-MM" if only month is known,
            "status": "ongoing/contained/etc",
            "severity": "low/medium/high",
            "description": "Brief description"
        }}
        
        Provide ONLY the JSON array with no additional text or explanation. Only include outbreaks you have reliable information about, don't fabricate data.
        """
        
        response = await model.generate_content_async(prompt)
        response_text = response.text
        
        # Extract JSON from response if needed
        start_idx = response_text.find('[')
        end_idx = response_text.rfind(']') + 1
        
        if start_idx == -1 or end_idx == 0:
            logger.error(f"Invalid JSON response format: {response_text}")
            raise ValueError("Invalid response format from Gemini")
            
        json_str = response_text[start_idx:end_idx]
        outbreaks = json.loads(json_str)
        
        # Ensure we have at most 'limit' items
        return outbreaks[:limit]
        
    except Exception as e:
        logger.error(f"Error getting disease outbreaks for {location}: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to get disease outbreaks: {str(e)}")

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

@app.get("/recent-outbreaks/{location}")
async def recent_disease_outbreaks(location: str, limit: int = 10):
    """
    Get recent disease outbreaks for a specific location.
    
    - **location**: The name of the location (city, state, country, etc.)
    - **limit**: Maximum number of outbreaks to return (default: 10)
    """
    logger.info(f"Received request for recent outbreaks in location: {location}, limit: {limit}")
    try:
        outbreaks = await get_recent_outbreaks(location, limit)
        return {
            "status": "success",
            "location": location,
            "count": len(outbreaks),
            "outbreaks": outbreaks
        }
    except Exception as e:
        logger.error(f"Error retrieving recent outbreaks for {location}: {str(e)}")
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