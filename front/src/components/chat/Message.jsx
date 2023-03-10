import cc from "classcat";
import { emotionClassKorean } from "@/constants/emotion";

const Message = ({ chat, isMyself, isLast }) => {
  const biggestEmotion = chat.emotion.reduce((prev, current) =>
    prev.prob > current.prob ? prev : current
  );
  const emotionCategory = emotionClassKorean[biggestEmotion.value];
  const getRadius = () => {
    if (!isLast) return "16px";
    return "16px 16px " + (isMyself ? "0 16px" : "16px 0");
  };
  const getColor = () => {
    switch (emotionCategory) {
      case "neutral":
        return "bg-neutral-blend";
      case "positive":
        return "bg-positive-blend";
      case "negative":
        return "bg-negative-blend";
      case "ambiguous":
        return "bg-ambiguous-blend";
    }
  };
  return (
    <div
      className={"w-full py-[4.5px] flex"}
      style={{ justifyContent: isMyself ? "flex-end" : "flex-start" }}
    >
      <div
        className={cc([
          "w-fit max-w-[calc(100%-80px)] px-[18px] py-2.5 text-base font-medium break-words animate-bubble",
          getColor(),
          isMyself ? "origin-bottom-right" : "origin-bottom-left",
        ])}
        style={{ borderRadius: getRadius() }}
      >
        {chat.text}
      </div>
    </div>
  );
};

export default Message;
