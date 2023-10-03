import { useAuthContext } from "../context/AuthContextProvider";
import { privateFetch } from "../helper/fetch-function/fetchFunction";
import { useNavigate } from "react-router-dom";

const useFetchInstance = () => {
  const { accessToken, setAuthData } = useAuthContext();
  const nav = useNavigate();
  const tokenErrors = ["jwt expired", "unauthorized(V301)"];
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
      if (!tokenErrors.includes(error.message)) throw error;
      const newAccessToken = await getNewAccessToken();
      setAuthData((prev) => ({ ...prev, accessToken: newAccessToken }));
      const fetchData = [URL, method, newAccessToken, data, extraHeaders];
      const responce = await privateFetch(...fetchData);
      return responce;
    }
  };

  const getNewAccessToken = async () => {
    try {
      const accessToken = await privateFetch("/employee/refreshtoken", "POST");
      console.log("================== refresh token");
      return accessToken;
    } catch (error) {
      if (!refreshTokenErrors.includes(error.message)) throw error;
      setAuthData((prev) => ({ ...prev, isAuth: false }));
      nav("/");
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
