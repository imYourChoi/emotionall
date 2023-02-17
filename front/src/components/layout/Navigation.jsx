import { useRouter } from "next/router";
import Link from "next/link";
import { ContentsIcon, HomeIcon, ListIcon, SettingIcon } from "../icons/Icons";
import { useEmotion } from "@/contexts/emotionContext";

const pages = [
  { path: "/", text: "홈", icon: HomeIcon },
  { path: "/chat", text: "채팅방", icon: ListIcon },
  { path: "/contents", text: "콘텐츠", icon: ContentsIcon },
  { path: "/settings", text: "설정", icon: SettingIcon },
];

const Navigation = () => {
  const router = useRouter();
  const { mainEmotion } = useEmotion();

  if (router.pathname === "/chat/[id]") return <></>;
  return (
    <div className="absolute bottom-0 inset-x-0 w-full h-[60px] mx-auto flex items-center justify-between px-12 bg-white">
      {pages.map((page) => (
        <Link
          href={page.path}
          key={page.text}
          className="black-900 text-xs font-bold w-12 flex flex-col items-center gap-y-1"
        >
          {page.icon({
            color: router.pathname === page.path ? mainEmotion : "disactive",
          })}
          {page.text}
        </Link>
      ))}
    </div>
  );
};

export default Navigation;
