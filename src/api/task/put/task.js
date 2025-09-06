import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../config/firebase";

export const EditTask = async (uid, taskId, updates) => {
  console.log("🚀 ~ EditTask ~ updates:", updates);
  console.log("🚀 ~ EditTask ~ taskId:", taskId);
  console.log("🚀 ~ EditTask ~ uid:", uid);
  try {
    const taskRef = doc(db, "users", uid, "tasks", taskId);
    await updateDoc(taskRef, updates);
    return { ok: true };
  } catch (error) {
    return { ok: false, error: error.message };
  }
};
