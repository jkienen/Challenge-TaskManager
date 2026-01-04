# Import modules
import sqlite3

from Models.models import Task
from config import DB_PATH


# ---> Load Tasks

# -> GET /tasks
def get_all_tasks():
    with sqlite3.connect(DB_PATH) as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM tasks")
        rows = cursor.fetchall()
        return [{"id": r[0], "name": r[1], "description": r[2], "status": r[3], "created": r[4]} for r in rows]
# ->

# -> POST /tasks
def create_task(task: Task):
    with sqlite3.connect(DB_PATH) as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT COUNT(*) FROM tasks")
        count = cursor.fetchone()[0]
        if count >= 10: raise Exception("Task limit of 10 reached!")
        cursor.execute("INSERT INTO tasks (name, description, status) VALUES (?, ?, ?)", (task.name, task.description, task.status))
        conn.commit()
        return {"id": cursor.lastrowid, **task.model_dump()}
# ->

# -> PUT /tasks/{id}
def update_task(id: int, task: Task):
    with sqlite3.connect(DB_PATH) as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM tasks WHERE id = ?", (id,))
        if cursor.fetchone() is None:
            return None
        cursor.execute("UPDATE tasks SET name = ?, description = ?, status = ? WHERE id = ?", (task.name, task.description, task.status, id))
        conn.commit()
        return {"id": id, **task.model_dump()}
# ->

# -> DELETE /tasks/{id}
def delete_task(id: int):
    with sqlite3.connect(DB_PATH) as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM tasks WHERE id = ?", (id,))
        if cursor.fetchone() is None:
            return None
        cursor.execute("DELETE FROM tasks WHERE id = ?", (id,))
        conn.commit()
        return True
# ->

# --->