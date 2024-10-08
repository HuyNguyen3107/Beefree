import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { client } from "./utils/client";
import { ironOptions } from "./app/api/session/route";
import { setSession } from "./utils/session";

export const middleware = async (req, res) => {
  const pathname = req.nextUrl.pathname;
  const token = cookies().get("token");
  const session = cookies().get(ironOptions.cookieName);
  const next = NextResponse.next();

  if (token) {
    try {
      const { accessToken, refreshToken } = JSON.parse(token.value);
      client.setToken(accessToken);
      const { response, data } = await client.get("/user");

      if (!session) {
        if (response.status === 200) {
          const { sealed } = await setSession(data);
          next.cookies.set(ironOptions.cookieName, sealed, {
            maxAge: 60 * 60 * 192,
            path: "/",
            httpOnly: true,
          });
        }
      }

      if (response.status === 401) {
        const { response, data } = await client.post("/auth/refresh", {
          refreshToken,
        });
        if (response.status === 200) {
          next.cookies.set(
            "token",
            JSON.stringify({
              accessToken: data.accessToken,
              refreshToken: data.refreshToken,
            }),
            {
              maxAge: 60 * 60 * 192,
              path: "/",
              httpOnly: true,
            }
          );
        } else {
          throw new Error("Unauthorized");
        }
      }
    } catch (error) {
      return NextResponse.redirect(new URL("/", req.nextUrl));
    }
  }

  if (pathname !== "/" && !pathname.startsWith("/app")) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  if (pathname === "/app") {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  const isPublicPath =
    pathname === "/app/login" ||
    pathname === "/app/register" ||
    pathname === "/" ||
    pathname.includes("/app/reset-password");

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

  return next;
};

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
