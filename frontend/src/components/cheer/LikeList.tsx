interface Props {
  username: string;
  content: string;
  nickname: string;
}

function LikeList({ username, content, nickname }: Props): JSX.Element {
  return (
    <div>
      <div>To.{username}...</div>
      {/* 일정 편지내용 이상이면 ...으로 되게끔 */}
      <div>{content}</div>
      <div>From.{nickname}</div>
    </div>
  );
}

export default LikeList;
