import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('access_token')?.value;
  const isAuthPage = request.nextUrl.pathname.startsWith('/auth');

  if (token && isAuthPage) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (!token && !isAuthPage) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
