// Lib
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// Services
import { fetchStrapiUserByClerkId } from '@/services/user';

// Constants
import { PROTECTED_ROUTE_PATTERNS, ROUTE } from '@/constants/route';
import {
  ADMIN_ROLE_TYPE,
  USER_ROLE_TYPE,
  USER_ROLE_COOKIE,
  REDIRECT_URL_PARAM,
} from '@/constants/auth';

const isProtectedRoute = createRouteMatcher([...PROTECTED_ROUTE_PATTERNS]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();

  // Signed-out path: clear role cookie if present, redirect from protected routes
  if (!userId) {
    if (req.cookies.has(USER_ROLE_COOKIE)) {
      const res = NextResponse.next();
      res.cookies.delete(USER_ROLE_COOKIE);
      return res;
    }

    if (isProtectedRoute(req)) {
      const redirectTarget = req.nextUrl.pathname + req.nextUrl.search;
      const signInUrl = new URL(ROUTE.SIGN_IN, req.url);
      signInUrl.searchParams.set(REDIRECT_URL_PARAM, redirectTarget);
      return NextResponse.redirect(signInUrl);
    }

    return;
  }

  // Cookie already set: use cached role to redirect if needed
  if (req.cookies.has(USER_ROLE_COOKIE)) {
    const cachedRole = req.cookies.get(USER_ROLE_COOKIE)?.value;

    if (
      cachedRole === ADMIN_ROLE_TYPE &&
      !req.nextUrl.pathname.startsWith(ROUTE.DASHBOARD)
    ) {
      const dashboardUrl = new URL(ROUTE.DASHBOARD, req.url);
      return NextResponse.redirect(dashboardUrl);
    }
    return;
  }

  // First request after sign-in: fetch role from Strapi and cache it
  const strapiUser = await fetchStrapiUserByClerkId(userId);
  const role =
    strapiUser?.role.type === ADMIN_ROLE_TYPE
      ? ADMIN_ROLE_TYPE
      : USER_ROLE_TYPE;
  const cookieOptions = {
    httpOnly: true,
    maxAge: 60 * 60,
    path: '/',
    sameSite: 'lax' as const,
  };

  if (
    role === ADMIN_ROLE_TYPE &&
    !req.nextUrl.pathname.startsWith(ROUTE.DASHBOARD)
  ) {
    const dashboardUrl = new URL(ROUTE.DASHBOARD, req.url);
    const redirectResponse = NextResponse.redirect(dashboardUrl);
    redirectResponse.cookies.set(
      USER_ROLE_COOKIE,
      ADMIN_ROLE_TYPE,
      cookieOptions,
    );
    return redirectResponse;
  }

  const response = NextResponse.next();
  response.cookies.set(USER_ROLE_COOKIE, role, cookieOptions);
  return response;
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
