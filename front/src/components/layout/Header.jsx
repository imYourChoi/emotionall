import { useRouter } from "next/router";
import Logo from "@/static/Logo.svg";

const Header = () => {
  const router = useRouter();
  const isChat = router.pathname === "/chat/[id]";
  const id = router.query.id;

  return (
    <div className="fixed top-0 inset-x-0 h-[60px] z-10">
      <div className="max-w-[430px]  flex w-full h-full mx-auto bg-white px-6 items-center justify-between">
        <div className="flex gap-x-4 items-center">
          {isChat && <div onClick={() => router.back()}>back</div>}
          {isChat ? <div>{id}</div> : <Logo />}
        </div>
      </div>
    </div>
  );
};

export default Header;
