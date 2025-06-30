"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const { push } = useRouter();

  useEffect(() => {
    console.log(session);
    console.log("status : " + status);
  }, [status, session]);
  return (
    <div className="px-5 py-1 items-center flex justify-between bg-slate-900 text-slate-200">
      <h1 className="font-bold text-xl px-3 py-3">Navbar</h1>
      <ul className="px-3 flex items-center justify-center gap-5 [&>li]:hover:text-slate-400 [&>li]:active:text-slate-600 [&>li]:duration-300 [&>li]:transition-all [&>li]:cursor-pointer">
        <li>
          <Link
            key="home"
            className={`${pathname === "/" ? "text-slate-400" : ""}`}
            href="/"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            key="product"
            className={`${pathname === "/product" ? "text-slate-400" : ""}`}
            href="/product"
          >
            Product
          </Link>
        </li>
        <li>
          <Link
            key="about"
            className={`${pathname === "/about" ? "text-slate-400" : ""}`}
            href="/about"
          >
            About
          </Link>
        </li>
        <li>
          <Link
            key="about-us"
            className={`${pathname === "/about/us" ? "text-slate-400" : ""}`}
            href="/about/us"
          >
            Us
          </Link>
        </li>
        {status === "authenticated" ? (
          <button
            onClick={() => {
              signOut();
            }}
            className="bg-slate-200 font-medium hover:bg-slate-400 transition-all duration-300 cursor-pointer text-slate-700 rounded-lg py-1 px-3"
          >
            Sign Out
          </button>
        ) : (
          <button
            onClick={() => {
              signIn();
            }}
            className="bg-slate-200 font-medium hover:bg-slate-400 transition-all duration-300 cursor-pointer text-slate-700 rounded-lg py-1 px-3"
          >
            Sign In
          </button>
        )}
      </ul>
      {session?.user?.name && (
        <h1 className="fixed text-2xl font-bold right-10 bottom-10 text-slate-700">
          Welcome, {session.user.name}
        </h1>
      )}
    </div>
  );
}
