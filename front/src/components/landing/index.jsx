import Tutorial from "@/components/landing/Tutorial";
import { useState } from "react";
import { LogoIcon } from "../icons/Logo";

const Landing = () => {
  const [status, setStatus] = useState(0);
  return (
    <div className="absolute inset-0 z-50 flex flex-col bg-white">
      {status === 0 && (
        <>
          <div className="flex w-full h-full items-center justify-center">
            <LogoIcon />
          </div>
          <div className="p-6">
            <button
              className="w-full h-12 bg-black-200 rounded font-bold hover:bg-black-300 transition-colors"
              onClick={() => setStatus(1)}
            >
              시작하기
            </button>
          </div>
        </>
      )}
      {status === 1 && <Tutorial />}
    </div>
  );
};

export default Landing;
