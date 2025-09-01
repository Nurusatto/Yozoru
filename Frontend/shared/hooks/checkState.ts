import { useAuthStore } from "@/app/provider/store/authStore";

// Получить всё состояние

export const checkState = () => {
  console.log(useAuthStore.getState());

  // Получить конкретное поле
  console.log(useAuthStore.getState().user);
};
