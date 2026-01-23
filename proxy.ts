import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { NextRequest, NextResponse } from "next/server";

export default NextAuth(authConfig).auth;

// export function proxy(request: NextRequest) {
//     return NextResponse.redirect(new URL('dashboard/', request.url))
// }

export const config= {
    // https://nextjs.org/docs/app/api-reference/file-conventions/proxy#matcher
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)']
};