import { useRouter } from "next/router";

const Navigation = () => {
  const router = useRouter();
  if (router.pathname === "/chat") return <></>;
  return (
    <div className="fixed bottom-0 inset-x-0 h-[60px] bg-white  z-10">
      <div className="max-w-[430px] w-full mx-auto">Navigation</div>
    </div>
  );
};

export default Navigation;
