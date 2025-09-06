import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../../config/firebase";

export const DeleteTask = async (uid, taskId) => {
  try {
    const taskRef = doc(db, "users", uid, "tasks", taskId);
    await deleteDoc(taskRef);
    return { ok: true };
  } catch (error) {
    return { ok: false, error: error.message };
  }
};
