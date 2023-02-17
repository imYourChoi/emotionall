import { createContext, useContext, useState } from "react";

export const UserContext = createContext({
  mainUser: null,
  setUser: () => {},
});

const UserContextProvider = ({ children }) => {
  const [userId, setUserId] = useState("t");
  const [user, setUser] = useState({
    nickname: "김철수",
    message: "예시",
    avatar: {
      skin: 0,
      eyes: 0,
      hair: 0,
      glasses: 0,
    },
    badge: "",
  });

  return (
    <UserContext.Provider value={{ userId, user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
export const useUser = () => useContext(UserContext);
