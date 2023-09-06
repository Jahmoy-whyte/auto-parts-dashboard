import checkResponce from "../check-responce/checkResponce";
import { BASE_URL } from "../base-url/BASEURL";

export const regularFetch = async (
  URL = "",
  method = "GET",
  data,
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
    body: data ? JSON.stringify(data) : null,
  });
  return await checkResponce(responce);
};

export const privateFetch = async (
  URL = "",
  method = "GET",
  accessToken = "",
  data,
  extraHeaders = {}
) => {
  const responce = await fetch(`${BASE_URL}${URL}`, {
    method: method,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      ...extraHeaders,
    },
    body: data ? JSON.stringify(data) : null,
  });
  return await checkResponce(responce);
};
