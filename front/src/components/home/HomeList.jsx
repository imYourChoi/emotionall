import Avatar from "../avatar/Avatar";
import { PositiveFace } from "../icons/Emotions";

const Item = () => {
  return (
    <div className="flex flex-col items-center relative">
      <div className="w-12 h-12 relative">
        <Avatar
          width="48px"
          avatar={{
            skin: Math.floor(Math.random() * 4),
            eyes: Math.floor(Math.random() * 5),
            hair: Math.floor(Math.random() * 15),
            glasses: Math.floor(Math.random() * 4),
          }}
          emotion="positive"
        />
      </div>
      <div className="font-medium text-sm">이름</div>
      <div className="absolute top-0 right-0">
        <PositiveFace />
      </div>
    </div>
  );
};

const HomeList = () => {
  return (
    <div className="w-full px-4">
      <div className="w-full overflow-x-auto py-2">
        <div className="w-max flex gap-4 px-2">
          {[...Array(12)].map((_, i) => (
            <Item />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeList;
