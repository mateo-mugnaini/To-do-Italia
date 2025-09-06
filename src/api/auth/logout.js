import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";

export const LogoutUser = async () => {
  try {
    await signOut(auth);
    return { ok: true };
  } catch (error) {
    return { ok: false, error: error.message };
  }
};
