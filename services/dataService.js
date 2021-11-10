const baseUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
async function getData(token) {
  let data = await fetch(`${baseUrl}/all`, {
    headers: { "x-auth-token": token },
  });
  data = await data.json();

  // console.log(data);
  return data;
}

async function getCurrentUser(token) {
  let data = await fetch(`${baseUrl}/users/me`, {
    headers: { "x-auth-token": token },
  });
  data = await data.json();

  // console.log(data);
  return data;
}

export { getData, getCurrentUser };
