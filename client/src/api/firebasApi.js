import { signOut } from "firebase/auth";
import { auth } from "../../firebase/config.js";

export const handleSignOut = async () => {
  try {
    await signOut(auth);
    console.log("logged out");
  } catch (err) {
    console.log(err);
  }
};
