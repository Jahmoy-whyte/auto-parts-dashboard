import { useContext, createContext, useState } from "react";

const UserInfoContext = createContext(null);
const UserInfoContextProvider = ({ children }) => {
  const [user, setUser] = useState({
    email: "",
    name: "",
    id: "",
    role: "",
    isLoading: true,
  });

  return (
    <UserInfoContext.Provider value={{ ...user, setUser }}>
      {children}
    </UserInfoContext.Provider>
  );
};

export const useUserInfoContext = () => {
  const { email, name, id, role, setUser, isLoading } =
    useContext(UserInfoContext);
  return { email, name, id, role, setUser, isLoading };
};

export default UserInfoContextProvider;
