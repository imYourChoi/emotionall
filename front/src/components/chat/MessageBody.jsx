import { sampleUserId } from "@/constants/etc";
import { useUser } from "@/contexts/userContext";
import { useMemo } from "react";
import Avatar from "../avatar/Avatar";
import Message from "./Message";

const MessageBody = ({ chats }) => {
  const { userId } = useUser();
  const isMyself = (chat) =>
    chat.member_id === userId || chat.member_id === sampleUserId;

  return (
    <div className="min-h-full flex flex-col justify-end">
      {chats.map((chat, i) => {
        return (
          <div>
            {(i == 0 || chats[i - 1].member_id != chat.member_id) &&
              chats[i]?.type !==
                "nomessage" /* || chats[i - 1].emotion != chat.emotion) */ &&
              chats[i - 1]?.type !== "nomessage" &&
              userId && (
                <div
                  className="flex"
                  style={{
                    justifyContent: isMyself(chat) ? "flex-end" : "flex-start",
                  }}
                >
                  <Avatar
                    width="64px"
                    avatar={{
                      skin: Math.floor(Math.random() * 4),
                      eyes: Math.floor(Math.random() * 5),
                      hair: Math.floor(Math.random() * 15),
                      glasses: Math.floor(Math.random() * 4),
                    }}
                    emotion="positive"
                    style={{
                      transform: isMyself(chat) ? "rotateY(180deg)" : undefined,
                    }}
                  />
                </div>
              )}
            {chat.type === "nomessage" ? (
              chat.item
            ) : (
              <Message
                key={i}
                chat={chat}
                isMyself={isMyself(chat)}
                isLast={
                  i === chats.length - 1 ||
                  chats[i + 1]?.member_id !== chat.member_id
                }
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MessageBody;
