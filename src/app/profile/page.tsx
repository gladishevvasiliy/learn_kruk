"use client";

import { UserStatistics } from "@/features/userStatistics";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export type StatisticsType = {
  testId: number;
  userId: number;
  name: string;
  correctAnswers: number;
  errorAnswers: number;
};
export default function Profile() {
  const params = useParams()

  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    const id = localStorage.getItem("userId");
    if (id) {
      setUserId(id);
    }
  }, []);
  console.log({ userId })
  return (
    <>
      <UserStatistics userId={userId} />
    </>
  );
}
