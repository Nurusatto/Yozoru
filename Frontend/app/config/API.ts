export const api_url = import.meta.env.VITE_API_URL;

export const prefix = {
  auth: {
    register: "/users/auth/register",
    registerVerify: "/users/auth/registerVerify",

    getDataUser: "/users/account/me",
    getAccessTokenUser: "/users/account/accessToken",
  },
  login: {
    login: "/users/auth/login",
    loginVerify: "/users/auth/loginVerify",

    logOut: "/users/auth/logout",
  },
  social: {
    google: {
      auth: "/users/auth/google",
      call: "/users/auth/google/callback",
    },
  },
};
