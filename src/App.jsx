import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

import ListComponent from "./components/list/list";
import ThemeList from "./components/theme/theme";
import AddTask from "./components/addTask/addTask";
import "./index.css";
import { auth } from "./config/firebase";
import { GetCategories } from "./api/task/get/categories"; // 👈 asegurate que sea import nombrado

const App = () => {
  const [theme, setTheme] = useState("All");
  const [categories, setCategories] = useState(["All"]); // 👈 guardamos categorías
  const [newTask, setNewTask] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        navigate("/auth");
      } else {
        const res = await GetCategories(user.uid);
        if (res.ok) {
          setCategories(["All", ...res.data]); // 👈 agrego "All" al inicio
        }
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleTask = (mode) => {
    setNewTask(mode);
  };

  const handleChangeTheme = (theme) => {
    setTheme(theme);
  };

  return (
    <div>
      <div>
        {/* 👇 le pasamos las categorías al ThemeList */}
        <ThemeList
          handleChangeTheme={handleChangeTheme}
          categories={categories}
        />
      </div>
      <div>
        <ListComponent handleOpen={handleTask} theme={theme} />
      </div>
      {newTask && <AddTask handleClose={handleTask} />}
    </div>
  );
};

export default App;
