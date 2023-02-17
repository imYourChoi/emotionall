const RoomItem = ({ friend, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="relative w-full h-[72px] px-6 py-1 flex gap-x-2.5"
    >
      <img className="w-16 h-16 bg-black-200 rounded-full" alt="profile-img" />
      <div className="flex flex-col justify-center gap-y-1">
        <div className="text-sm font-bold">{friend.name}</div>
        <div className="text-base font-medium">{friend.message}</div>
      </div>
      <div className="absolute right-0 inset-y-0 bg-positive-blend h-full w-3" />
    </div>
  );
};

export default RoomItem;
