import httpService from "./httpService";

const route = `/users`;

async function login(body) {
  return await httpService.post(`${route}/login`, body);
}

async function getCurrentUser(token) {
  return await httpService.get(`${route}/me`);
}

async function UpdateUser(body, id) {
  return await httpService.put(`${route}/${id}`, body);
}

async function CreateUser(body) {
  return await httpService.post(`${route}`, body);
}

async function DeleteUser(id) {
  return await httpService.delete(`${route}/${id}`);
}

export { login, getCurrentUser, CreateUser, UpdateUser, DeleteUser };
