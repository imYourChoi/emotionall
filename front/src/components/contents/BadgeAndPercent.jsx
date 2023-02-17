import { emotionName } from "@/constants/emotion";
import cc from "classcat";

const BadgeAndPercent = ({ emotion, percent }) => (
  <div className="flex flex-col items-center gap-1 w-20">
    <div
      className={cc([
        "badge py-0.5 px-2 text-sm",
        emotion === "positive" && "badge-positive",
        emotion === "negative" && "badge-negative",
        emotion === "neutral" && "badge-neutral",
        emotion === "ambiguous" && "badge-ambiguous",
      ])}
    >
      {emotionName[emotion].kor}
    </div>
    <div className="font-extrabold">{percent}%</div>
  </div>
);

export default BadgeAndPercent;
