import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Home",
  description: "Home Page",
  icons: "/product.jpg",
};

export default function Home() {
  return (
    <>
      <h1>Home</h1>
    </>
  );
}
