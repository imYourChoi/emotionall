import { useEffect, useState, useCallback } from "react";
import { io } from "socket.io-client";
import { useRouter } from "next/router";
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

// const socket = io("http://192.168.8.85:80/chat");
export const socket = io("http://localhost:80");

export default function Chat() {
  const router = useRouter();
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    const roomListHandler = (rooms) => setRooms(rooms);
    const createRoomHandler = (newRoom) => {
      setRooms((prevRooms) => [...prevRooms, newRoom]);
    };

    socket.emit("room-list", roomListHandler);
    socket.on("create-room", createRoomHandler);
    return () => {
      socket.off("room-list", roomListHandler);
      socket.off("create-room", createRoomHandler);
    };
  }, []);
  const onCreateRoom = useCallback((nickname) => () => {
    socket.emit("create-room", ["me", nickname], (response) => {
      // router.push(`/chat/${response.roomId}`);
    });
  });
  const onJoinRoom = useCallback((roomId) => () => {
    router.push(`/chat/${roomId}`); // 임시로 만들어둠
    socket.emit("join-room", () => {
      router.push(`/chat/${roomId}`);
    });
  });
  return (
    <div>
      {mockFriends.map((friend) => (
        <RoomItem
          key={friend.id}
          friend={friend}
          onClick={onJoinRoom(friend.id)}
        />
      ))}
      <div onClick={onCreateRoom("Anybody")}>let's create room</div>
    </div>
  );
}
