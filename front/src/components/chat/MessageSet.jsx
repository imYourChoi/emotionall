import Message from "./Message";
import Avatar from "../avatar/Avatar";

const MessageSet = ({ chats, member_id }) => {
  //   const isMyself = chats[0].member_id === member_id;
  const isMyself = Math.random() > 0.5;
  return (
    <div>
      <div
        className="flex"
        style={{ justifyContent: isMyself ? "flex-end" : "flex-start" }}
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
          style={{ transform: !isMyself ? "rotateY(180deg)" : undefined }}
        />
      </div>
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
