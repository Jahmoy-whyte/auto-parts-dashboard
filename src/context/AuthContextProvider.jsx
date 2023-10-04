import { createContext, useState, useEffect, useContext } from "react";
import {
  privateFetch,
  regularFetch,
} from "../helper/fetch-function/fetchFunction";
import { Navigate } from "react-router-dom";
import LoginRoute from "../routes/login-route/LoginRoute";
const AuthContext = createContext(null);

const AuthContextProvider = ({ children }) => {
  const [authData, setAuthData] = useState({
    isAuth: false,
    isLoading: true,
    accessToken: null,
    user: {
      email: "",
      firstName: "",
      lastName: "",
      id: "",
      role: "",
    },
  });

  const signUp = async (firstName, lastName, email, role, password) => {
    const msg = await regularFetch("/employee/signup", "POST", {
      firstName,
      lastName,
      email,
      role,
      password,
    });
    return msg;
  };

  const logIn = async (email, password) => {
    const { accessToken, user } = await regularFetch(
      "/employee/login",
      "POST",
      {
        email,
        password,
      },
      { credentials: "include" }
    );

    setAuthData((prev) => ({
      ...prev,
      accessToken: accessToken,
      user: user,
      isAuth: true,
    }));
  };

  const logOut = async () => {
    const msg = await privateFetch(
      "/employee/logout",
      "POST",
      authData.accessToken
    );
  };

  useEffect(() => {
    if (authData.accessToken) return;

    const checkForRefreshToken = async () => {
      try {
        const { accessToken, user } = await privateFetch(
          "/employee/refreshtoken"
        );
        alert(accessToken);
        setAuthData((prev) => ({
          ...prev,
          accessToken: accessToken,
          user: user,
          isLoading: false,
          isAuth: true,
        }));
      } catch (error) {
        setAuthData((prev) => ({
          ...prev,
          isLoading: false,
          isAuth: false,
        }));
        alert("here");
      }
    };

    const t = setTimeout(() => {
      // setAuthData((prev) => ({ ...prev, isLoading: false }));\
      checkForRefreshToken();
    }, 1000);

    return () => clearTimeout(t);
  }, [authData.accessToken]);

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
  const {
    isAuth,
    isLoading,
    accessToken,
    setAuthData,
    signUp,
    logIn,
    logOut,
    user,
  } = useContext(AuthContext);
  return {
    isAuth,
    isLoading,
    accessToken,
    setAuthData,
    signUp,
    logIn,
    logOut,
    user,
  };
};

export default AuthContextProvider;
