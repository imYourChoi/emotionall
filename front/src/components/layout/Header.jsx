import { useRouter } from "next/router";
import { LogoIcon } from "../icons/Logo";

const Header = () => {
  const router = useRouter();
  const isChat = router.pathname === "/chat/[id]";
  const id = router.query.id;

  return (
    <div className="absolute top-0 inset-x-0 h-[60px] z-10">
      <div className="flex w-full h-full mx-auto bg-white px-6 items-center justify-between">
        <div className="flex gap-x-4 items-center">
          {isChat && <div onClick={() => router.back()}>←</div>}
          {isChat ? <div>{id}</div> : <LogoIcon width={"100px"} />}
        </div>
      </div>
    </div>
  );
};

export default Header;
