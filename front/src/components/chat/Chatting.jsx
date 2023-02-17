import { useRef, useState, useEffect, useCallback } from "react";
import { io } from "socket.io-client";
import useTextAreaAutosize from "@/hooks/useTextareaAutosize";
import MessageForm from "./MessageForm";

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
      <MessageForm
        ref={textAreaRef}
        message={message}
        handleChangeMessage={handleChangeMessage}
        handleSendMessage={handleSendMessage}
      />
    </div>
  );
};

export default Chatting;
