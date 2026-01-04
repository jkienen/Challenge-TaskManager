// Import modules
import { TaskPayload } from "../components/models";


// ---> Load Tasks

// -> GET /tasks
export async function getTasks() {
  const res = await fetch(`${process.env.BACKEND_API}/tasks`);
  return res.json();
}
// ->

// -> POST /tasks
export async function createTask(task: TaskPayload) {
  const res = await fetch(`${process.env.BACKEND_API}/tasks`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(task)
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.detail || "An error occurred!");
  }
  return res.json();
}
// ->

// -> PUT /tasks
export async function updateTask(id: number, task: TaskPayload) {
  const res = await fetch(`${process.env.BACKEND_API}/tasks/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task)
  });
  return res.json();
}
// ->

// -> DELETE /tasks
export async function deleteTask(id: number) {
  const res = await fetch(`${process.env.BACKEND_API}/tasks/${id}`, {
    method: "DELETE"
  });
  return res.json();
}
// ->

// --->