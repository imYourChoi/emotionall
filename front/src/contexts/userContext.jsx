import { createContext, useContext, useState } from "react";

export const UserContext = createContext({
  mainUser: null,
  setUser: () => {},
});

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({
    nickname: "",
    message: "",
    avatar: {
      skin: 0,
      eyes: 0,
      hair: 0,
      glasses: 0,
    },
    badge: "",
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
