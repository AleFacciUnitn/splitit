import { auth } from "@/auth";

export default auth;

export const config = {
  matcher: ["/dashboard/:path*","/api/expense/","/api/expense/:path*"],
}
