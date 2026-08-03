import { NextRequest, NextResponse } from 'next/server';
import { jwtDecode } from 'jwt-decode';

import { AUTH_COOKIE_OPTIONS } from '@/shared/api/auth/cookie-options';
import { refreshTokens } from '@/shared/api/auth/refresh-tokens';

const REFRESH_MARGIN_SECONDS = 30;

function isExpiringSoon(accessToken: string): boolean {
  try {
    const { exp } = jwtDecode<{ exp: number }>(accessToken);
    return exp * 1000 <= Date.now() + REFRESH_MARGIN_SECONDS * 1000;
  } catch {
    return true;
  }
}

function redirectToLogin(request: NextRequest) {
  const response = NextResponse.redirect(new URL('/auth/login', request.url));
  response.cookies.delete('access_token');
  response.cookies.delete('refresh_token');
  return response;
}

export async function proxy(request: NextRequest) {
  const accessToken = request.cookies.get('access_token')?.value;
  const refreshToken = request.cookies.get('refresh_token')?.value;
  const isAuthPage = request.nextUrl.pathname.startsWith('/auth');

  if (accessToken && isAuthPage) {
    return NextResponse.redirect(new URL('/users', request.url));
  }

  if (!accessToken && !isAuthPage) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  if (!isAuthPage && accessToken && isExpiringSoon(accessToken)) {
    if (!refreshToken) {
      return redirectToLogin(request);
    }

    const refreshed = await refreshTokens(refreshToken);

    if (!refreshed) {
      return redirectToLogin(request);
    }

    request.cookies.set('access_token', refreshed.access_token);
    request.cookies.set('refresh_token', refreshed.refresh_token);

    const response = NextResponse.next({
      request: { headers: new Headers(request.headers) },
    });

    response.cookies.set('access_token', refreshed.access_token, AUTH_COOKIE_OPTIONS);
    response.cookies.set('refresh_token', refreshed.refresh_token, AUTH_COOKIE_OPTIONS);

    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
