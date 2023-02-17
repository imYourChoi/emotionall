const Message = ({ chat, isMyself, isLast }) => {
  const getRadius = () => {
    if (!isLast) return "16px";
    return "16px 16px " + (isMyself ? "0 16px" : "16px 0");
  };
  const getColor = () => {
    return " bg-neutral-blend";
  };
  return (
    <div
      className={"w-full py-[4.5px] flex"}
      style={{ justifyContent: isMyself ? "flex-end" : "flex-start" }}
    >
      <div
        className={"w-fit px-[18px] py-2.5 text-base font-medium" + getColor()}
        style={{ borderRadius: getRadius() }}
      >
        {chat.text}
      </div>
    </div>
  );
};

export default Message;
