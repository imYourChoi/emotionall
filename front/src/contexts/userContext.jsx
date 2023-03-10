import Landing from "@/components/landing";
import { createContext, useContext, useEffect, useState } from "react";

export const UserContext = createContext({
  mainUser: null,
  setUser: () => {},
  userId: null,
  setUserId: () => {},
});

const UserContextProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState({
    nickname: "우기",
    message: "",
    avatar: {
      skin: 2,
      eyes: 1,
      hair: 11,
      glasses: 0,
    },
    badge: "",
  });

  useEffect(() => {
    const u = localStorage.getItem("userId");
    if (u) {
      setUserId(u);
    }

    const us = localStorage.getItem("user");
    if (us) {
      setUser(JSON.parse(us));
    }
  }, []);

  return (
    <UserContext.Provider value={{ userId, user, setUser, setUserId }}>
      {userId ? (
        children
      ) : (
        <div id="container" className="flex items-center justify-center">
          <main className="relative w-full max-w-[430px] h-screen">
            <Landing />
          </main>
        </div>
      )}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
export const useUser = () => useContext(UserContext);
