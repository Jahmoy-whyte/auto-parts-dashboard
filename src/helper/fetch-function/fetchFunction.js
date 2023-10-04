import checkResponce from "../check-responce/checkResponce";
import { BASE_URL } from "../base-url/BASEURL";

export const regularFetch = async (
  URL = "",
  method = "GET",
  body,
  extraOptions = {},
  extraHeaders = {}
) => {
  const responce = await fetch(`${BASE_URL}${URL}`, {
    method: method,
    ...extraOptions,
    headers: {
      "Content-Type": "application/json",
      ...extraHeaders,
    },
    body: body ? JSON.stringify(body) : null,
  });
  return await checkResponce(responce);
};

export const privateFetch = async (
  URL = "",
  method = "GET",
  accessToken = "",
  body,
  extraHeaders = {}
) => {
  console.log(`${BASE_URL}${URL}`);
  const responce = await fetch(`${BASE_URL}${URL}`, {
    method: method,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      ...extraHeaders,
    },
    body: body ? JSON.stringify(body) : null,
  });
  return await checkResponce(responce);
};
