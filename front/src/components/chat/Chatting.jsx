import { useRef, useState, useEffect } from "react";
import { io } from "socket.io-client";
import useTextAreaAutosize from "@/hooks/useTextareaAutosize";

const Chatting = () => {
  const socket = useRef(null);
  const textAreaRef = useRef(null);

  const [chats, setChats] = useState([]);
  const [message, setMessage] = useState("");
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
  useTextAreaAutosize(textAreaRef.current, message);
  return (
    <div className="max-w-[430px] w-full mx-auto h-screen flex flex-col overflow-scroll">
      <div className="mb-2">Chatting</div>
      <div>
        {chats?.map((chat, idx) => (
          <div key={idx}>Text : {chat} </div>
        ))}
      </div>
      <textarea
        ref={textAreaRef}
        onChange={handleChangeMessage}
        value={message}
        className="resize-none border-2 h-6 outline-none"
      ></textarea>
      <button className="" onClick={handleSendMessage}>
        전송
      </button>
    </div>
  );
};

export default Chatting;
