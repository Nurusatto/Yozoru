export const api_url = import.meta.env.VITE_API_URL;

export const socket_url = import.meta.env.VITE_SOCKET_URL;

export const socketBreakpoint = {
  notific: "/notifications",
};

export const prefix = {
  auth: {
    register: "/auth/register",
    registerVerify: "/auth/verify-register",

    getDataUser: "/account/me",
    getAccessTokenUser: "/account/accessToken",
  },
  login: {
    login: "/auth/login",
    loginVerify: "/auth/verify-login",

    logOut: "/auth/logout",
  },
  social: {
    google: {
      auth: "/auth/google",
      call: "/auth/google/callback",
    },
  },
  friend: {
    send: "/friendship/send", // UID
    accept: "/friendship/accept", //id
    decline: "/friendship/decline", //id
    friends: "/friendship/friends",
    receivedFriends: "/friendship/received-friends",
    sendedFriends: "/friendship/sended-friends",
  },
};
