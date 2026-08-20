export { default } from "next-auth/middleware";

export const config = {
  // This array dictates which routes require the user to be logged in.
  // It protects /dashboard and everything inside it (like /dashboard/1)
  matcher: ["/dashboard/:path*"],
};