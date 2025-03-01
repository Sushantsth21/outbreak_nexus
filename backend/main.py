from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# Enable CORS to allow requests from your React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Sample data model
class Item(BaseModel):
    id: int
    name: str
    description: str = None

# Sample database
items = [
    {"id": 1, "name": "Item 1", "description": "Description 1"},
    {"id": 2, "name": "Item 2", "description": "Description 2"}
]

@app.get("/api/items")
async def get_items():
    return items

@app.get("/api/items/{item_id}")
async def get_item(item_id: int):
    item = next((item for item in items if item["id"] == item_id), None)
    return item