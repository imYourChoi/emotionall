import { useCallback, useEffect, useState } from "react";
import { useUser } from "@/contexts/userContext";
import { io } from "socket.io-client";
import { useRouter } from "next/router";
import RoomItem from "@/components/chat/RoomItem";
import {
  PositiveFace,
  NegativeFace,
  NeutralFace,
  AmbiguousFace,
} from "@/components/icons/Emotions";
import axios from "axios";

const getEmotion = () => {
  return [
    <PositiveFace key={0} />,
    <NegativeFace key={1} />,
    <NeutralFace key={2} />,
    <AmbiguousFace key={3} />,
  ][Math.floor(Math.random() * 4)];
};

const socket = io("http://192.168.8.85:80");
// export const socket = io("http://localhost:80");

export default function Chat() {
  const router = useRouter();
  const { userId } = useUser();
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    const roomListHandler = (rooms) => {
      setRooms(rooms);
    };
    const createRoomHandler = (newRoom) => {
      console.log(newRoom);
      setRooms((prevRooms) => [...prevRooms, newRoom]);
    };
    socket.emit("room-list", userId, roomListHandler);
    socket.on("create-room", createRoomHandler);
    return () => {
      socket.off("room-list", roomListHandler);
      socket.off("create-room", createRoomHandler);
    };
  }, []);
  const onJoinRoom = (roomId) => () => {
    socket.emit("join-room", roomId, () => {
      router.push(`/chat/${roomId}?friendId=${roomId}`);
    });
  };

  const [friend, setFriend] = useState(null);

  const getFriendInfo = useCallback(async () => {
    const result = await axios.get(
      `${process.env.NEXT_PUBLIC_API_HOST}/member/4421`
    );

    if (result.status === 200) {
      console.log(result.data);
      setFriend(result.data);
    }
  }, []);

  useEffect(() => {
    getFriendInfo();
  }, []);

  return (
    <div>
      {/* {rooms?.map((room) => (
        <RoomItem
          key={room.id}
          room={room}
          onClick={onJoinRoom(room.id)}
          userId={userId}
        />
      ))} */}
      <RoomItem
        onClick={onJoinRoom(friend?.id)}
        emotion={getEmotion()}
        friend={friend}
      />
    </div>
  );
}
