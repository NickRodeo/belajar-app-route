import { Product } from "@/type/product.type";

export const getProducts = async (url: string) => {
  const res = await fetch(url, {
    method: "GET",
    cache: "force-cache",
    next: {
      tags: ["products"],
    },
  });
  const data = await res.json();
  const products = data.products;
  return products;
};
