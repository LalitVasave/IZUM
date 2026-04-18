import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'driver' | 'admin';
}

interface AuthState {
  token: string | null;
  user: User | null;
  setAuth: (token: string, user: User) => void;
  clearAuth: () => void;
  isAuthenticated: () => boolean;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,

      setAuth: (token, user) => {
        set({ token, user });
        // Also store token for axios interceptors
        localStorage.setItem('izum_token', token);
      },

      clearAuth: () => {
        set({ token: null, user: null });
        localStorage.removeItem('izum_token');
      },

      isAuthenticated: () => {
        return !!get().token;
      },
    }),
    {
      name: 'izum-auth', // key in localStorage
    }
  )
);

export default useAuthStore;
