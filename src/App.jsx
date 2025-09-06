import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

import ThemeList from "./components/theme/theme";
import AddTask from "./components/addTask/addTask";
import "./index.css";
import { auth } from "./config/firebase";
import { GetCategories } from "./api/task/get/categories"; // 👈 asegurate que sea import nombrado
import ListComponent from "./components/list/list";

const App = () => {
  const [theme, setTheme] = useState("All");
  const [categories, setCategories] = useState(["All"]);
  const [newTask, setNewTask] = useState(false);
  const navigate = useNavigate();

  const fetchCategories = async (uid) => {
    const res = await GetCategories(uid);
    if (res.ok) {
      setCategories(["All", ...res.data]);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) navigate("/auth");
      else fetchCategories(user.uid);
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleTask = (mode) => setNewTask(mode);
  const handleChangeTheme = (theme) => setTheme(theme);

  return (
    <div>
      <ThemeList
        handleChangeTheme={handleChangeTheme}
        categories={categories}
      />
      <ListComponent
        handleOpen={handleTask}
        theme={theme}
        refreshCategories={fetchCategories} // 👈 pasamos la función
      />
      {newTask && <AddTask handleClose={handleTask} />}
    </div>
  );
};

export default App;
