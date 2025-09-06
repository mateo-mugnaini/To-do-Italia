import { useState } from "react";
import { auth } from "../../config/firebase";
import { CreateTask } from "../../api/task/post/task";

const AddTask = ({ handleClose }) => {
  const [newTask, setNewTask] = useState({
    title: "",
    category: "",
    description: "",
    isCompleted: false,
    createdAt: new Date().getDate,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewTask({
      ...newTask,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Guardar la tarea en Firestore
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const uid = auth.currentUser?.uid;
      if (!uid) throw new Error("Usuario no autenticado");

      const res = await CreateTask(uid, newTask);

      if (!res.ok) throw new Error(res.error);

      // Resetear form
      setNewTask({
        title: "",
        categorie: "",
        description: "",
        isCompleted: false,
      });
      handleClose(false); // cerrar modal/form
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
        alignItems: "center",
        width: "100%",
      }}
    >
      <button onClick={() => handleClose(false)}>X</button>
      <h1>Nueva Tarea</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
          alignItems: "center",
          width: "100%",
        }}
      >
        <input
          style={{ width: "100%" }}
          name="title"
          value={newTask.title}
          onChange={handleChange}
          placeholder="Task Name"
        />
        <input
          style={{ width: "100%" }}
          name="description"
          value={newTask.description}
          onChange={handleChange}
          placeholder="Description"
        />
        <input
          style={{ width: "100%" }}
          name="category"
          value={newTask.category}
          onChange={handleChange}
          placeholder="Categorie"
        />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
            width: "100%",
          }}
        >
          <input
            type="checkbox"
            name="isCompleted"
            checked={newTask.isCompleted}
            onChange={handleChange}
          />
          <label>Is Completed?</label>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Guardando..." : "Guardar"}
        </button>
      </form>
    </div>
  );
};

export default AddTask;
