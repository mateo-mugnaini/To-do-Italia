import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";

export const LoginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return { ok: true, data: userCredential.user };
  } catch (error) {
    return { ok: false, error: error.message };
  }
};
