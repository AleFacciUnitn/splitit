import { NextRequest, NextResponse } from "next/server";
import { signIn, signOut  } from "next-auth/react";
import { AuthServices } from "./app/Services/AuthServices";
import { auth } from "./auth";
//import { withAuth } from "next-auth";
//import NextAuth from "next-auth";

const authServices: AuthServices = AuthServices.getInstance();

//const { auth } = NextAuth(auth);
export default auth;

export const config = {
  matcher: ["/","/api/expense/","/api/expense/:path*"],
}
