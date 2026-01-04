# Import modules
from fastapi import APIRouter, HTTPException

from Models.models import Task
from Services.tasks import get_all_tasks, create_task, update_task, delete_task


# ---> Load Routes
router = APIRouter()

# -> GET /tasks
@router.get("/tasks")
def get_tasks():
    try: return get_all_tasks()
    except Exception as e: raise HTTPException(status_code=500, detail=str(e))
# ->

# -> POST /tasks
@router.post("/tasks")
def post_task(task: Task):
    try: return create_task(task)
    except Exception as e: 
        if str(e) == "Task limit of 10 reached!": raise HTTPException(status_code=400, detail=str(e))
        raise HTTPException(status_code=500, detail=str(e))
# ->

# -> PUT /tasks/{id}
@router.put("/tasks/{id}")
def put_task(id: int, task: Task):
    try:
        result = update_task(id, task)
        if result is None:
            raise HTTPException(status_code=404, detail="Task not found!")
        return result
    except HTTPException: raise
    except Exception as e: raise HTTPException(status_code=500, detail=str(e))
# ->

# -> DELETE /tasks/{id}
@router.delete("/tasks/{id}")
def delete_task_route(id: int):
    try:
        result = delete_task(id)
        if result is None:
            raise HTTPException(status_code=404, detail="Task not found!")
        return {"msg": f"Task {id} has been removed!"}
    except HTTPException: raise
    except Exception as e: raise HTTPException(status_code=500, detail=str(e))
# ->

# --->