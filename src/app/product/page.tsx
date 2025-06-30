"use client";
import { getProducts } from "@/service/product";
import Card from "./card";
import { Metadata } from "next";
import useSWR from "swr";
import { useEffect } from "react";
import Loading from "./loading";

// export const metadata: Metadata = {
//   title: "Product",
//   description: "Product Page",
//   icons: "/product.jpg",
// };

type props = { params: { product: string[] } };
export default function Product() {
  // const res = await fetch("https://fakestoreapi.in/api/products", {
  //   method: "GET",
  //   cache: "force-cache",
  // });

  // const res = await fetch("http://localhost:3000/api/products", {
  //   method: "GET",
  //   cache: "force-cache",
  //   next: {
  //     // revalidate: 10,
  //     tags: ["products"],
  //   },
  // });
  // const data = await res.json();
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_URL}/api/products`,
    fetcher
  );
  // const products = await getProducts(
  //   `${process.env.NEXT_PUBLIC_URL}/api/products`
  // );
  const products = data?.products;

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="place-items-center grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 px-3 gap-2">
          {products.map((product: any) => (
            <Card key={product?.id} product={product} />
          ))}
        </div>
      )}
    </>
  );
}
