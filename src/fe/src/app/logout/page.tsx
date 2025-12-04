"use client";

import { accountKey, tokenKey } from "@/components/login_form";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    localStorage.removeItem(tokenKey);
    localStorage.removeItem(accountKey);
    location.href = "/";
  }, []);
  return <></>;
}
