import { createContext, useContext, useState } from "react";

export const UserContext = createContext({
  mainUser: null,
  setUser: () => {},
});

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({
    nickname: "",
  });

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
export const useUser = () => useContext(UserContext);
