import cc from "classcat";

const Message = ({ chat, isMyself, isLast }) => {
  const getRadius = () => {
    if (!isLast) return "16px";
    return "16px 16px " + (isMyself ? "0 16px" : "16px 0");
  };
  const getColor = () => {
    return "bg-neutral-blend";
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
