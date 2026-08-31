import { NextResponse, type NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

/**
 * Sends anonymous visitors from the OAuth consent screen to sign-in with a real
 * 307, before any HTML streams.
 *
 * The page checks the session again on its own -- this is not the security
 * boundary. It exists because the root `loading.tsx` puts /oauth/authorize
 * behind a Suspense boundary, which turns a server-component `redirect()` into
 * a streamed client-side one. Browsers follow that fine; an OAuth client that
 * inspects the response status does not.
 */
export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  if (token) return NextResponse.next();

  const signIn = new URL("/auth/signin", request.url);
  // Preserve the whole authorization request so consent resumes after login.
  signIn.searchParams.set("callbackUrl", `${request.nextUrl.pathname}${request.nextUrl.search}`);
  return NextResponse.redirect(signIn, { status: 307 });
}

export const config = {
  matcher: ["/oauth/authorize"],
};
