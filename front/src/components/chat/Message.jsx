const Message = ({ chat, isMyself, isLast }) => {
  const getRadius = () => {
    if (!isLast) return " rounded-2xl";
    return (
      " rounded-t-2xl" + (isMyself ? " rounded-bl-2xl" : " rounded-br-2xl")
    );
  };
  const getColor = () => {
    return " bg-neutral-blend";
  };
  return (
    <div
      className={"w-full py-[4.5px] flex" + (isMyself ? " justify-end" : "")}
    >
      <div
        className={
          "w-fit px-[18px] py-2.5 text-base font-medium" +
          getColor() +
          getRadius()
        }
      >
        {chat.text}
      </div>
    </div>
  );
};

export default Message;
