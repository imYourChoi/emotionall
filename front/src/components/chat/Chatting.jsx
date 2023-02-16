import { useRef, useState, useEffect } from "react";
import { io } from "socket.io-client";
import useTextAreaAutosize from "@/hooks/useTextareaAutosize";

const Chatting = () => {
  const socket = useRef(null);
  const textAreaRef = useRef(null);

  const [chats, setChats] = useState([]);
  const [message, setMessage] = useState("");
  useTextAreaAutosize(textAreaRef.current, message);

  useEffect(() => {
    socket.current = io("http://localhost:80", {});
    socket.current.on("message", (res) => {
      console.log(res);
      setChats((chats) => [...chats, res.data]);
    });
    return () => {
      if (socket.current) socket.current.disconnect();
    };
  }, []);

  const handleSendMessage = () => {
    socket.current.emit("message", { data: message });
    setMessage("");
  };
  const handleChangeMessage = (evt) => {
    setMessage(evt.target?.value);
  };

  return (
    <div className="max-w-[430px] w-full mx-auto h-screen flex flex-col overflow-scroll relative border-2">
      <div className="mb-2">Chatting</div>
      <div>
        {chats?.map((chat, idx) => (
          <div key={idx}>Text : {chat} </div>
        ))}
      </div>
      <div className="absolute inset-x-0 bottom-0 px-4 py-[7px] flex gap-x-2.5 items-center">
        <textarea
          ref={textAreaRef}
          onChange={handleChangeMessage}
          value={message}
          className="resize-none border-2 h-[53px] outline-none px-4 py-[14.5px] flex-1"
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
