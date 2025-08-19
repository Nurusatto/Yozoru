import { create } from "zustand";

type UserData = {
  id: number | null;
  login: string | null;
  email: string | null;
};

type AuthStore = {
  user: UserData | null;
  setUser: (user: UserData | null) => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
