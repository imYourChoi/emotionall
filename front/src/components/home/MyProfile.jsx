import { useEmotion } from "@/contexts/emotionContext";
import { useUser } from "@/contexts/userContext";
import Avatar from "../avatar/Avatar";
import { badge } from "@/constants/badge";
import cc from "classcat";
import { CheckIcon, EditIcon } from "../icons/Icons";
import { useState } from "react";

const MyProfile = () => {
  const { user } = useUser();
  const { mainEmotion: emotion } = useEmotion();
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingMessage, setIsEditingMessage] = useState(false);

  return (
    <div className="w-full flex items-center px-8 pt-8 pb-4">
      <div className="flex-shrink-0">
        <Avatar width="128px" avatar={user.avatar} emotion={emotion} />
      </div>
      <div>
        <div
          className={cc([
            "font-semibold",
            badge[user.badge].color === "positive" && "text-positive",
            badge[user.badge].color === "negative" && "text-negative",
            badge[user.badge].color === "neutral" && "text-neutral",
            badge[user.badge].color === "ambiguous" && "text-ambiguous",
          ])}
        >
          {badge[user.badge].name}
        </div>
        <div className="w-full font-extrabold text-lg pb-2 flex items-center gap-2">
          {isEditingName ? (
            <input
              className="w-min max-w-[180px] h-8"
              placeholder={user.nickname}
              defaultValue={user.nickname}
              autoFocus
              onBlur={() => setIsEditingName(false)}
              maxLength={8}
            />
          ) : (
            <div className="h-8 flex items-center">{user.nickname}</div>
          )}
          <button onClick={() => setIsEditingName((s) => !s)}>
            {isEditingName ? <CheckIcon /> : <EditIcon />}
          </button>
        </div>
        <div className="w-fit px-4 py-2 font-semibold rounded-2xl rounded-tl-none bg-black-100 flex items-center gap-2 text-sm">
          {isEditingMessage ? (
            <input
              className="w-min max-w-[150px] h-6 bg-transparent"
              placeholder={user.message}
              defaultValue={user.message}
              autoFocus
              onBlur={() => setIsEditingMessage(false)}
              maxLength={20}
            />
          ) : (
            <div className="h-6 flex items-center">
              {user.message || (
                <span className="text-black-400">
                  설정된 상태 메세지가 없습니다.
                </span>
              )}
            </div>
          )}

          <button onClick={() => setIsEditingMessage((s) => !s)}>
            {isEditingMessage ? <CheckIcon /> : <EditIcon />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
