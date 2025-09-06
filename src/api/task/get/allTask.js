import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../config/firebase";

export const GetTasks = async (uid, categoria = null) => {
  try {
    let q = collection(db, "users", uid, "tasks");
    if (categoria) {
      q = query(q, where("categoria", "==", categoria));
    }
    const querySnapshot = await getDocs(q);
    const tasks = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return { ok: true, data: tasks };
  } catch (error) {
    return { ok: false, error: error.message };
  }
};
