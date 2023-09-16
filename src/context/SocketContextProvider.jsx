import { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { BASE_URL } from "../helper/base-url/BASEURL";

const SocketContext = createContext();

const SocketContextProvider = ({ children }) => {
  const [socketData, setSocketData] = useState({
    isLoading: false,
    socket: null,
  });

  useEffect(() => {
    const socket = io(BASE_URL);

    socket.on("connect", () => {});
    setSocketData((prev) => ({ ...prev, socket: "" }));
  }, []);

  return <SocketContext.Provider>{children}</SocketContext.Provider>;
};
export default SocketContextProvider;
