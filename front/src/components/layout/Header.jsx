import Logo from "@/static/Logo.svg";

const Header = () => {
  return (
    <div className="fixed top-0 inset-x-0 h-[60px] z-10">
      <div className="max-w-[430px]  flex w-full h-full mx-auto bg-white px-6 items-center justify-between">
        <Logo />
      </div>
    </div>
  );
};

export default Header;
