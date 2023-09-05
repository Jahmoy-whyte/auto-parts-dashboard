import checkResponce from "../check-responce/checkResponce";
import { BASE_URL } from "../base-url/BASEURL";
const regularFetch = async (
  URL = "",
  method = "GET",
  data,
  extraHeaders = {}
) => {
  const responce = await fetch(`${BASE_URL}${URL}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      ...extraHeaders,
    },
    body: data ? JSON.stringify(data) : null,
  });
  return await checkResponce(responce);
};

export default regularFetch;
