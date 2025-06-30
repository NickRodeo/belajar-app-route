"use client";
import { useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [counter, setCounter] = useState(0);
  return (
    <div>
      <button
        className="cursor-pointer bg-slate-600 hover:bg-slate-800 transition-all duration-300 px-3 py-2 rounded-lg text-slate-100 my-5 mx-3"
        onClick={() => setCounter(counter + 1)}
      >
        Click This Button!
      </button>
      <h1 className="text-2xl font-bold text-slate-700"> Layout : {counter}</h1>
      {children}
    </div>
  );
}
