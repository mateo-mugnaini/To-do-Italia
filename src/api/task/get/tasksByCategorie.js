import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../config/firebase";

export const GetTasksByCategories = async (uid, categoria = "All") => {
  console.log("🚀 ~ GetTasksByCategories ~ categoria:", categoria);
  try {
    let q = collection(db, "users", uid, "tasks");

    // 👉 si no es "All", aplicamos filtro
    if (categoria && categoria !== "All") {
      q = query(q, where("category", "==", categoria)); // 👈 antes estaba "categoria"
    }


    const querySnapshot = await getDocs(q);
    const tasks = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log("🚀 ~ GetTasksByCategories ~ tasks:", tasks);
    return { ok: true, data: tasks };
  } catch (error) {
    return { ok: false, error: error.message };
  }
};
