import { useRef, useState, useCallback } from "react";
import { io } from "socket.io-client";
import SearchItem from "./SearchItem";

// const socket = io("http://192.168.8.85:80/chat");
const socket = io("http://localhost:80");

const mockFriends = [
  { member_id: 1, name: "김철수" },
  { member_id: 2, name: "이영희" },
  { member_id: 3, name: "박영수" },
  { member_id: 4, name: "최영희" },
];

export default function Search() {
  const enterPressed = useRef(false);
  const [friends, setFriends] = useState([]);
  const [name, setName] = useState("");
  const [disabled, setDisabled] = useState(true);

  const handleChangeName = (evt) => {
    if (enterPressed.current) {
      if (disabled) return;
      handleSearchName();
      return;
    }
    setName(evt.target?.value);
    setDisabled(!evt.target?.value);
  };
  const handleSearchName = (evt) => {
    // api call to find freidns
  };
  const onCreateRoom = useCallback((friend) => () => {
    console.log(friend);
    socket.emit("create-room", [4008, friend.member_id], (response) => {
      console.log(response);
      // router.push(`/chat/${response.roomId}`);
    });
  });
  const onKeyDown = (e) => {
    if (e.keyCode === 13) enterPressed.current = true;
  };
  const onKeyUp = (e) => {
    if (e.keyCode === 13) enterPressed.current = false;
  };
  return (
    <>
      <div className="max-w-[430px] w-full mx-auto inset-x-0 bottom-0 bg-white z-10 px-4 py-[7px] flex gap-x-2.5 items-center">
        <textarea
          value={name}
          onKeyUp={onKeyUp}
          onKeyDown={onKeyDown}
          onChange={handleChangeName}
          placeholder="친구의 이름을 입력해 주세요."
          className="resize-none h-[46px] min-w-0 text-sm outline-none px-4 py-[14.5px] flex-1"
        ></textarea>
        <button
          disabled={disabled}
          className={
            "px-4 py-2 h-fit text-sm font-bold text-white rounded-full" +
            (disabled ? " bg-black-300" : " bg-positive")
          }
          onClick={disabled ? undefined : handleSearchName}
        >
          검색
        </button>
      </div>
      {mockFriends.map((friend) => (
        <SearchItem
          key={friend.member_id}
          friend={friend}
          onClick={onCreateRoom(friend)}
        />
      ))}
    </>
  );
}
