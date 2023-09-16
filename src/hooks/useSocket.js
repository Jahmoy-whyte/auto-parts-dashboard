import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { BASE_URL } from "../helper/base-url/BASEURL";
import toastMessage from "../helper/toast-message/toastMessage";

const useSocket = () => {
  const [socketData, setSocketData] = useState({
    isLoading: false,
    socket: null,
    error: null,
  });

  useEffect(() => {
    const socket = io(BASE_URL);

    socket.on("connect", () => {
      console.log(socket.id);
      setSocketData((prev) => ({ ...prev, socket: socket, isLoading: false }));
    });

    socket.on("disconnect", () => {
      setSocketData({
        isLoading: false,
        socket: null,
        error: null,
      });
    });

    socket.on("connect_error", ({ message }) => {
      toastMessage("error", "Socket " + message);

      if (message == "unauthorized(V101)") {
      }
      console.log(message);
      setSocketData((prev) => ({ ...prev, error: message, isLoading: false }));
    });

    return () => socket.disconnect();
  }, []);

  return { socketData };
};
export default useSocket;
