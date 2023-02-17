import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import RoomItem from "@/components/chat/RoomItem";

const mockFriends = [
  {
    id: 1,
    name: "김철수",
    message: "안녕하세요",
  },
  {
    id: 2,
    name: "이영희",
    message: "반갑습니다",
  },
  {
    id: 3,
    name: "박영수",
    message: "호호",
  },
  {
    id: 4,
    name: "최영희",
    message: "헤헤",
  },
];

export const socket = io("http://localhost:80/chat");
export default function Chat() {
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    const roomListHandler = (rooms) => {
      setRooms(rooms);
    };
    socket.emit("room-list", roomListHandler);

    return () => {
      socket.off("room-list", roomListHandler);
    };
  }, []);
  return (
    <div>
      {mockFriends.map((friend) => (
        <RoomItem key={friend.id} friend={friend} />
      ))}
    </div>
  );
}
