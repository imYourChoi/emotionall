import { useUser } from "@/contexts/userContext";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import Avatar from "../avatar/Avatar";
import {
  PositiveFace,
  NegativeFace,
  NeutralFace,
  AmbiguousFace,
} from "@/components/icons/Emotions";

const getEmotion = () => {
  return [
    <PositiveFace />,
    <NegativeFace />,
    <NeutralFace />,
    <AmbiguousFace />,
  ][Math.floor(Math.random() * 4)];
};

const Item = ({ item }) => {
  return (
    <div className="flex flex-col items-center relative">
      <div className="w-16 h-16 relative">
        <Avatar
          width="64px"
          avatar={{
            skin: item?.avatar_skin_id,
            eyes: item?.avatar_eyes_id,
            hair: item?.avatar_hair_id,
            glasses: item?.avatar_glasses_id,
          }}
          emotion="positive"
        />
      </div>
      <div className="font-medium text-sm">{item?.name}</div>
      <div className="absolute top-0 right-0">{getEmotion()}</div>
    </div>
  );
};

const HomeList = () => {
  const [friends, setFriends] = useState([]);

  const getFriends = useCallback(async () => {
    const result = await axios.get(
      `${process.env.NEXT_PUBLIC_API_HOST}/member/memberList`
    );

    if (result.status === 200) {
      console.log(result.data);
      setFriends(result.data);
    }
  }, []);

  useEffect(() => {
    getFriends();
  }, []);

  const { userId } = useUser();

  return (
    <div className="w-full px-4">
      <div className="w-full overflow-x-auto py-2">
        <div className="w-max flex gap-2 px-2">
          {friends
            .filter((item) => item.id != userId)
            .map((item, i) => (
              <Item key={i} item={item} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default HomeList;
