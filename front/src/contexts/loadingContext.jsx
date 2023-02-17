import { createContext, useContext, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import {
  AmbiguousFace,
  NegativeFace,
  PositiveFace,
} from "@/components/icons/Emotions";

export const LoadingContext = createContext({
  load: () => {},
  endLoad: () => {},
});

const LoadingContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const load = () => {
    setLoading(true);
  };

  const endLoad = () => {
    setLoading(false);
  };

  useEffect(() => {
    endLoad();
  }, [router]);

  return (
    <LoadingContext.Provider
      value={{
        load,
        endLoad,
      }}
    >
      {loading ? "dd" : "ss"}
      <div className="fixed inset-0 flex justify-center z-50">
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              className="w-full h-full max-w-[430px] bg-black-900 bg-opacity-30 flex items-center justify-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0, transition: { duration: 0.2 } }}
                className="flex items-center justify-center animate-bounce"
              >
                <PositiveFace />
                <NegativeFace />
                <AmbiguousFace />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {children}
    </LoadingContext.Provider>
  );
};

export default LoadingContextProvider;

export const useLoading = () => useContext(LoadingContext);
