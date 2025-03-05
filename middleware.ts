import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname;
  const role = req.cookies.get("role")?.value;

  if (req.nextUrl.pathname.startsWith("/admin") && role !== "admin") {
    return NextResponse.redirect(new URL("/", req.url)); // Chặn người không phải admin
  }


  // Define public paths that don't require authentication
  const publicPaths = ['/', '/login', '/register', '/api/auth', '/products'];
  const isPublicPath = publicPaths.some(publicPath => 
    path === publicPath || path.startsWith('/api/auth/') || path.startsWith('/products/')
  );

  // Check if the path is public
  if (isPublicPath) {
    return NextResponse.next();
  }

  // Get the token
  const session = await getToken({ 
    req: request, 
    secret: process.env.NEXTAUTH_SECRET 
  });

  // Redirect to login if no token is found and the path requires authentication
  if (!session) {
    // Store the original URL to redirect back after login
    const url = new URL('/login', request.url);
    url.searchParams.set('callbackUrl', encodeURI(request.url));
    return NextResponse.redirect(url);
  }

  // If user is authenticated, allow the request
  return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    // Match all routes except static files, api routes that don't require auth, etc.
    '/((?!_next/static|_next/image|favicon.ico|images|api/auth/login|api/auth/register|api/auth/session).*)',
    "/admin/:path*",
  ],
};