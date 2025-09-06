import { useEffect, useState } from "react";
import { EditTask } from "../../api/task/put/task";
import { DeleteTask } from "../../api/task/delete/task"; // 👈 import
import { auth } from "../../config/firebase";
import EditTaskPopUp from "../editTask/editTask";
import { FaEdit, FaTrash } from "react-icons/fa";
import { GetTasksByCategories } from "../../api/task/get/tasksByCategorie";

const ListComponent = ({ handleOpen, theme, refreshCategories }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState(null);

  const fetchTasks = async (category) => {
    const user = auth.currentUser;
    if (!user) return setLoading(false);

    try {
      const res = await GetTasksByCategories(
        user.uid,
        category !== "All" ? category : "All"
      );
      if (res.ok) {
        setTasks(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleCompleted = async (task) => {
    const user = auth.currentUser;
    if (!user) return;

    try {
      setTasks((prev) =>
        prev.map((t) =>
          t.id === task.id ? { ...t, isCompleted: !t.isCompleted } : t
        )
      );
      await EditTask(user.uid, task.id, { isCompleted: !task.isCompleted });
    } catch (err) {
      console.error("Error actualizando el checkbox:", err.message);
    }
  };

  const handleDeleteTask = async (taskId) => {
    const user = auth.currentUser;
    if (!user) return;
    try {
      await DeleteTask(user.uid, taskId);
      setTasks((prev) => prev.filter((t) => t.id !== taskId));
      refreshCategories(user.uid); // 👈 actualizamos categorías
    } catch (err) {
      console.error("Error eliminando la tarea:", err.message);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(() =>
      fetchTasks(theme || "All")
    );
    return () => unsubscribe();
  }, [theme]);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center", gap: 20 }}>
        <h1>Lista</h1>
        <button onClick={() => handleOpen(true)}>+</button>
      </div>

      {loading ? (
        <p>Cargando...</p>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
            marginTop: 20,
          }}
        >
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <div
                key={task.id}
                style={{
                  border: "1px solid #ccc",
                  padding: 10,
                  borderRadius: 8,
                  display: "flex",
                  flexDirection: "column",
                  gap: 5,
                }}
              >
                <strong>{task.title}</strong>
                <span>{task.description}</span>
                <small>📂 {task.category}</small>
                <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <input
                    type="checkbox"
                    checked={task.isCompleted}
                    onChange={(e) => {
                      e.stopPropagation();
                      toggleCompleted(task);
                    }}
                  />
                  <small>
                    {task.isCompleted ? "✅ Completada" : "⏳ Pendiente"}
                  </small>
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  <FaTrash
                    style={{ cursor: "pointer", color: "red" }}
                    onClick={() => handleDeleteTask(task.id)}
                  />
                  <FaEdit
                    style={{ cursor: "pointer" }}
                    onClick={() => setSelectedTask(task)}
                  />
                </div>
              </div>
            ))
          ) : (
            <p>No hay tareas disponibles</p>
          )}
        </div>
      )}

      {selectedTask && (
        <EditTaskPopUp
          task={selectedTask}
          handleClose={() => setSelectedTask(null)}
          refreshTasks={() => fetchTasks(theme || "All")}
        />
      )}
    </div>
  );
};

export default ListComponent;
