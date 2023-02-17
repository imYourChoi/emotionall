import { useEffect, useState, useCallback } from "react";
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

const mockFriends = [
  {
    member_id: 1,
    name: "김철수",
    message: "안녕하세요",
  },
  {
    member_id: 2,
    name: "이영희",
    message: "반갑습니다",
  },
  {
    member_id: 3,
    name: "박영수",
    message: "호호",
  },
  {
    member_id: 4,
    name: "최영희",
    message: "헤헤",
  },
];

const getEmotion = () => {
  return [
    <PositiveFace />,
    <NegativeFace />,
    <NeutralFace />,
    <AmbiguousFace />,
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
      router.push(`/chat/${roomId}`);
    });
  };
  return (
    <div>
      {rooms?.map((room) => (
        <RoomItem
          key={room.id}
          room={room}
          onClick={onJoinRoom(room.id)}
          userId={userId}
        />
      ))}
      {/* {mockFriends.map((room) => (
        <RoomItem
          key={room.member_id}
          room={room}
          onClick={onJoinRoom(room.member_id)}
          emotion={getEmotion()}
        />
      ))} */}
    </div>
  );
}
