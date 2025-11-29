import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("accessToken")?.value;
  const { pathname } = request.nextUrl;

  const isAuthPage =
    pathname.startsWith("/auth/login") || pathname.startsWith("/auth/register");

  const isLandingPage = pathname === "/";

  // Redirect authenticated users to dashboard
  if (token && (isAuthPage || isLandingPage)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  const isPublic = [
    "/_next",
    "/favicon.ico",
    "/auth/login",
    "/auth/register",
    "/api/auth",
    "/" // Landing page is public
  ].some((path) => pathname.startsWith(path) || pathname === "/");

  if (isPublic) {
    return NextResponse.next();
  }

  if (!token) {
    if (pathname.startsWith("/api")) {
      return new NextResponse(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("redirectedFrom", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|auth|api/auth).*)", "/api/:path*"],
};
