import { useRef, useState, useEffect, useCallback } from "react";
import useTextAreaAutosize from "@/hooks/useTextareaAutosize";
import MessageForm from "../chat/MessageForm";
import MessageBody from "../chat/MessageBody";

const Tutorial = () => {
  const textAreaRef = useRef(null);
  const messageBodyRef = useRef(null);

  const [chats, setChats] = useState([]);
  const [message, setMessage] = useState("");
  const [disabled, setDisabled] = useState(true);

  const [status, setStatus] = useState(0);

  const [nickname, setNickname] = useState("");
  const [avatar, setAvatar] = useState({
    skin: 0,
    eyes: 0,
    hair: 0,
    glasses: 0,
  });
  const [usermessage, setUsermessage] = useState("");

  useTextAreaAutosize(textAreaRef.current, message);

  useEffect(() => {
    scrollToBottom(false);
  }, [chats.length]);

  useEffect(() => {
    switch (status) {
      case 0:
        setTimeout(() => {
          setChats((chats) => [
            ...chats,
            { text: "안녕하세요.", member_id: "admin" },
          ]);
        }, 200);
        setTimeout(() => {
          setChats((chats) => [
            ...chats,
            { text: "당신의 이름을 알려주세요.", member_id: "admin" },
          ]);
          setDisabled(false);
        }, 500);
        break;
      case 1:
        setTimeout(() => {
          setChats((chats) => [
            ...chats,
            { text: "멋진 이름이네요.", member_id: "admin" },
          ]);
        }, 500);
        setTimeout(() => {
          setChats((chats) => [
            ...chats,
            { text: "지금 상태는 어떤가요?", member_id: "admin" },
          ]);
          setDisabled(false);
        }, 800);
        break;
      case 2:
        setTimeout(() => {
          setChats((chats) => [
            ...chats,
            { text: "그렇군요.", member_id: "admin" },
          ]);
        }, 500);
        setTimeout(() => {
          setChats((chats) => [
            ...chats,
            {
              text: "이제 당신의 아바타를 만들어 드릴게요.",
              member_id: "admin",
            },
          ]);
        }, 800);
        setTimeout(() => {
          setChats((chats) => [
            ...chats,
            {
              text: "아바타의 피부색을 골라주세요.",
              member_id: "admin",
            },
          ]);
        }, 1200);
        setTimeout(() => {
          setChats((chats) => [
            ...chats,
            {
              type: "nomessage",
              item: <div>여기에 암거나 너으면 댐</div>,
            },
          ]);
        }, 1300);
        break;
    }
  }, [status]);

  const handleSendMessage = useCallback(() => {
    const m = message;
    setChats((chats) => [...chats, { text: message, member_id: "me" }]);
    //메시지 전송
    switch (status) {
      case 0:
        // 이름 설정
        setNickname(m);
        break;
      case 1:
        // 상메 설정
        setUsermessage(m);
        break;
    }
    setMessage("");
    setStatus((s) => s + 1);
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
        className="h-full overflow-scroll relative px-6 py-2.5"
      >
        <div className="min-h-full flex flex-col justify-end pb-[60px]">
          <MessageBody chats={chats} />
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

export default Tutorial;
