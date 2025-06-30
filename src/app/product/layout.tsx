"use client";

import { usePathname } from "next/navigation";

export default function Layout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <>
      <h1 className="text-center text-2xl font-bold py-5">Produk</h1>
      {children}
      {modal && <div key={pathname}>{modal}</div>}
    </>
  );
}
