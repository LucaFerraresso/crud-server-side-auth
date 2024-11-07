import { NextResponse } from 'next/server';
    import type { NextRequest } from 'next/server';

    export async function middleware(req: NextRequest) {
      // Semplice controllo - da migliorare con una vera gestione delle sessioni
      const isAuthenticated = req.cookies.get('authenticated') === 'true';

      if (!isAuthenticated && req.nextUrl.pathname.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL('/login', req.url));
      }

      if (isAuthenticated && req.nextUrl.pathname === '/login') {
        return NextResponse.redirect(new URL('/dashboard', req.url));
      }


      return NextResponse.next();
    }

    export const config = {
      matcher: ['/dashboard', '/login'],
    };
