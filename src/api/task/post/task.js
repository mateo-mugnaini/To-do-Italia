import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../config/firebase";

export const CreateTask = async (uid, task) => {
  try {
    await addDoc(collection(db, "users", uid, "tasks"), {
      ...task,
      createdAt: new Date(),
    });
    return { ok: true };
  } catch (error) {
    return { ok: false, error: error.message };
  }
};
