import { NextRequest, NextResponse } from "next/server";

const PASSWORD = "10101111";
const COOKIE_NAME = "site_unlocked";

export async function POST(req: NextRequest) {
  const { password } = await req.json();

  if (password === PASSWORD) {
    const res = NextResponse.json({ success: true });
    res.cookies.set(COOKIE_NAME, PASSWORD, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });
    return res;
  }

  return NextResponse.json({ error: "Wrong password" }, { status: 401 });
}
