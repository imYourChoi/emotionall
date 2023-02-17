import { useEmotion } from "@/contexts/emotionContext";
import { useUser } from "@/contexts/userContext";
import Avatar from "../avatar/Avatar";

const MyProfile = () => {
  const { user } = useUser();
  const { mainEmotion: emotion } = useEmotion();
  return (
    <div className="w-full flex items-center px-8 pt-8 pb-4">
      <Avatar width="128px" avatar={user.avatar} emotion={emotion} />
      <div>
        <div className="text-positive font-semibold">파워긍정 수다쟁이</div>
        <div className="font-extrabold text-lg pb-2">
          {user.nickname || "test"}
        </div>
        <div className="px-4 py-2 font-semibold rounded-2xl rounded-tl-none bg-black-100">
          인생이란 멀까........
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
