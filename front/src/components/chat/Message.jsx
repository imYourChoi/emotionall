const Message = ({ chat }) => {
  return (
    <div className="w-full py-[4.5px]">
      <div className="w-fit px-[18px] py-2.5 rounded-2xl bg-neutral-blend text-base font-medium">
        {chat.text}
      </div>
    </div>
  );
};

export default Message;
