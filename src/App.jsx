import { useState } from "react";
import ListComponent from "./components/list/list";
import ThemeList from "./components/theme/theme";
import AddTask from "./components/addTask/addTask";
import "./index.css";

const App = () => {
  const [theme, setTheme] = useState("All");
  const [newTask, setNewTask] = useState(false);

  const data = JSON.parse(localStorage.getItem("dataList")) || {};

  const handleTask = (mode) => {
    setNewTask(mode);
  };

  const handleChangeTheme = (theme) => {
    setTheme(theme);
  };
  return (
    <div>
      <div>
        <ThemeList handleChangeTheme={handleChangeTheme} />
      </div>
      <div>
        <ListComponent handleOpen={handleTask} theme={theme} data={data} />
      </div>
      {newTask ? <AddTask handleClose={handleTask} /> : null}
    </div>
  );
};

export default App;
