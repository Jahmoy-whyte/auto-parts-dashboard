import { useAuthContext } from "../context/AuthContextProvider";
import checkResponce from "../helper/check-responce/checkResponce";
import { BASE_URL } from "../helper/base-url/BASEURL";
import regularFetch from "../helper/regular-fetch/regularFetch";

const useFetchInstance = () => {
  const { accessToken } = useAuthContext();
  const privateFetch = async (
    URL = "",
    method = "GET",
    data,
    extraHeaders = {}
  ) => {
    try {
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
    } catch (error) {
      if (error.message != "jwt expired") throw error;
      // await getNewAccessToken()
      throw error;
    }
  };

  const getNewAccessToken = async () => {
    try {
      const accesstoken = await regularFetch();
    } catch (error) {}
  };

  return { privateFetch };
};

export default useFetchInstance;
/**
 
  headers: {
        "Content-Type": "application/json",
      },
 */
