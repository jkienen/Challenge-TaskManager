# Import modules
import pytest
from fastapi.testclient import TestClient

import os, sys
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from main import app


# ---> Load Tests
client = TestClient(app)

# -> Test GET /tasks (empty values)
def test_get_tasks_empty():
    response = client.get("/tasks")
    assert response.status_code == 200
    assert isinstance(response.json(), list)
    assert len(response.json()) >= 0
# ->

# -> Test POST /tasks
def test_create_task():
    # Create task
    data = {"name": "Backend", "description": "Test: Enable HTTPS in APIs", "status": "Open"}
    response = client.post("/tasks", json=data)
    assert response.status_code == 200
    json_data = response.json()
    assert json_data["name"] == data["name"]
    assert "id" in json_data

    # Delete task
    delete_resp = client.delete(f"/tasks/{json_data['id']}")
    assert delete_resp.status_code == 200
    assert f"Task {json_data['id']} has been removed!" in delete_resp.json()["msg"]
# ->

# -> Test PUT /tasks/{id}
def test_update_task():
    # Create task
    data = {"name": "Backend", "description": "Test: Enable HTTPS in APIs", "status": "Open"}
    post_resp = client.post("/tasks", json=data)
    task_id = post_resp.json()["id"]

    # Update task
    update_data = {"name": "Frontend", "description": "Test: Enabled HTTPS in APIs", "status": "Closed"}
    put_resp = client.put(f"/tasks/{task_id}", json=update_data)
    assert put_resp.status_code == 200
    json_data = put_resp.json()
    assert json_data["name"] == "Frontend"
    assert json_data["description"] == "Test: Enabled HTTPS in APIs"
    assert json_data["status"] == "Closed"

    # Delete task
    delete_resp = client.delete(f"/tasks/{task_id}")
    assert delete_resp.status_code == 200
    assert f"Task {task_id} has been removed!" in delete_resp.json()["msg"]
# ->

# -> Test DELETE /tasks/{id}
def test_delete_task():
    # Create task
    data = {"name": "Frontend", "description": "Test: Optimize CSS Files", "status": "Open"}
    post_resp = client.post("/tasks", json=data)
    task_id = post_resp.json()["id"]

    # Delete task
    delete_resp = client.delete(f"/tasks/{task_id}")
    assert delete_resp.status_code == 200
    assert f"Task {task_id} has been removed!" in delete_resp.json()["msg"]
# ->

# -> Test PUT /tasks/{id} (Not Found 404)
def test_update_nonexistent_task():
    update_data = {"name": "Frontend", "description": "Test: Optimize CSS Files", "status": "Open"}
    response = client.put("/tasks/99999", json=update_data)
    assert response.status_code == 404
    assert response.json()["detail"] == "Task not found!"
# ->

# --->