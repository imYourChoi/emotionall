import { LogoIcon } from "../../components/icons/Logo";

const Landing = () => {
  return (
    <div className="absolute inset-0 z-50 flex flex-col bg-white">
      <div className="flex w-full h-full items-center justify-center">
        <LogoIcon />
      </div>
      <div className="p-6">
        <button className="w-full h-12 bg-black-200 rounded font-bold hover:bg-black-300 transition-colors">
          시작하기
        </button>
      </div>
    </div>
  );
};

export default Landing;
