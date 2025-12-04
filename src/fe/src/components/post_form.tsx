import { Dispatch, JSX, SetStateAction, useState } from "react";
import { accountKey, tokenKey } from "./login_form";

const post = async (
  data: FormData,
  setMsg: Dispatch<SetStateAction<JSX.Element>>,
) => {
  const onError = () => {
    setMsg(<>post failed.</>);
    setTimeout(() => setMsg(<></>), 1000);
  };

  try {
    const token = localStorage.getItem(tokenKey);
    if (token === null) {
      return;
    }

    const body = data.get("body") as string;
    const tag = data.get("tag");
    const ret = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ body: body, tag: tag }),
    });
    if (ret.ok) {
      location.href = "/";
    } else {
      onError();
    }
  } catch (e) {
    console.error(e);
    onError();
  }
};

export const PostForm = () => {
  const [msg, setMsg] = useState(<></>);
  return (
    <div className="py-16">
      <form action={async (data) => await post(data, setMsg)}>
        <div className="">
          <input
            type="text"
            name="tag"
            className="shadow-sm border rounded block text-xs p-2"
            placeholder="tag"
          />
        </div>
        <div className="pt-2">
          <input
            type="text"
            name="body"
            className="shadow-sm border rounded-lg block w-full p-2"
            placeholder="how do you do?"
            required
          />
        </div>
        <div className="pt-4">
          <button
            type="submit"
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
          >
            post
          </button>
        </div>
        {msg}
      </form>
    </div>
  );
};
