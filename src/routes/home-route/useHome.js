import { useEffect, useState } from "react";
import useFetchInstance from "../../hooks/useFetchInstance";
import toastMessage from "../../helper/toast-message/toastMessage";
import { useAuthContext } from "../../context/AuthContextProvider";
import { useNavigate } from "react-router-dom";
import useSocket from "../../hooks/useSocket";

const useHome = () => {
  const { tokenAwareFetch } = useFetchInstance();
  const { user, setAuthData } = useAuthContext();
  const [currentPage, setCurrentPage] = useState("Dash Board");
  const nav = useNavigate();
  const windowWidth = window.innerWidth;
  const [menuIsOpen, setMenuIsOpen] = useState(windowWidth > 650);

  const logout = async () => {
    try {
      await tokenAwareFetch("/employee/logout", "POST");
      setAuthData((prev) => ({ ...prev, isAuth: false }));
    } catch (error) {
      toastMessage("error", error.message);
    }
  };
  return [
    logout,
    nav,
    menuIsOpen,
    setMenuIsOpen,
    user,
    currentPage,
    setCurrentPage,
  ];
};

export default useHome;
