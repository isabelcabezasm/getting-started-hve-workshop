from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import uuid
from datetime import datetime

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Data models
class TodoCreate(BaseModel):
    title: str
    description: str

class TodoUpdate(BaseModel):
    completed: bool

class Todo(BaseModel):
    id: str
    title: str
    description: str
    completed: bool
    created_at: str

# In-memory storage
todos: List[Todo] = []

@app.get("/api/todos", response_model=List[Todo])
async def get_todos():
    return todos

@app.post("/api/todos", response_model=Todo)
async def create_todo(todo_data: TodoCreate):
    todo = Todo(
        id=str(uuid.uuid4()),
        title=todo_data.title,
        description=todo_data.description,
        completed=False,
        created_at=datetime.now().isoformat()
    )
    todos.append(todo)
    return todo

@app.put("/api/todos/{todo_id}", response_model=Todo)
async def update_todo(todo_id: str, update_data: TodoUpdate):
    for todo in todos:
        if todo.id == todo_id:
            todo.completed = update_data.completed
            return todo
    raise HTTPException(status_code=404, detail="Todo not found")

@app.get("/health")
async def health_check():
    return {"status": "ok"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)