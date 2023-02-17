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

export default function Chat() {
  return (
    <div>
      {mockFriends.map((friend) => (
        <RoomItem friend={friend} />
      ))}
    </div>
  );
}
