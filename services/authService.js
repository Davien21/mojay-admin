import httpService from "./httpService";

const apiEndpoint = `/users`;

export async function login({ email, password }) {
  const { data } = await httpService.post(`${apiEndpoint}/login`, {
    email,
    password,
  });
  return data.data;
}

async function getCurrentUser(token) {
  const { data } = await httpService.post(`${apiEndpoint}/me`, {
    token,
  });
  return data.data;
}

export function logout() {
  // localStorage.removeItem(tokenKey);
}

// export async function loginWithJwt(jwt) {
//   localStorage.setItem(tokenKey, jwt);
// }

// export function getCurrentUser() {
//   try {
//     const jwt = localStorage.getItem(tokenKey);
//     return jwtDecode(jwt);
//   } catch (ex) {
//     return null;
//   }
// }

// export function getJwt() {
//   return localStorage.getItem(tokenKey);
// }

const auth = { login };

export default auth;
