import Message from "./Message";

const MessageSet = ({ chats, user_id }) => {
  //   const isMyself = chats[0].user_id === user_id;
  const isMyself = Math.random() > 0.5;
  return (
    <div className="pt-16">
      {chats?.map((chat, idx) => (
        <Message
          key={idx}
          chat={chat}
          isMyself={isMyself}
          isLast={idx === chats.length - 1}
        />
      ))}
    </div>
  );
};

export default MessageSet;
