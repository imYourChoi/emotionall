import { useEmotion } from "@/contexts/emotionContext";
import { useUser } from "@/contexts/userContext";
import Avatar from "../avatar/Avatar";
import cc from "classcat";
import { badge } from "@/constants/badge";
import BarChart from "./BarChart";
import { checkTextEndsWithCoda } from "@/utils/texts";
import BadgeAndPercent from "./BadgeAndPercent";
import { InfoIcon } from "../icons/Icons";
import { useEffect, useState } from "react";
import { emotionClass } from "@/constants/emotion";

const dummy = [
  { name: "good", count: 499 },
  { name: "dislike", count: 235 },
  { name: "bored", count: 29 },
  { name: "fear", count: 130 },
  { name: "none", count: 302 },
  { name: "sadness", count: 32 },
  { name: "surprised", count: 32 },
];

const Report = () => {
  const { user } = useUser();
  const { mainEmotion: emotion } = useEmotion();
  const [simple, setSimple] = useState([]);

  useEffect(() => {
    let s = { positive: 0, negative: 0, neutral: 0, ambiguous: 0 };
    let total = 0;
    dummy.forEach((item) => {
      s[emotionClass[item.name].class] += item.count;
      total += item.count;
    });
    setSimple(
      Object.keys(s).reduce((p, c) => {
        return [...p, { name: c, count: (s[c] / total) * 100 }];
      }, [])
    );
    console.log(
      Object.keys(s).reduce((p, c) => {
        return [...p, { name: c, count: (s[c] / total) * 100 }];
      }, [])
    );
  }, [dummy]);

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
      <div className="py-4">
        <BarChart data={simple} />

        <div className="w-full bg-black-100 rounded-md px-4 py-4 text-sm mt-6 flex flex-col gap-1">
          <div className="flex items-center gap-2 font-bold">
            <InfoIcon width="18px" className="fill-black-600" />
            감정 분류에 대하여
          </div>
          <div className="grid grid-cols-2 gap-y-3 mt-2">
            <div>
              <span className="badge badge-positive py-1 px-2 text-xs">
                긍정
              </span>{" "}
              좋음 / 놀람
            </div>
            <div>
              <span className="badge badge-negative py-1 px-2 text-xs">
                부정
              </span>{" "}
              싫음 / 슬픔 / 두려움
            </div>
            <div>
              <span className="badge badge-neutral py-1 px-2 text-xs">
                중립
              </span>{" "}
              감정없음 / 불확실
            </div>
            <div>
              <span className="badge badge-ambiguous py-1 px-2 text-xs">
                모호
              </span>{" "}
              지루함 / 창피함
            </div>
          </div>
        </div>

        <div className="font-bold text-center mt-6 mb-4">세부 감정</div>
        <div className="flex gap-8 items-center justify-center h-36 w-full">
          <div className="flex flex-col justify-center gap-4 h-full">
            {dummy
              .sort((a, b) => b.count - a.count)
              .slice(0, 3)
              .map((item, i) => (
                <div className="flex items-center gap-2 font-bold">
                  <div
                    className={cc([
                      "w-12 h-8 rounded-full flex items-center justify-center",
                      emotionClass[item.name].class === "positive" &&
                        "badge-positive",
                      emotionClass[item.name].class === "negative" &&
                        "badge-negative",
                      emotionClass[item.name].class === "neutral" &&
                        "badge-neutral",
                      emotionClass[item.name].class === "ambiguous" &&
                        "badge-ambiguous",
                    ])}
                  >
                    {i + 1}위
                  </div>
                  {emotionClass[item.name].kor}
                </div>
              ))}
          </div>
          <div className="flex flex-col gap-2 justify-between h-full">
            {dummy
              .sort((a, b) => b.count - a.count)
              .slice(3, 7)
              .map((item, i) => (
                <div className="flex items-center gap-2 font-semibold">
                  <div
                    className={cc([
                      "w-9 h-6 text-sm rounded-full flex items-center justify-center",
                      emotionClass[item.name].class === "positive" &&
                        "badge-positive",
                      emotionClass[item.name].class === "negative" &&
                        "badge-negative",
                      emotionClass[item.name].class === "neutral" &&
                        "badge-neutral",
                      emotionClass[item.name].class === "ambiguous" &&
                        "badge-ambiguous",
                    ])}
                  >
                    {i + 4}위
                  </div>
                  {emotionClass[item.name].kor}
                </div>
              ))}
          </div>
        </div>
      </div>

      <div className="w-full bg-black-200 h-px my-4" />
      <div className="grid grid-cols-2 place-items-center py-4">
        <div className="flex flex-col items-center">
          <div className="font-bold text-sm">나와 성향이 같은 친구들</div>
          <div className="grid grid-cols-2">
            {[...Array(2)].map((_, i) => (
              <div className="flex flex-col items-center px-2 py-2">
                <Avatar
                  width={"32px"}
                  avatar={{ skin: i, eyes: i + 1, hair: i + 6, glasses: 0 }}
                  emotion="positive"
                />
                <div className="text-sm font-semibold">
                  {["지헌", "김건"][i]}
                </div>
                <div className="badge badge-positive font-semibold text-sm py-0.5 px-2 mt-1">
                  파워긍정
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="font-bold text-sm">잘 맞는 성향의 친구들</div>
          <div className="grid grid-cols-2">
            {[...Array(2)].map((_, i) => (
              <div className="flex flex-col items-center px-2 py-2">
                <Avatar
                  width={"32px"}
                  avatar={{ skin: 1, eyes: 2, hair: 13 - i * 6, glasses: 0 }}
                  emotion="positive"
                />
                <div className="text-sm font-semibold">
                  {["현채", "준희"][i]}
                </div>
                <div className="badge badge-ambiguous whitespace-nowrap font-semibold text-sm py-0.5 px-2 mt-1">
                  투 머치 토커
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full bg-black-200 h-px my-4" />
      <div className="flex flex-col items-center">
        <div className="font-bold">
          나는 <span className="font-black">지수</span>
          {checkTextEndsWithCoda("지수") ? "과" : "와"} 대화할 때 가장
          긍정적이네요!
        </div>
        <div className="grid grid-cols-4 place-items-center px-8">
          <BadgeAndPercent emotion={"positive"} percent={66} />
          <div className="-scale-x-100">
            <Avatar width={"96px"} avatar={user.avatar} emotion="positive" />
          </div>
          <Avatar
            width={"96px"}
            avatar={{ skin: 1, eyes: 2, hair: 12, glasses: 0 }}
            emotion="positive"
          />
          <BadgeAndPercent emotion={"positive"} percent={59} />
        </div>
      </div>
    </div>
  );
};

export default Report;
