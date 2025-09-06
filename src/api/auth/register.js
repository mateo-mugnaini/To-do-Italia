import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";

export const RegisterUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return { ok: true, data: userCredential.user };
  } catch (error) {
    return { ok: false, error: error.message };
  }
};
