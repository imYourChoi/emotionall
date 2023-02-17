import Link from "next/link";
import { useRouter } from "next/router";
import { ArrowLeftIcon, AddIcon } from "../icons/Icons";
import { LogoIcon } from "../icons/Logo";

const Header = () => {
  const router = useRouter();
  const hasBackButton =
    router.pathname === "/chat/[id]" ||
    router.pathname === "/chat/search" ||
    router.pathname.includes("/contents/");
  const hasAddButton = router.pathname === "/chat";
  const isSearch = router.pathname === "/chat/search";
  const id = router.query.id;

  return (
    <div className="absolute top-0 inset-x-0 h-[60px] z-10">
      <div className="flex w-full h-full mx-auto bg-white px-6 items-center justify-between">
        <div className="flex gap-x-4 items-center">
          {hasBackButton && (
            <button onClick={() => router.back()}>
              <ArrowLeftIcon className="fill-black-900" />
            </button>
          )}
          {hasBackButton ? (
            <div className="font-bold text-sm">{id}</div>
          ) : (
            <LogoIcon width={"100px"} />
          )}
          {isSearch && (
            <div className="font-bold text-sm ml-[-16px]">친구 검색</div>
          )}
        </div>
        {hasAddButton && (
          <Link href={"/chat/search"}>
            <AddIcon />
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
