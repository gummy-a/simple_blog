"use client";

import { LoginForm, tokenKey } from "@/components/login_form";
import { Timeline } from "@/components/timeline";
import { useEffect, useState } from "react";

const checkToken = async () => {
  const token = localStorage.getItem(tokenKey);
  if (token === null) {
    return false;
  }

  try {
    const ret = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (ret.ok) {
      return true;
    } else {
      localStorage.removeItem(tokenKey);
    }
  } catch (e) {
    console.error(e);
  }
  return false;
};

export default function Home() {
  const [element, setElement] = useState(<></>);
  useEffect(() => {
    (async () => {
      if (await checkToken()) {
        setElement(<Timeline />);
      } else {
        setElement(<LoginForm />);
      }
    })();
  }, []);

  return <main>{element}</main>;
}
