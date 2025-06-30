"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { ReactNode, useEffect } from "react";

export default function Layout({
  children,
  analytics,
}: {
  children: ReactNode;
  analytics: ReactNode;
}) {
  const { data: session, status }: any = useSession();
  const name = session?.user?.name || "Unknown User";
  return (
    <>
      <h1 className="text-center font-bold py-5 text-3xl">Welcome, {name}</h1>
      {children}
      {analytics}
    </>
  );
}
