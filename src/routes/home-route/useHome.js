import { useEffect, useState } from "react";
import useFetchInstance from "../../hooks/useFetchInstance";
import toastMessage from "../../helper/toast-message/toastMessage";
import { useAuthContext } from "../../context/AuthContextProvider";
import { useNavigate } from "react-router-dom";

const useHome = () => {
  const { tokenAwareFetch } = useFetchInstance();
  const nav = useNavigate();

  const logout = async () => {
    try {
      await tokenAwareFetch("/employee/logout", "POST");
      nav("/");
    } catch (error) {
      toastMessage("error", error.message);
    }
  };
  return [logout];
};

export default useHome;
