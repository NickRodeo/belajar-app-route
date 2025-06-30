"use client";
import { useState } from "react";

export default function Dashboard() {
  const [message, setMessage] = useState("");
  async function handleRevalidate() {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/revalidate?tags=products&secret=123`,
      {
        method: "POST",
      }
    );
    const response = await res.json();
    setMessage(response.message);
  }
  return (
    <>
      {" "}
      <div className="flex justify-center flex-col mx-auto w-[10%] gap-3">
        <button
          className="cursor-pointer bg-slate-900 rounded-xl py-2 px-3 text-slate-100 font-medium"
          onClick={handleRevalidate}
        >
          Revalidate
        </button>
        <h1 className=" font-bold text-slate-700 text-center">{message}</h1>
      </div>
    </>
  );
}
