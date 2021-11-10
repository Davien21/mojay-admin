import httpService from "./httpService";

const apiEndpoint = `/news`;

httpService.setJwt(getJwt());

async function submitForm(form) {
  console.log(form)
}

export { submitForm };
