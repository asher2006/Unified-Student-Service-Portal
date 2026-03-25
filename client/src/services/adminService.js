import {
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth } from '../firebase';

// Only this email is permitted to access the admin console.
const ALLOWED_ADMIN_EMAIL = 'crceadmin@gmail.com';

export const adminService = {
  /**
   * Sign in with Firebase Email/Password.
   * Returns { success: true } or { success: false, message: string }.
   */
  login: async (email, password) => {
    try {
      const credential = await signInWithEmailAndPassword(auth, email, password);
      if (credential.user.email !== ALLOWED_ADMIN_EMAIL) {
        await signOut(auth);
        return { success: false, message: 'Access denied for this account.' };
      }
      return { success: true };
    } catch (err) {
      const msg =
        err.code === 'auth/invalid-credential' ||
        err.code === 'auth/wrong-password' ||
        err.code === 'auth/user-not-found'
          ? 'Invalid email or password.'
          : err.message;
      return { success: false, message: msg };
    }
  },

  logout: async () => {
    await signOut(auth);
    return { success: true };
  },

  /** Returns the current Firebase user, or null. */
  currentUser: () => auth.currentUser,
};
