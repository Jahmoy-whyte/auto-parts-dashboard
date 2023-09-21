import { createContext, useState, useEffect, useContext } from "react";
import {
  privateFetch,
  regularFetch,
} from "../helper/fetch-function/fetchFunction";
const AuthContext = createContext(null);

const AuthContextProvider = ({ children }) => {
  const [authData, setAuthData] = useState({
    isAuth: false,
    isLoading: true,
    accessToken: null,
  });

  const signUp = async (firstName, lastName, email, password) => {
    const msg = await regularFetch("/employee/signup", "POST", {
      firstName,
      lastName,
      email,
      password,
    });
  };

  const logIn = async (email, password) => {
    const accessToken = await regularFetch(
      "/employee/login",
      "POST",
      {
        email,
        password,
      },
      { credentials: "include" }
    );
    setAuthData((prev) => ({ ...prev, accessToken: accessToken }));
  };

  const logOut = async () => {
    const msg = await privateFetch(
      "/employee/logout",
      "POST",
      authData.accessToken
    );
  };

  useEffect(() => {
    const t = setTimeout(() => {
      setAuthData((prev) => ({ ...prev, isLoading: false }));
    }, 1000);

    return () => clearTimeout(t);
  }, []);

  if (authData.isLoading) {
    return <p>isLoading</p>;
  }

  // console.log(authData);
  return (
    <AuthContext.Provider
      value={{ ...authData, setAuthData, signUp, logIn, logOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const { isAuth, isLoading, accessToken, setAuthData, signUp, logIn, logOut } =
    useContext(AuthContext);
  return { isAuth, isLoading, accessToken, setAuthData, signUp, logIn, logOut };
};

export default AuthContextProvider;
