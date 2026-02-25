import { NextRequest, NextResponse } from "next/server";

const PASSWORD = "10101111";
const COOKIE_NAME = "site_unlocked";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow the unlock page and its API through
  if (pathname.startsWith("/unlock") || pathname.startsWith("/api/unlock")) {
    return NextResponse.next();
  }

  const cookie = req.cookies.get(COOKIE_NAME);
  if (cookie?.value === PASSWORD) {
    return NextResponse.next();
  }

  const url = req.nextUrl.clone();
  url.pathname = "/unlock";
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
