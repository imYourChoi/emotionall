import { forwardRef } from "react";

const MessageForm = forwardRef(
  ({ message, handleChangeMessage, handleSendMessage }, ref) => {
    return (
      <div className="fixed max-w-[430px] w-full mx-auto inset-x-0 bottom-0 bg-white z-10 px-4 py-[7px] flex gap-x-2.5 items-center">
        <textarea
          ref={ref}
          onChange={handleChangeMessage}
          value={message}
          className="resize-none h-[46px] min-w-0 text-sm outline-none px-4 py-[14.5px] flex-1 shadow-[0_0_1px_black]"
        ></textarea>
        <button
          className="px-4 py-2 h-fit text-sm font-bold text-white bg-positive rounded-full"
          onClick={handleSendMessage}
        >
          전송
        </button>
      </div>
    );
  }
);

export default MessageForm;
