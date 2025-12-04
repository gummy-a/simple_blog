type Props = {
  screen_name: string;
  unique_name: string;
  bio: string;
};

export const Account = ({ screen_name, unique_name, bio }: Props) => {
  return (
    <div className="px-2 py-16 flex flex-col">
      <div>{screen_name}</div>
      <div>{unique_name}</div>
      <br />
      <div>bio:</div>
      <div>{bio}</div>
    </div>
  );
};
