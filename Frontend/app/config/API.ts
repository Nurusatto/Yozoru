export const api_url = import.meta.env.VITE_API_URL;

export const socket_url = import.meta.env.VITE_SOCKET_URL;

// export const prefix = {
//   auth: {
//     register: "/users/auth/register",
//     registerVerify: "/users/auth/registerVerify",

//     getDataUser: "/users/account/me",
//     getAccessTokenUser: "/users/account/accessToken",
//   },
//   login: {
//     login: "/users/auth/login",
//     loginVerify: "/users/auth/loginVerify",

//     logOut: "/users/auth/logout",
//   },
//   social: {
//     google: {
//       auth: "/users/auth/google",
//       call: "/users/auth/google/callback",
//     },
//   },
// };

export const prefix = {
  auth: {
    register: "/auth/register",
    registerVerify: "/auth/verify-register",

    getDataUser: "/account/me",
    getAccessTokenUser: "/account/accessToken",
  },
  login: {
    login: "/auth/login",
    loginVerify: "/users/auth/verify-login",

    logOut: "/auth/logout",
  },
  social: {
    google: {
      auth: "/auth/google",
      call: "/auth/google/callback",
    },
  },
};
