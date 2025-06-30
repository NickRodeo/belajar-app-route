import { NextRequest, NextResponse } from "next/server";

const data = [
  {
    id: 1,
    nama: "Baju",
    harga: 100000,
    deskripsi: "Baju ini sangat nyaman dan nyaman digunakan",
  },
  {
    id: 2,
    nama: "Celana",
    harga: 50000,
    deskripsi: "Celana ini sangat nyaman dan nyaman digunakan",
  },
  {
    id: 3,
    nama: "Sepatu",
    harga: 200000,
    deskripsi: "Sepatu ini sangat nyaman dan nyaman digunakan",
  },
];

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (id) {
    const product = data.find((product) => product.id == Number(id));
    if (product)
      return NextResponse.json(
        { message: "Produk berhasil didapat!", data: product },
        { status: 200 }
      );
    return NextResponse.json(
      { message: "Produk tidak ditemukan" },
      { status: 404 }
    );
  }

  return NextResponse.json(
    { message: "Berhasil fetching seluruh data produk", data },
    { status: 200 }
  );
}
