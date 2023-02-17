const Avatar = ({ width, avatar, emotion, style }) => {
  return (
    <div className="w-12 aspect-square relative" style={{ width, ...style }}>
      <img
        className="absolute"
        src={`/assets/avatar/skin/${avatar.skin}.png`}
      />
      <img
        className="absolute"
        src={`/assets/avatar/hair/${avatar.hair}.png`}
      />
      <img
        className="absolute"
        src={`/assets/avatar/eyes/${avatar.eyes}.png`}
      />
      <img
        className="absolute"
        src={`/assets/avatar/glasses/${avatar.glasses}.png`}
      />
      <img className="absolute" src={`/assets/avatar/mouth/${emotion}.png`} />
    </div>
  );
};

export default Avatar;
