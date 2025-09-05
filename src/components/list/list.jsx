/* eslint-disable no-unused-vars */
const ListComponent = ({ theme, data, handleOpen }) => {
  console.log("🚀 ~ ListComponent ~ data:", data);

  const showData = () => {
    switch (theme) {
      case "Documentation":
        return data.filter((task) => task.categorie === "Documentation");
        default:
        return data;
    }
  };

  const filteredTasks = showData();

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 20,
        }}
      >
        <h1>Lista</h1>
        <button onClick={() => handleOpen(true)}>+</button>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
          marginTop: 20,
        }}
      >
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task, idx) => (
            <div
              key={idx}
              style={{
                border: "1px solid #ccc",
                padding: 10,
                borderRadius: 8,
                display: "flex",
                flexDirection: "column",
                gap: 5,
              }}
            >
              <strong>{task.nameTask}</strong>
              <span>{task.description}</span>
              <small>📂 {task.categorie}</small>
              <small>
                {task.isCompleted ? "✅ Completada" : "⏳ Pendiente"}
              </small>
            </div>
          ))
        ) : (
          <p>No hay tareas disponibles</p>
        )}
      </div>
    </div>
  );
};

export default ListComponent;
