import { useEffect, useState } from "react";
import cc from "classcat";
import { emotionName } from "@/constants/emotion";

const dummy = [
  { name: "positive", count: 53 },
  { name: "neutral", count: 25 },
  { name: "ambiguous", count: 12 },
  { name: "negative", count: 10 },
];

const BarChart = () => {
  const [data, setData] = useState(dummy);
  const [sorted, setSorted] = useState([]);
  useEffect(() => {
    const newData = Array.from(dummy);
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
          <div
            className="flex flex-col items-center gap-1 w-20"
            key={item.name}
          >
            <div
              className={cc([
                "badge py-0.5 px-2 text-sm",
                item.name === "positive" && "badge-positive",
                item.name === "negative" && "badge-negative",
                item.name === "neutral" && "badge-neutral",
                item.name === "ambiguous" && "badge-ambiguous",
              ])}
            >
              {emotionName[item.name].kor}
            </div>
            <div className="font-extrabold">{item.count}%</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BarChart;
