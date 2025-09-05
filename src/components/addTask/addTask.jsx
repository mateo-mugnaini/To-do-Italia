import { useState } from "react";

const AddTask = ({ handleClose }) => {
  const [newTask, setNewTask] = useState({
    nameTask: "",
    categorie: "",
    description: "",
    isCompleted: false,
  });

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewTask({
      ...newTask,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Guardar la tarea en localStorage
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!newTask.nameTask.trim()) {
      alert("El nombre de la tarea es obligatorio");
      return;
    }

    const storedTasks = JSON.parse(localStorage.getItem("dataList")) || [];
    const updatedTasks = [...storedTasks, newTask];

    localStorage.setItem("dataList", JSON.stringify(updatedTasks));

    // Resetear form
    setNewTask({
      nameTask: "",
      categorie: "",
      description: "",
      isCompleted: false,
    });
    handleClose(false); // cerrar modal/form
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
          name="nameTask"
          value={newTask.nameTask}
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
          name="categorie"
          value={newTask.categorie}
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
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
};

export default AddTask;
