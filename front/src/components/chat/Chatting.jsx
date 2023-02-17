import { useRef, useState, useEffect, useCallback } from "react";
import { io } from "socket.io-client";
import useTextAreaAutosize from "@/hooks/useTextareaAutosize";

const socket = io("http://localhost:80");

const Chatting = () => {
  const textAreaRef = useRef(null);

  const [chats, setChats] = useState([]);
  const [message, setMessage] = useState("");
  useTextAreaAutosize(textAreaRef.current, message);

  useEffect(() => {
    const handleReceiveMessage = (chat) => {
      setChats((prevChats) => [...prevChats, chat.data]);
    };

    socket.on("message", handleReceiveMessage);
    return () => {
      socket.off("message", handleReceiveMessage);
    };
  }, []);

  const handleSendMessage = useCallback(() => {
    if (!message) return alert("메시지를 입력해 주세요.");
    socket.emit("message", { data: message });
    setMessage("");
  });

  const handleChangeMessage = (evt) => {
    setMessage(evt.target?.value);
  };

  return (
    <div className="h-full flex flex-col overflow-scroll relative">
      <div className="mb-2">Chatting</div>
      <div>
        {chats?.map((chat, idx) => (
          <div key={idx}>Text : {chat} </div>
        ))}
      </div>
      <div className="fixed max-w-[430px] w-full mx-auto inset-x-0 bottom-0 bg-white z-10 px-4 py-[7px] flex gap-x-2.5 items-center">
        <textarea
          ref={textAreaRef}
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
    </div>
  );
};

export default Chatting;
