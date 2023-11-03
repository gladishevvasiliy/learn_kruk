"use client";

import { Title } from "@/widgets/Finish/style";
import { Red } from "@/widgets/Header/style";
import { Description } from "./style";
import { memo, useEffect } from "react";
import { useAppSelector } from "@/redux/hooks/hooks";
import { redirect } from "next/navigation";
import { useActions } from "@/redux/hooks/useActions";

export default memo(function Home() {
  const { setAuthenticated, setUser } = useActions();
  const { isAuthenticated, id, token } = useAppSelector((state) => state.user);


  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    if (token) {
      setAuthenticated(true);
      setUser({ token, userId });
    } else {
      setAuthenticated(false);
    }
  }, [setAuthenticated]);
  console.log(id);
  console.log(token);

  if (isAuthenticated === false) {
    redirect("/auth/login");
  }
  return (
    <>
      <Title>
        <Red>Д</Red>обро пожаловать!
      </Title>
      <Description>
        Это приложение созданно с целью помочь в изучении знаменной нотации,
        посредством тестирования.
      </Description>
    </>
  );
});