import { create } from "zustand";

type UserData = {
  id: number;
  email: string;
  login: string;
  password: string;
};

type AuthStore = {
  user: UserData | null;
  setUser: (user: UserData | null) => void;
  token: string | null;
  setToken: (token: string | null) => void;
  isInitialized: boolean;
  setIsInitialized: (state: boolean) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthStore>()((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  token: null,
  setToken: (token) => set({ token }),
  isInitialized: false,
  setIsInitialized: (state) => set({ isInitialized: state }),
  logout: () => {
    set({ user: null, token: null, isInitialized: false });
  },
}));
