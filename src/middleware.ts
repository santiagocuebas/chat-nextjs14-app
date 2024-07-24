import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
	const token = req.cookies.get('authenticate');

	if (req.nextUrl.pathname === '/' && !token) {
		return NextResponse.redirect(new URL('/register', req.url), 307);
	} else if (req.nextUrl.pathname === '/register' && token) {
		return NextResponse.redirect(new URL('/', req.url), 307);
	}
};

export const config = {
  matcher: ['/', '/register']
}
