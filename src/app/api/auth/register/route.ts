import { checkRegister } from "@/lib/firebase/service";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const request = await req.json();
  const { status, message } = await checkRegister(request);
  if (status) {
    return NextResponse.json({ status, message }, { status: 200 });
  } else {
    return NextResponse.json({ status, message }, { status: 400 });
  }
}
