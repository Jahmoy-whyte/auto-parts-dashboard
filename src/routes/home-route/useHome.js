import { useEffect, useState } from "react";
import useFetchInstance from "../../hooks/useFetchInstance";
import toastMessage from "../../helper/toast-message/toastMessage";
import { useAuthContext } from "../../context/AuthContextProvider";
import { useNavigate } from "react-router-dom";
import useSocket from "../../hooks/useSocket";

const useHome = () => {
  const { tokenAwareFetch } = useFetchInstance();
  const { socketData } = useSocket();
  const nav = useNavigate();
  const windowWidth = window.innerWidth;
  const [menuIsOpen, setMenuIsOpen] = useState(windowWidth > 650);

  const logout = async () => {
    try {
      await tokenAwareFetch("/employee/logout", "POST");
      nav("/");
    } catch (error) {
      toastMessage("error", error.message);
    }
  };
  return [logout, nav, menuIsOpen, setMenuIsOpen, windowWidth];
};

export default useHome;
