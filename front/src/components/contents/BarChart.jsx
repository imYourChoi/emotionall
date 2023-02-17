import { useEffect, useState } from "react";
import cc from "classcat";
import { emotionName } from "@/constants/emotion";
import BadgeAndPercent from "./BadgeAndPercent";

const BarChart = ({ data }) => {
  const [sorted, setSorted] = useState([]);
  useEffect(() => {
    const newData = Array.from(data);
    newData.sort((a, b) => b.count - a.count);
    setSorted(newData);
  }, [data]);
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full rounded-full h-4 overflow-hidden flex">
        {sorted.map((item) => (
          <div
            className={cc([
              "h-full",
              item.name === "positive" && "bg-positive",
              item.name === "negative" && "bg-negative",
              item.name === "neutral" && "bg-neutral",
              item.name === "ambiguous" && "bg-ambiguous",
            ])}
            key={item.name}
            style={{ width: `${item.count}%` }}
          ></div>
        ))}
      </div>
      <div className="flex items-center justify-center">
        {sorted.map((item) => (
          <BadgeAndPercent
            key={item.name}
            emotion={item.name}
            percent={item.count}
          />
        ))}
      </div>
    </div>
  );
};

export default BarChart;
