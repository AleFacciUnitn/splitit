import { auth } from "@/auth";

export default auth;

export const config = {
  matcher: ["/","/api/expense/","/api/expense/:path*"],
}
