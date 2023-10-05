import { useAuthContext } from "../context/AuthContextProvider";
import { privateFetch } from "../helper/fetch-function/fetchFunction";
import { useNavigate } from "react-router-dom";

const useFetchInstance = () => {
  const { accessToken, setAuthData } = useAuthContext();

  const accessTokenErrors = ["jwt expired", "unauthorized(V301)"];
  const refreshTokenErrors = ["forbidden(R101)", "forbidden(R102)"];
  const timeOutFunc = (func) => {
    return new Promise((res, rej) => {
      setTimeout(async () => {
        try {
          const data = await func();
          res(data);
        } catch (error) {
          rej(error);
        }
      }, 1000);
    });
  };

  const tokenAwareFetch = async (
    URL = "",
    method = "GET",
    data,
    extraHeaders = {}
  ) => {
    const fetchData = [URL, method, accessToken, data, extraHeaders];

    try {
      const responce = await timeOutFunc(() => privateFetch(...fetchData));
      return responce;
    } catch (error) {
      if (!accessTokenErrors.includes(error.message)) throw error;
      const tokenData = await getNewAccessToken();

      setAuthData((prev) => ({
        ...prev,
        accessToken: tokenData.accessToken,
        user: tokenData.user,
      }));
      const fetchData = [
        URL,
        method,
        tokenData.accessToken,
        data,
        extraHeaders,
      ];
      const responce = await privateFetch(...fetchData);
      return responce;
    }
  };

  const getNewAccessToken = async () => {
    try {
      const tokenData = await privateFetch("/employee/refreshtoken");
      console.log("================== refresh token");
      return tokenData;
    } catch (error) {
      //console.log(error.message);
      //if (!refreshTokenErrors.includes(error.message)) ;
      setAuthData((prev) => ({ ...prev, isAuth: false }));

      throw error;
    }
  };

  return { tokenAwareFetch };
};

export default useFetchInstance;
/**
 
  headers: {
        "Content-Type": "application/json",
      },
 */
