import axios from "axios";
import MockAdapter from "axios-mock-adapter";

// Инициализируем мок
const mock = new MockAdapter(axios, { delayResponse: 500 });

// Наши тестовые данные
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let currentUser: any = null;

const fakeUser = {
  id: 1,
  name: "Nurusatto",
  email: "nursat21102017@gmai.com",
  password: "123456789qw",
};

// Мокаем login
mock.onPost("/auth/login").reply((config) => {
  const { email, password } = JSON.parse(config.data);

  if (email === fakeUser.email && password === fakeUser.password) {
    currentUser = { ...fakeUser };
    delete currentUser.password;
    return [200, { user: currentUser }];
  }

  return [401, { message: "Invalid credentials" }];
});

// Мокаем me (проверка авторизации)
mock.onGet("/auth/me").reply(() => {
  if (currentUser) {
    return [200, currentUser];
  }
  return [401, { message: "Not authorized" }];
});

// Мокаем logout
mock.onPost("/auth/logout").reply(() => {
  currentUser = null;
  return [200, { success: true }];
});

export default mock;
