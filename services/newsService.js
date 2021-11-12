import httpService from "./httpService";

const route = `/news`;

async function UpdateNewsItem(body, id) {
  let bodyFormData = new FormData();
  for (let eachKey in body) bodyFormData.append(eachKey, body[eachKey]);
  return await httpService.put(`${route}/${id}`, bodyFormData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}

async function CreateNewsItem(body) {
  let bodyFormData = new FormData();
  for (let eachKey in body) bodyFormData.append(eachKey, body[eachKey]);

  await httpService.post(`${route}`, bodyFormData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}

export { UpdateNewsItem, CreateNewsItem };
