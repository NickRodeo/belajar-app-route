"use server";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const tags = req.nextUrl.searchParams.get("tags");
  const secret = req.nextUrl.searchParams.get("secret");
  if (!tags)
    return NextResponse.json({ message: "No tags provided" }, { status: 400 });
  if (secret !== "123")
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  revalidateTag(tags);
  return NextResponse.json({ message: "Tags revalidated" }, { status: 200 });
}
