from pydantic import BaseModel
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from typing import List
import uvicorn
from disease_gemini_details import get_disease_info


class DiseaseList(BaseModel):
    diseases: List[Disease]

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

@app.post("/disease")
def disease_info(disease: DiseaseList):
      # Pass the disease name string
    return get_disease_info(disease.name)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
