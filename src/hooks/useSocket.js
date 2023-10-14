import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { BASE_URL } from "../helper/base-url/BASEURL";
import toastMessage from "../helper/toast-message/toastMessage";
import { useAuthContext } from "../context/AuthContextProvider";
import useFetchInstance from "./useFetchInstance";

const useSocket = () => {
  const [socketData, setSocketData] = useState({
    isLoading: false,
    socket: null,
    error: null,
  });
  const { accessToken, setAuthData, user } = useAuthContext();
  const { tokenAwareFetch } = useFetchInstance();

  useEffect(() => {
    const socket = io(BASE_URL, {
      auth: {
        token: accessToken,
        role: user.role,
      },
    });

    const socketAuthErrors = ["no token", "jwt expired"];

    socket.on("connect", () => {
      setSocketData((prev) => ({ ...prev, socket: socket, isLoading: false }));
    });

    socket.on("disconnect", () => {
      setSocketData({
        isLoading: false,
        socket: null,
        error: null,
      });
    });

    socket.on("connect_error", async ({ message }) => {
      if (!socketAuthErrors.includes(message)) {
        setSocketData((prev) => ({
          ...prev,
          error: message,
          isLoading: false,
        }));
        toastMessage("error", "Socket " + message);
        return;
      }
      try {
        const { accessToken, user } = await tokenAwareFetch(
          "/employee/refreshtoken"
        );

        socket.auth.token = accessToken;
        socket.auth.role = user.role;
        socket.connect();

        setAuthData((prev) => ({
          ...prev,
          accessToken: accessToken,
          user: user,
        }));
      } catch (error) {
        setAuthData((prev) => ({ ...prev, isAuth: false }));
        toastMessage("error", error.message);
      }
    });

    return () => socket.disconnect();
  }, []);

  return { socketData };
};
export default useSocket;
