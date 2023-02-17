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
      setChats((prevChats) => [...prevChats, chat]);
    };

    socket.on("message", handleReceiveMessage);
    return () => {
      socket.off("message", handleReceiveMessage);
    };
  }, []);

  useEffect(() => {
    scrollToBottom(false);
  }, [chats.length]);

  const handleSendMessage = useCallback(() => {
    socket.emit("message", {
      user_id: "my_id",
      text: message,
      time: new Date().toISOString(),
    });
    setMessage("");
    setDisabled(true);
  });

  const scrollToBottom = (doAnimation = false) => {
    if (!messageBodyRef.current) return;

    const scrollTop = messageBodyRef.current.scrollHeight;
    if (doAnimation) {
      messageBodyRef.current.scroll({
        behavior: "smooth",
        top: scrollTop,
      });
    } else {
      messageBodyRef.current.scrollTop = scrollTop;
    }
  };

  return (
    <>
      <div
        ref={messageBodyRef}
        className="h-full overflow-scroll relative px-6 "
      >
        <MessageBody chats={chats} />
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
