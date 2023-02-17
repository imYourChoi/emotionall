import Avatar from "../avatar/Avatar";
import { AddIcon } from "../icons/Icons";

const SearchItem = ({ friend, onClick = () => {} }) => {
  return (
    <div className="relative w-full h-[72px] pl-6 pr-4 py-1 flex items-center justify-between gap-x-2.5">
      <div className="flex items-center justify-between gap-x-2.5">
        <Avatar
          width="48px"
          avatar={{
            skin: friend?.avatar_skin_id,
            eyes: friend?.avatar_eyes_id,
            glasses: friend?.avatar_glasses_id,
            hair: friend?.avatar_hair_id,
          }}
          emotion="positive"
          style={{ flex: "0 0 48px" }}
        />
        <div className="text-base font-mediu flex-initial">{friend.name}</div>
      </div>
      <div onClick={onClick}>
        <AddIcon className="cursor-pointer" />
      </div>
    </div>
  );
};

export default SearchItem;
