import { createContext, useState, useEffect, useContext } from "react";
import regularFetch from "../helper/regular-fetch/regularFetch";
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
    const accessToken = await regularFetch("/employee/login", "POST", {
      email,
      password,
    });
    setAuthData((prev) => ({ ...prev, accessToken: accessToken }));
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

  console.log(authData);
  return (
    <AuthContext.Provider value={{ ...authData, signUp, logIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const { isAuth, isLoading, accessToken, signUp, logIn } =
    useContext(AuthContext);
  return { isAuth, isLoading, accessToken, signUp, logIn };
};

export default AuthContextProvider;
