import { useRef, useState, useEffect, useCallback } from "react";

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
  const onCreateRoom = useCallback((nickname) => () => {
    socket.emit("create-room", ["me", nickname], (response) => {
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
    <div className="">
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
    </div>
  );
}
