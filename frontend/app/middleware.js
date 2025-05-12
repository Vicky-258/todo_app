import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("accessToken");

  const isAuthPage =
    request.nextUrl.pathname.startsWith("/auth/login") ||
    request.nextUrl.pathname.startsWith("/auth/register");

  if (!token && !isAuthPage) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/",],
};
