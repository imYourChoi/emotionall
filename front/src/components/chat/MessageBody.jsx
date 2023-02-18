import { sampleUserId } from "@/constants/etc";
import { useUser } from "@/contexts/userContext";
import { useMemo } from "react";
import Avatar from "../avatar/Avatar";
import Message from "./Message";
import { emotionClassKorean } from "@/constants/emotion";

const MessageBody = ({ chats, friendAvatar }) => {
  const { user, userId } = useUser();
  const isMyself = (chat) =>
    chat.member_id == userId || chat.member_id == sampleUserId;

  const getChatEmotion = (chat) =>
    emotionClassKorean[
      chat.emotion.reduce((prev, current) =>
        prev.prob > current.prob ? prev : current
      ).value
    ];

  return (
    <div className="min-h-full flex flex-col justify-end">
      {chats.map((chat, i) => {
        return (
          <div key={i}>
            {((i == 0 || chats[i - 1].member_id != chat.member_id) &&
              chats[i]?.type !== "nomessage") ||
              (chats[i - 1].emotion != getChatEmotion(chat) &&
                chats[i - 1]?.type !== "nomessage" &&
                userId && (
                  <div
                    className="flex"
                    style={{
                      justifyContent: isMyself(chat)
                        ? "flex-end"
                        : "flex-start",
                    }}
                  >
                    <Avatar
                      width="64px"
                      avatar={isMyself(chat) ? user.avatar : friendAvatar}
                      emotion={getChatEmotion(chat)}
                      style={{
                        transform: isMyself(chat)
                          ? undefined
                          : "rotateY(180deg)",
                      }}
                    />
                  </div>
                ))}
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
