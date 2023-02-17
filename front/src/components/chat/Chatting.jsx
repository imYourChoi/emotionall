import { useRef, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import { io } from "socket.io-client";
import MessageForm from "./MessageForm";
import MessageBody from "./MessageBody";
import useTextAreaAutosize from "@/hooks/useTextareaAutosize";
import { useUser } from "@/contexts/userContext";
import axios from "axios";
import Avatar from "../avatar/Avatar";

const socket = io("http://192.168.8.85:80");
// const socket = io("http://localhost:80");

const Chatting = () => {
  const router = useRouter();
  const textAreaRef = useRef(null);
  const messageBodyRef = useRef(null);

  const [chats, setChats] = useState([]);
  const [message, setMessage] = useState("");
  const [disabled, setDisabled] = useState(!message);
  const { user, userId } = useUser();
  const room_id = router.query.id;
  useTextAreaAutosize(textAreaRef.current, message);

  const [friend, setFriend] = useState(null);

  const getFriendInfo = useCallback(async () => {
    if (!router.query.friendId) return;

    const result = await axios.get(
      `${process.env.NEXT_PUBLIC_API_HOST}/member/${router.query.friendId}`
    );

    if (result.status === 200) {
      console.log(result.data);
      setFriend(result.data);
    }
  }, [router.query.friendId]);

  useEffect(() => {
    getFriendInfo();
  }, [router.query.friendId]);

  useEffect(() => {
    const handleReceiveMessage = (chat) => {
      setChats((prevChats) => [...prevChats, chat]);
    };

    socket.on("message_", (chat) => {
      setChats((prevChats) => [...prevChats, chat.message]);
    });
    return () => {
      socket.off("message_", handleReceiveMessage);
      // socket.disconnect();
    };
  }, []);

  useEffect(() => {
    scrollToBottom(false);
  }, [chats.length]);

  const handleSendMessage = useCallback(() => {
    socket.emit(
      "message",
      {
        room_id: room_id,
        message: {
          member_id: userId,
          text: message,
          time: new Date().toISOString(),
        },
      },
      (res) => console.log(res)
    );
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
      <div className="absolute h-10 bg-white w-full flex flex-col items-center">
        <div className="flex justify-center gap-2">
          <Avatar
            width={"96px"}
            avatar={user.avatar}
            emotion="positive"
            style={{ transform: "scaleX(-1)" }}
          />
          <Avatar
            width={"96px"}
            avatar={{
              skin: friend?.avatar_skin_id,
              eyes: friend?.avatar_eyes_id,
              glasses: friend?.avatar_glasses_id,
              hair: friend?.avatar_hair_id,
            }}
            emotion="positive"
          />
        </div>
        <div className="badge badge-positive text-sm !text-black-900 px-4 py-[6px] rounded-full">
          두 사람은 지금 즐거워요!
        </div>
      </div>
      <div
        ref={messageBodyRef}
        className="h-full overflow-scroll relative px-6 py-2.5"
      >
        <MessageBody
          chats={chats}
          friendAvatar={{
            skin: friend?.avatar_skin_id,
            eyes: friend?.avatar_eyes_id,
            glasses: friend?.avatar_glasses_id,
            hair: friend?.avatar_hair_id,
          }}
        />
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
