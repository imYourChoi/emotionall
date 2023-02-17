import { useRef, useEffect, useState, useCallback } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { useRouter } from "next/router";
import SearchItem from "./SearchItem";
import { useUser } from "@/contexts/userContext";
import { PositiveFace } from "../icons/Emotions";

const socket = io("http://192.168.8.85:80");

export default function Search() {
  const enterPressed = useRef(false);
  const router = useRouter();
  const [allFriends, setAllFriends] = useState([]);
  const [friends, setFriends] = useState([]);
  const [name, setName] = useState("");
  const [disabled, setDisabled] = useState(true);
  const { userId } = useUser();
  const [loading, setLoading] = useState(false);

  const handleChangeName = (evt) => {
    if (enterPressed.current) {
      if (disabled) return;
      handleSearchName();
      return;
    }
    setName(evt.target?.value);
    setDisabled(!evt.target?.value);
  };
  const handleSearchName = async (evt) => {
    setLoading(true);
    if (allFriends.length) {
      setFriends(allFriends.filter((friend) => friend.name.includes(name)));
      return;
    }
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_HOST}/member/memberList`
      );
      if (response.status === 200) {
        setAllFriends(response.data);
        setFriends(
          response.data.filter((friend) => friend.name.includes(name))
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const onCreateRoom = useCallback((friend) => () => {
    socket.emit(
      "create-room",
      { me: parseInt(userId), other: friend.id },
      (response) => {
        // socket.emit("join-room", response.room_id, () => {
        router.push(`/chat/${response.room_id}?friendId=${friend.id}`);
        // });
      }
    );
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
      {loading ? (
        <div className="w-full h-full flex items-center justify-center">
          <div className="animate-pulse">
            <PositiveFace width={"48px"} />
          </div>
        </div>
      ) : (
        friends?.map((friend) => (
          <SearchItem
            key={friend.id}
            friend={friend}
            onClick={onCreateRoom(friend)}
          />
        ))
      )}
    </>
  );
}
