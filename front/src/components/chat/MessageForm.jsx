import { forwardRef, useRef } from "react";

const MessageForm = forwardRef(
  (
    { message, disabled, setDisabled, handleSendMessage, setMessage, locked },
    ref
  ) => {
    const enterPressed = useRef(false);
    const shiftPressed = useRef(false);
    const onKeyDown = (e) => {
      if (e.keyCode === 16) shiftPressed.current = true;
      if (e.keyCode === 13) enterPressed.current = true;
    };
    const onKeyUp = (e) => {
      if (e.keyCode === 16) shiftPressed.current = false;
      if (e.keyCode === 13) enterPressed.current = false;
    };
    const handleChangeMessage = (evt) => {
      if (enterPressed.current && !shiftPressed.current) {
        if (disabled) return;
        handleSendMessage();
        return;
      }
      setMessage(evt.target?.value);
      setDisabled(!evt.target?.value);
    };
    return (
      <div className="fixed max-w-[430px] w-full mx-auto inset-x-0 bottom-0 bg-white z-10 px-4 py-[7px] flex gap-x-2.5 items-center">
        {locked && (
          <div className="absolute inset-0 bg-black-900 bg-opacity-20"></div>
        )}
        <textarea
          ref={ref}
          value={message}
          onChange={handleChangeMessage}
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
          placeholder="메시지를 입력해 주세요."
          className="resize-none h-[46px] min-w-0 text-sm outline-none px-4 py-[14.5px] flex-1"
        ></textarea>
        <button
          disabled={disabled}
          className={
            "px-4 py-2 h-fit text-sm font-bold text-white rounded-full" +
            (disabled ? " bg-black-300" : " bg-positive")
          }
          onClick={disabled ? undefined : handleSendMessage}
        >
          전송
        </button>
      </div>
    );
  }
);

export default MessageForm;
