import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;
  if (!accessToken) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    jwt.verify(accessToken, "SECRET_KEY");
    return NextResponse.next();
  } catch (error) {
    if (!refreshToken) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
      const decodeRefresh = jwt.verify(refreshToken, "SECRET_KEY");
      const newAccessToken = jwt.sign({id: decodeRefresh.id,email: decodeRefresh.email},"SECRET_KEY",{expiresIn: "1h"});
      const response = NextResponse.next();
      response.cookies.set("accessToken", newAccessToken, {
	httpOnly: true,
	sameSite: "strict",
	maxAge: 60 * 60
      });
      return response;
    } catch(e) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }
}

export const config = {
  matcher: ["/","/api/expense/","/api/expense/:path*"],
};

