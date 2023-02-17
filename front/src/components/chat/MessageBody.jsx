import { useMemo } from "react";
import Message from "./Message";
import MessageSet from "./MessageSet";

const MessageBody = ({ chats }) => {
  const member_id = "my_id";
  const memoizedChats = useMemo(() => {
    const bundledChats = [];
    let chatCache = null;
    chats.forEach((chat, idx) => {
      if (
        chatCache &&
        // chatCache[0].member_id !== chat.member_id
        idx % 4 === 0
      ) {
        bundledChats.push(
          <MessageSet
            key={idx + new Date().toISOString().slice(11, 19)}
            chats={chatCache}
            member_id={member_id}
          />
        );
        chatCache = null;
      }
      if (!chatCache) chatCache = [];
      chatCache.push(chat);
    });
    if (chatCache) {
      bundledChats.push(
        <MessageSet
          key={new Date().toISOString().slice(11, 19)}
          chats={chatCache}
          member_id={member_id}
        />
      );
    }
    return bundledChats;
  }, [chats]);
  return (
    <div className="min-h-full flex flex-col justify-end">{memoizedChats}</div>
  );
};

export default MessageBody;
