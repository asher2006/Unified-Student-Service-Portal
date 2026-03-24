// Admin auth is client-side only — no backend needed.
// Password is checked locally and the admin flag is stored in localStorage.
const ADMIN_PASSWORD = 'admin123';

export const adminService = {
  login: async (password) => {
    // Simple client-side password check — replace with Firebase Auth in production
    if (password === ADMIN_PASSWORD) {
      return { success: true };
    }
    return { success: false, message: 'Invalid password' };
  },
  logout: () => {
    localStorage.removeItem('isAdmin');
    return { success: true };
  },
  isAdmin: () => {
    return localStorage.getItem('isAdmin') === 'true';
  },
};
