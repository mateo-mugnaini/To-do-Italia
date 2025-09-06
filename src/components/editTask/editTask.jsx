import { useState, useEffect } from "react";
import { EditTask } from "../../api/task/put/task"; // tu action para editar
import { auth } from "../../config/firebase";

const EditTaskPopUp = ({ task, handleClose, refreshTasks }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    isCompleted: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Inicializar form cuando cambie la task
  useEffect(() => {
    if (task) {
      setForm({
        title: task?.title || "",
        description: task?.description || "",
        category: task?.category || "",
        isCompleted: task?.isCompleted || false,
      });
    }
  }, [task]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const user = auth.currentUser;

    try {
      const res = await EditTask(user.uid, task.id, form);
      if (!res.ok) throw new Error(res.error);

      refreshTasks();
      handleClose(false);
    } catch (err) {
      console.log(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999,
      }}
      onClick={() => handleClose(false)}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: 20,
          borderRadius: 8,
          width: 300,
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
        onClick={(e) => e.stopPropagation()} // evitar cierre al hacer click dentro
      >
        <button onClick={() => handleClose(false)}>X</button>
        <h2>Editar Tarea</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: 8 }}
        >
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Task Name"
          />
          <input
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
          />
          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="Category"
          />
          <label>
            <input
              type="checkbox"
              name="isCompleted"
              checked={form.isCompleted}
              onChange={handleChange}
            />
            Completada
          </label>
          <button type="submit" disabled={loading}>
            {loading ? "Guardando..." : "Guardar"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditTaskPopUp;
