import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../config/firebase";

export const GetCategories = async (uid) => {
  try {
    const q = collection(db, "users", uid, "tasks");
    const querySnapshot = await getDocs(q);

    // Mapeamos todas las categorías
    const categorias = querySnapshot.docs.map((doc) => doc.data().category);

    // Filtramos únicas y sacamos nulos/vacíos
    const categoriasUnicas = [...new Set(categorias.filter(Boolean))];

    return { ok: true, data: categoriasUnicas };
  } catch (error) {
    return { ok: false, error: error.message };
  }
};
