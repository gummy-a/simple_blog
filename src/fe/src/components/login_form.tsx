import { Dispatch, JSX, SetStateAction, useState } from "react";

export const tokenKey = "loginToken";
export const accountKey = "account";

const login = async (
  data: FormData,
  setMsg: Dispatch<SetStateAction<JSX.Element>>,
) => {
  const onError = () => {
    setMsg(<>login failed.</>);
    setTimeout(() => setMsg(<></>), 1000);
  };

  try {
    const email = data.get("email") as string;
    const password = data.get("password") as string;

    const ret = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    });
    if (ret.ok) {
      const json = await ret.json();
      localStorage.setItem(tokenKey, json.token);
      localStorage.setItem(accountKey, JSON.stringify(json.account));
      location.href = "/";
    } else {
      onError();
    }
  } catch (e) {
    console.error(e);
    onError();
  }
};

export const LoginForm = () => {
  const [msg, setMsg] = useState(<></>);
  return (
    <div className="border border-[1] rounded p-4 m-4">
      <span className="font-medium">login</span>
      <hr className="mt-4 mb-4" />
      <form action={async (data) => await login(data, setMsg)}>
        <div className="">
          <label htmlFor="email" className="block mb-2 text-sm">
            email
          </label>
          <input
            type="email"
            name="email"
            className="shadow-sm border text-sm rounded-lg block w-full p-2"
            placeholder="name@mail.com"
            required
          />
        </div>

        <div className="pt-2">
          <label htmlFor="password" className="block mb-2 text-sm">
            password
          </label>
          <input
            type="password"
            name="password"
            className="shadow-sm border text-sm rounded-lg block w-full p-2"
            placeholder="at least 8 characters"
            required
          />
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
          >
            submit
          </button>
        </div>
        {msg}
      </form>
    </div>
  );
};
