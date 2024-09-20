import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const middleware = async (req, res) => {
  const pathname = req.nextUrl.pathname;

  if (pathname !== "/" && !pathname.startsWith("/app")) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  if (pathname === "/app") {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  const isPublicPath =
    pathname === "/app/login" ||
    pathname === "/app/register" ||
    pathname === "/";
  const token = cookies().get("token");
  if (!isPublicPath) {
    if (!token) {
      return NextResponse.redirect(new URL("/app/login", req.nextUrl));
    } else if (pathname === "/app/login") {
      return NextResponse.redirect(new URL("/app/projects", req.nextUrl));
    }
  } else {
    if (token) {
      return NextResponse.redirect(new URL("/app/projects", req.nextUrl));
    }
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
