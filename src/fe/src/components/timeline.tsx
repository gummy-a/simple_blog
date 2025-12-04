import { Dispatch, JSX, SetStateAction, useEffect, useState } from "react";
import { accountKey, tokenKey } from "./login_form";
import Link from "next/link";
import { Account } from "./account";
import { PostForm } from "./post_form";

type Props = {
  id: string;
  body: string;
  tag?: string[];
  created_at: string;
};

const deletePost = (
  id: string,
  setElement: Dispatch<SetStateAction<JSX.Element>>,
) => {
  (async () => {
    try {
      const token = localStorage.getItem(tokenKey);
      if (token === null) {
        return false;
      }
      const ret = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/post/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );
      if (ret.ok) {
        location.href = "/";
      } else {
        setElement(
          <article className="flex flex-col p-2">error occured.</article>,
        );
      }
    } catch (e) {
      console.error(e);
    }
  })();
};

const Article = ({ id, body, created_at, tag }: Props) => {
  const tagElement = tag ? (
    <div className="text-xs flex justify-start">{tag?.join(", ")}</div>
  ) : (
    <></>
  );
  const [element, setElement] = useState(
    <>
      <article className="flex flex-col p-2">
        <div className="text-xs flex justify-end">{created_at}</div>
        {tagElement}
        <div>{body}</div>
        <div className="text-xs flex justify-end">
          <Link href="#" onClick={() => deletePost(id, setElement)}>
            [x]
          </Link>
        </div>
      </article>
    </>,
  );

  return <>{element}</>;
};

const getTimeline = async (
  setElement: Dispatch<SetStateAction<JSX.Element>>,
) => {
  const token = localStorage.getItem(tokenKey);
  if (token === null) {
    return false;
  }
  const account = localStorage.getItem(accountKey);
  if (account === null) {
    return false;
  }
  const account_id = JSON.parse(account).id;

  const getObject = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  const [tret, aret] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/timeline/`, getObject),
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/account/${account_id}`,
      getObject,
    ),
  ]);

  if (tret.ok && aret.ok) {
    const [tjson, ajson] = await Promise.all([tret.json(), aret.json()]);
    const articles = tjson.map((e: any) => (
      <>
        <hr className="border-t-1" />
        <Article {...e} />
      </>
    ));
    setElement(
      <>
        <Account {...ajson} />
        <PostForm />
        {...articles}
      </>,
    );
  } else {
    setElement(<>error</>);
  }
};

export const Timeline = () => {
  const [element, setElement] = useState(<></>);
  useEffect(() => {
    (async () => {
      await getTimeline(setElement);
    })();
  }, []);

  return <>{element}</>;
};
