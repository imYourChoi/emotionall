const MessageBody = ({ message }) => {
  console.log(message);
  return (
    <div className="w-full py-[4.5px]">
      <div className="w-fit px-[18px] py-2.5 rounded-2xl bg-neutral-blend text-base font-medium">
        {message}
      </div>
    </div>
  );
};

export default MessageBody;
