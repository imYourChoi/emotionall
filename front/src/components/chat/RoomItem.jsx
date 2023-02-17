import Avatar from "../avatar/Avatar";

const RoomItem = ({ room, onClick, emotion, userId, friend }) => {
  const getEmotion = () => {
    return "bg-positive-blend";
  };
  return (
    <div
      onClick={onClick}
      className="relative w-full h-[72px] px-6 py-1 flex gap-x-2.5"
    >
      <Avatar
        width="64px"
        avatar={{
          skin: friend?.avatar_skin_id,
          eyes: friend?.avatar_eyes_id,
          glasses: friend?.avatar_glasses_id,
          hair: friend?.avatar_hair_id,
        }}
        emotion="positive"
      />
      <div className="flex flex-col justify-center gap-y-1">
        <div className="flex items-center gap-x-1">
          <div className="text-sm font-bold">{friend?.name}</div>
          {emotion}
        </div>
        {/* <div className="text-base font-medium">{room.message}</div> */}
        <div className="text-base font-medium">채널톡 좋아요ㅋㅋㅋ</div>
      </div>
      <div
        className={"absolute right-0 inset-y-0 h-full w-3 " + getEmotion()}
      />
    </div>
  );
};

export default RoomItem;
