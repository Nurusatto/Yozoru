import { create } from "zustand";

type UserData = {
  avatarUrl?: string;
  googleId?: string;
  id: number;
  email: string;
  login: string;
  password: string;
};

type ParticalUserData = Partial<UserData>;

type AuthStore = {
  user: UserData | null;
  setUser: (user: ParticalUserData | null) => void;
  token: string | null;
  setToken: (token: string | null) => void;
  isInitialized: boolean;
  setIsInitialized: (state: boolean) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthStore>()((set) => ({
  user: null,

  setUser: (user: ParticalUserData | null) =>
    set((state) => ({
      user: user ? ({ ...(state.user ?? {}), ...user } as UserData) : null,
    })),

  token: null,
  setToken: (token) => set({ token }),
  isInitialized: false,
  setIsInitialized: (state) => set({ isInitialized: state }),
  logout: () => {
    set({ user: null, token: null, isInitialized: false });
  },
}));
