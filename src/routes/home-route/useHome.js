import { useEffect, useState } from "react";
import useFetchInstance from "../../hooks/useFetchInstance";
import toastMessage from "../../helper/toast-message/toastMessage";

const useHome = () => {
  const [] = useState();
  const { privateFetch } = useFetchInstance();
  useEffect(() => {}, []);

  const logout = async () => {
    try {
      await privateFetch("/employee/logout", "POST");
    } catch (error) {
      toastMessage("error", error.message);
    }
  };
  return [logout];
};

export default useHome;
