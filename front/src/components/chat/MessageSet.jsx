import Message from "./Message";

const MessageSet = ({ chats, user_id }) => {
  const isMyself = chats[0].user_id === user_id;
  return (
    <div className="pt-16">
      {chats?.map((chat, idx) => (
        <Message key={idx} chat={chat} />
      ))}
    </div>
  );
};

export default MessageSet;
