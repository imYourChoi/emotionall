import { useEmotion } from "@/contexts/emotionContext";
import { useUser } from "@/contexts/userContext";
import Avatar from "../avatar/Avatar";
import { badge } from "@/constants/badge";
import cc from "classcat";
import { EditIcon } from "../icons/Icons";

const MyProfile = () => {
  const { user } = useUser();
  const { mainEmotion: emotion } = useEmotion();
  return (
    <div className="w-full flex items-center px-8 pt-8 pb-4">
      <Avatar width="128px" avatar={user.avatar} emotion={emotion} />
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
        <div className="font-extrabold text-lg pb-2 flex items-center gap-2">
          {user.nickname || "test"} <EditIcon />
        </div>
        <div className="px-4 py-2 font-semibold rounded-2xl rounded-tl-none bg-black-100 flex items-center gap-2 text-sm">
          {user.message || (
            <span className="text-black-400">
              설정된 상태 메세지가 없습니다.
            </span>
          )}
          <EditIcon />
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
