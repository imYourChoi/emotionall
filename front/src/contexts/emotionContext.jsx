import { createContext, useContext, useState } from "react";

export const EmotionContext = createContext({
  mainEmotion: "",
});

const EmotionContextProvider = ({ children }) => {
  const [mainEmotion, setMainEmotion] = useState("positive");

  return (
    <EmotionContext.Provider
      value={{
        mainEmotion,
      }}
    >
      {children}
    </EmotionContext.Provider>
  );
};

export default EmotionContextProvider;
export const useEmotion = () => useContext(EmotionContext);
