import { useRef, useState, useEffect, useCallback } from "react";
import { io } from "socket.io-client";
import useTextAreaAutosize from "@/hooks/useTextareaAutosize";
import MessageForm from "./MessageForm";
import MessageBody from "./MessageBody";

// const socket = io("http://192.168.8.85:80/chat");
const socket = io("http://localhost:80");

const Chatting = () => {
  const textAreaRef = useRef(null);
  const messageBodyRef = useRef(null);

  const [chats, setChats] = useState([]);
  const [message, setMessage] = useState("");
  const [disabled, setDisabled] = useState(!message);
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

  useEffect(() => {
    scrollToBottom(true);
  }, [chats.length]);

  const handleSendMessage = useCallback(() => {
    socket.emit("message", { data: message });
    setMessage("");
  });

  const scrollToBottom = (doAnimation = false) => {
    if (messageBodyRef.current) {
      const scrollTop = messageBodyRef.current.scrollHeight;
      if (doAnimation) {
        messageBodyRef.current.scroll({
          behavior: "smooth",
          top: scrollTop,
        });
      } else {
        messageBodyRef.current.scrollTop = scrollTop;
      }
    }
  };

  return (
    <>
      <div
        ref={messageBodyRef}
        className="h-full overflow-scroll relative px-6 "
      >
        <div className="min-h-full flex flex-col justify-end py-2.5">
          {chats?.map((chat, idx) => (
            <MessageBody key={idx} message={chat} />
          ))}
        </div>
      </div>
      <MessageForm
        ref={textAreaRef}
        message={message}
        disabled={disabled}
        setDisabled={setDisabled}
        setMessage={setMessage}
        handleSendMessage={handleSendMessage}
      />
    </>
  );
};

export default Chatting;
