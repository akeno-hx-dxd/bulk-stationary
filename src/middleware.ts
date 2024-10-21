import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {

  if (request.method === 'OPTIONS') {
    const preflightResponse = new NextResponse(null, { status: 204 });
    preflightResponse.headers.set('Access-Control-Allow-Origin', '*');
    preflightResponse.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    preflightResponse.headers.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
    return preflightResponse;
  }

  const response = NextResponse.next();
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  response.headers.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');

  if (isAuthRoute(request)) {
    const authResponse = isAuthenticated(request);
    if (!authResponse) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }
  }

  return response;
}

function isAuthRoute(request: NextRequest): boolean {
  const authRoutes = [
    { path: '/api/products', methods: ['POST'] },
    { path: '/api/products/[pid]', methods: ['POST', 'DELETE'] },
  ];

  return authRoutes.some(route => 
    request.nextUrl.pathname.startsWith(route.path) && 
    route.methods.includes(request.method)
  );
}

function isAuthenticated(request: NextRequest) {
  const key = request.cookies.get('auth-key')?.value;
  return key === process.env.ADMIN_KEY;
}

export const config = {
  matcher: ['/api/:path*'],
};
