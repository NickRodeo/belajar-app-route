import { getProductById, getProducts } from "@/lib/firebase/service";
import { NextRequest, NextResponse } from "next/server";

// const products = [
//   { id: 1, title: "Baju", image: "/product.jpg", price: 100 },
//   { id: 2, title: "Celana", image: "/product.jpg", price: 500 },
//   { id: 3, title: "Makeup", image: "/product.jpg", price: 300 },
//   { id: 4, title: "Sepatu", image: "/product.jpg", price: 400 },
//   { id: 5, title: "Kaos Kaki", image: "/product.jpg", price: 100 },
// ];

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  if (id) {
    const product = await getProductById("products", id);
    if (product)
      return NextResponse.json(
        { products: product, message: "Product dapat" },
        { status: 200 }
      );
    return NextResponse.json({ message: "Product not found" }, { status: 404 });
  }
  const products = await getProducts("products");
  return NextResponse.json(
    { products, message: "Data berhasil diambil" },
    { status: 200 }
  );
}
