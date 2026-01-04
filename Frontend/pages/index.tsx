// Import modules
import Head from "next/head";
import { useEffect, useState } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "../components/routes";


// Load home functions [Client Side]
export default function Home() {
  
  // Creating initial states
  const [tasks, setTasks] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

  // -> Loading Tasks and updating variable [tasks]
  async function loadTasks() {
    const data = await getTasks();
    setTasks(data);
  }
  
  useEffect(() => {
    loadTasks();
  }, []);
  // -> 

  // -----------> Consts

  // ---> Create new tasks
  async function handleCreate() {
    if (!name.trim() || !description.trim()) {
      alert("Please fill in both the name and the description!");
      return;
    }
    try {
      await createTask({
        name: name.trim(),
        description: description.trim(),
        status: "Open",
      });

      // Clean fields
      setName("");
      setDescription("");

      // Reload tasks
      loadTasks();

    } catch (error: any) {
      if (error.message === "Task limit of 10 reached!") {
        alert(error.message);
      } else {
        alert("Unexpected error: " + error.message);
      }
    }
  }
  // --->

  // -> Enable edition
  function enableEdit(task: any) {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === task.id
          ? { ...t, isEditing: true, editname: t.name, editdescription: t.description }
          : t
      )
    );
  }
  // ->

  // -> Make edition
  function handleChangeEdit(id: number, field: "editname" | "editdescription", value: string) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, [field]: value } : t))
    );
  }
  // -> 

  // ---> Update tasks

  // -> Update changes
  async function saveEdit(task: any) {
    await updateTask(task.id, {
      ...task,
      name: task.editname,
      description: task.editdescription,
    });

    setTasks((prev) =>
      prev.map((t) =>
        t.id === task.id
          ? { ...t, name: task.editname, description: task.editdescription, isEditing: false }
          : t
      )
    );
  }
  // ->

  // -> Update status
  async function toggleStatus(task: any) {
    await updateTask(task.id, {
      ...task,
      status: task.status === "Closed" ? "Open" : "Closed",
    });
    loadTasks();
  }
  // ->

  // --->

  // -> Cancel action
  function cancelEdit(task: any) {
    setTasks((prev) =>
      prev.map((t) => (t.id === task.id ? { ...t, isEditing: false } : t))
    );
  }
  // ->

  // Filter Open and Closed tasks
  const openTasks = tasks.filter((t) => t.status === "Open");
  const closedTasks = tasks.filter((t) => t.status === "Closed");

  // ----------->

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="robots" content="noindex, nofollow" />
        <meta name="googlebot" content="noindex, nofollow" />
        <meta name="author" content="JvkScript.me" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>Task Manager</title>
      </Head>

      <div className="container">

        {/* POST TASKs */}
        <div className="create-task-container">
          <h3>Create New Task</h3>
          <div className="new-task">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              maxLength={12}
            />
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              maxLength={60}
            />
            <button onClick={handleCreate}>Create</button>
          </div>
        </div>

        {/* GET TASKs */}
        <div className="tasks-lists">

          {/* OPEN TASKs */}
          <div className="tasks-column">
            <h3 className="section-title">Open Tasks</h3>
            <ul>
              {openTasks.map((task) => (
                <li
                  key={task.id}
                  className={task.status === "Closed" ? "done" : ""}
                >
                  <div className="task-info">
                    {task.isEditing ? (
                      <>
                        <input
                          value={task.editname}
                          onChange={(e) =>
                            handleChangeEdit(task.id, "editname", e.target.value)
                          }
                          maxLength={12}
                        />
                        <input
                          value={task.editdescription}
                          onChange={(e) =>
                            handleChangeEdit(task.id, "editdescription", e.target.value)
                          }
                          maxLength={60}
                        />
                      </>
                    ) : (
                      <>
                        <strong>{task.name}</strong>
                        {task.description && <p className="description">{task.description}</p>}
                      </>
                    )}
                  </div>

                  <span
                    className={`status ${
                      task.status === "Closed" ? "closed" : "open"
                    }`}
                    onClick={() => toggleStatus(task)}
                  >
                    {task.status}
                  </span>

                  <div className="actions">
                    {task.isEditing ? (
                      <>
                        <button onClick={() => saveEdit(task)}>✅</button>
                        <button onClick={() => cancelEdit(task)}>❌</button>
                      </>
                    ) : confirmDeleteId === task.id ? (
                      <>
                        <button
                          onClick={async () => {
                            await deleteTask(task.id);
                            setConfirmDeleteId(null);
                            loadTasks();
                          }}
                        >
                          ✅
                        </button>
                        <button onClick={() => setConfirmDeleteId(null)}>❌</button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => enableEdit(task)}>✏️</button>
                        <button onClick={() => setConfirmDeleteId(task.id)}>🗑️</button>
                      </>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* CLOSED TASKs */}
          <div className="tasks-column">
            <h3 className="section-title">Closed Tasks</h3>
            <ul>
              {closedTasks.map((task) => (
                <li key={task.id} className="done">
                  <div className="task-info">
                    <strong>{task.name}</strong>
                    {task.description && <p className="description">{task.description}</p>}
                  </div>

                 <span
                    className={`status ${
                      task.status === "Closed" ? "closed" : "open"
                    }`}
                    onClick={() => toggleStatus(task)}
                  >
                    {task.status}
                  </span>

                  <div className="actions">
                    {confirmDeleteId === task.id ? (
                      <>
                        <button
                          onClick={async () => {
                            await deleteTask(task.id);
                            setConfirmDeleteId(null);
                            loadTasks();
                          }}
                        >
                          ✅
                        </button>
                        <button onClick={() => setConfirmDeleteId(null)}>❌</button>
                      </>
                    ) : (
                      <button onClick={() => setConfirmDeleteId(task.id)}>🗑️</button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}