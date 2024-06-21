import { withAuth } from 'next-auth/middleware';
export default withAuth(function middleware() {});

export const config = {
  matcher: ['/account-settings/:path*', '/bookings/:path*'],
};
