import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "About Page",
  icons: "/product.jpg",
};

export default function About() {
  return (
    <>
      <h1>Ini About</h1>
    </>
  );
}
