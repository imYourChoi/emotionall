import { useRef, useState, useEffect, useCallback } from "react";
import useTextAreaAutosize from "@/hooks/useTextareaAutosize";
import MessageForm from "../chat/MessageForm";
import MessageBody from "../chat/MessageBody";
import cc from "classcat";
import Avatar from "../avatar/Avatar";
import { sampleUserId } from "@/constants/etc";

const Tutorial = () => {
  const textAreaRef = useRef(null);
  const messageBodyRef = useRef(null);

  const [chats, setChats] = useState([]);
  const [message, setMessage] = useState("");
  const [disabled, setDisabled] = useState(true);

  const [status, setStatus] = useState(0);

  const [nickname, setNickname] = useState("");
  const [avatar, setAvatar] = useState({
    skin: -1,
    eyes: -1,
    hair: -1,
    glasses: -1,
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
              item: (
                <div className="tutorial-buttons">
                  {[...Array(4)].map((_, i) => (
                    <button
                      className={cc([
                        "transition-all",
                        avatar.skin === -1 && "hover:bg-black-200",
                        avatar.skin === i && "bg-black-200",
                      ])}
                      onClick={() => {
                        if (avatar.skin === -1) {
                          setAvatar((avatar) => {
                            return { ...avatar, skin: i };
                          });
                        }
                      }}
                    >
                      <img
                        src={`/assets/avatar/skin/${i}.png`}
                        className="w-20 h-20"
                      />
                    </button>
                  ))}
                </div>
              ),
            },
          ]);
        }, 1300);
        break;
      case 3:
        setTimeout(() => {
          setChats((chats) => [
            ...chats,
            {
              text: "아바타의 헤어스타일을 골라주세요.",
              member_id: "admin",
            },
          ]);
        }, 500);
        setTimeout(() => {
          setChats((chats) => [
            ...chats,
            {
              type: "nomessage",
              item: (
                <div className="tutorial-buttons">
                  {[...Array(15)].map((_, i) => (
                    <button
                      className={cc([
                        "transition-all w-16 h-16 relative",
                        avatar.hair === -1 && "hover:bg-black-200",
                        avatar.hair === i && "bg-black-200",
                      ])}
                      onClick={() => {
                        if (avatar.hair === -1) {
                          setAvatar((avatar) => {
                            return { ...avatar, hair: i };
                          });
                        }
                      }}
                    >
                      <img
                        src={`/assets/avatar/skin/${avatar.skin}.png`}
                        className="absolute inset-0"
                      />
                      <img
                        src={`/assets/avatar/hair/${i}.png`}
                        className="absolute inset-0"
                      />
                    </button>
                  ))}
                </div>
              ),
            },
          ]);
        }, 600);
        break;
      case 4:
        setTimeout(() => {
          setChats((chats) => [
            ...chats,
            {
              text: "아바타의 눈을 골라주세요.",
              member_id: "admin",
            },
          ]);
        }, 500);
        setTimeout(() => {
          setChats((chats) => [
            ...chats,
            {
              type: "nomessage",
              item: (
                <div className="tutorial-buttons">
                  {[...Array(5)].map((_, i) => (
                    <button
                      className={cc([
                        "transition-all w-16 h-16 relative",
                        avatar.eyes === -1 && "hover:bg-black-200",
                        avatar.eyes === i && "bg-black-200",
                      ])}
                      onClick={() => {
                        if (avatar.eyes === -1) {
                          setAvatar((avatar) => {
                            return { ...avatar, eyes: i };
                          });
                        }
                      }}
                    >
                      <img
                        src={`/assets/avatar/skin/${avatar.skin}.png`}
                        className="absolute inset-0"
                      />
                      <img
                        src={`/assets/avatar/hair/${avatar.hair}.png`}
                        className="absolute inset-0"
                      />
                      <img
                        src={`/assets/avatar/eyes/${i}.png`}
                        className="absolute inset-0"
                      />
                    </button>
                  ))}
                </div>
              ),
            },
          ]);
        }, 600);
        break;
      case 5:
        setTimeout(() => {
          setChats((chats) => [
            ...chats,
            {
              text: "마지막으로, 아바타의 안경을 골라주세요.",
              member_id: "admin",
            },
          ]);
        }, 500);
        setTimeout(() => {
          setChats((chats) => [
            ...chats,
            {
              type: "nomessage",
              item: (
                <div className="tutorial-buttons">
                  {[...Array(4)].map((_, i) => (
                    <button
                      className={cc([
                        "transition-all w-16 h-16 relative",
                        avatar.glasses === -1 && "hover:bg-black-200",
                        avatar.glasses === i && "bg-black-200",
                      ])}
                      onClick={() => {
                        if (avatar.glasses === -1) {
                          setAvatar((avatar) => {
                            return { ...avatar, glasses: i };
                          });
                        }
                      }}
                    >
                      <img
                        src={`/assets/avatar/skin/${avatar.skin}.png`}
                        className="absolute inset-0"
                      />
                      <img
                        src={`/assets/avatar/hair/${avatar.hair}.png`}
                        className="absolute inset-0"
                      />
                      <img
                        src={`/assets/avatar/eyes/${avatar.eyes}.png`}
                        className="absolute inset-0"
                      />
                      <img
                        src={`/assets/avatar/glasses/${i}.png`}
                        className="absolute inset-0"
                      />
                    </button>
                  ))}
                </div>
              ),
            },
          ]);
        }, 600);
        break;
      case 6:
        setTimeout(() => {
          setChats((chats) => [
            ...chats,
            {
              text: "당신의 아바타가 완성되었어요!",
              member_id: "admin",
            },
          ]);
        }, 500);
        setTimeout(() => {
          setChats((chats) => [
            ...chats,
            {
              type: "nomessage",
              item: (
                <div className="animate-bubble origin-bottom-left">
                  <Avatar width={"60px"} avatar={avatar} emotion="positive" />
                </div>
              ),
            },
          ]);
        }, 600);
    }
  }, [status]);

  useEffect(() => {
    if (
      avatar.skin === -1 &&
      avatar.eyes === -1 &&
      avatar.hair === -1 &&
      avatar.glasses === -1
    )
      return;
    setStatus((s) => s + 1);
  }, [avatar]);

  const handleSendMessage = useCallback(() => {
    const m = message;
    setChats((chats) => [...chats, { text: message, member_id: sampleUserId }]);
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
