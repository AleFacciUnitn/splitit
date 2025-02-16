import { NextRequest, NextResponse } from "next/server";
import { AuthServices } from "./app/Services/AuthServices";

const authServices: AuthServices = AuthServices.getInstance();

export function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;
  console.log(accessToken);
  console.log(refreshToken);
  if (!accessToken) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    authServices.verifyToken(accessToken);
    return NextResponse.next();
  } catch (error) {
    console.log(error);
    if (!refreshToken) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
      const decodeRefresh = authServices.verifyToken(refreshToken, "SECRET_KEY");
      const newAccessToken = authServices.generateToken(decodeRefresh.id, decodeRefresh.email, "1h");
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

