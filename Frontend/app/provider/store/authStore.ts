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
  logout: () => void;
};

export const useAuthStore = create<AuthStore>()((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => {
    set({ user: null });
  },
}));
