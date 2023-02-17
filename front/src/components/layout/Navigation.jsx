import { useRouter } from "next/router";
import Link from "next/link";

const pages = [
  { path: "/", text: "홈" },
  { path: "/chat", text: "채팅방" },
  { path: "/contents", text: "콘텐츠" },
  { path: "/settings", text: "설정" },
];

const Navigation = () => {
  const router = useRouter();
  if (router.pathname === "/chat/[id]") return <></>;
  return (
    <div className="fixed bottom-0 inset-x-0 h-[60px] z-10">
      <div className="max-w-[430px] w-full h-full mx-auto flex items-center justify-between px-12 bg-white">
        {pages.map((page) => (
          <Link
            href={page.path}
            key={page.text}
            className="black-900 text-xs font-bold w-12 flex flex-col items-center gap-y-1"
          >
            <div className="w-6 h-6 bg-black-300">icon</div>
            {page.text}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Navigation;
