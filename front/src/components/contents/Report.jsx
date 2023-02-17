import { useEmotion } from "@/contexts/emotionContext";
import { useUser } from "@/contexts/userContext";
import Avatar from "../avatar/Avatar";
import cc from "classcat";
import { badge } from "@/constants/badge";
import BarChart from "./BarChart";

const Report = () => {
  const { user } = useUser();
  const { mainEmotion: emotion } = useEmotion();
  return (
    <div className="px-6 pt-4">
      <div className="report-title">감정 보고서</div>
      <div className="w-full flex items-center">
        <Avatar width="128px" avatar={user.avatar} emotion={emotion} />
        <div className="flex flex-col gap-2">
          <div
            className={cc([
              "badge badge-none",
              badge[user.badge].color === "positive" && "badge-positive",
              badge[user.badge].color === "negative" && "badge-negative",
              badge[user.badge].color === "neutral" && "badge-neutral",
              badge[user.badge].color === "ambiguous" && "badge-ambiguous",
            ])}
          >
            {badge[user.badge].name}
          </div>
          <ul className="list-disc list-outside pl-6 text-sm font-medium">
            {badge[user.badge].description.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="w-full bg-black-200 h-px my-4" />
      <div className="report-title">
        세부 보고서
        <div className="py-4">
          <BarChart />
        </div>
      </div>
    </div>
  );
};

export default Report;
