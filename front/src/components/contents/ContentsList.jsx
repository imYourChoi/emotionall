import Link from "next/link";
import { PositiveFace } from "../icons/Emotions";
import { ArrowRightIcon } from "../icons/Icons";

const contentsList = [
  { path: "/contents/report", title: "감정 보고서" },
  { path: "/", title: "채팅 분석" },
];

const ContentsList = () => (
  <div className="w-full px-8 flex flex-col gap-4">
    <div className="flex gap-2 pt-2 items-center font-bold text-lg">
      <PositiveFace width="24px" />내 채팅 분석
    </div>
    <ul>
      {contentsList.map((item) => (
        <Link href={item.path} key={item.path}>
          <li className="h-[60px] flex items-center font-medium justify-between">
            {item.title}
            <ArrowRightIcon className="fill-black-300" />
          </li>
        </Link>
      ))}
    </ul>
  </div>
);

export default ContentsList;
