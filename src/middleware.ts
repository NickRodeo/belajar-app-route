import { NextRequest, NextResponse } from "next/server";
import { adminPages, withAuth } from "./middlewares/withAuth";

function middleware(req: NextRequest) {
  return NextResponse.next();
}

export default withAuth(middleware, ["/dashboard", ...adminPages]);
