"use client";
import { getProducts } from "@/service/product";
import { Product } from "@/type/product.type";
import Image from "next/image";
import { use } from "react";
import useSWR from "swr";

export default function DetailProduct({ params }: { params: any }) {
  const { id }: { id: any } = use(params);
  // const product = (await getProducts(
  //   `${process.env.NEXT_PUBLIC_URL}/api/products?id=${id}`
  // )) as Product;

  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_URL}/api/products?id=${id}`,
    fetcher
  );

  const product = data?.products;

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-8 lg:p-10" key={id}>
      {!isLoading && (
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden dark:bg-gray-800">
          <Image
            width={100}
            height={100}
            src="/product.jpg"
            alt={product.title}
            className="w-full h-[400px] object-cover"
          />

          <div className="p-6 space-y-4">
            <div className="flex items-start justify-between">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {product.title}
              </h1>
              <span className="text-2xl font-semibold text-green-600 dark:text-green-400">
                ${product.price}
              </span>
            </div>

            <div className="mt-6">
              <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium transition">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
