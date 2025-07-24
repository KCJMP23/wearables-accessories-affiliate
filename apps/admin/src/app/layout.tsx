import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Providers from '@/components/Providers';
import AdminNavigation from '@/components/AdminNavigation';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Affiliate Platform - Admin Dashboard',
  description: 'Admin dashboard for the affiliate platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="flex min-h-screen bg-apple-gray-50 overflow-x-hidden">
            <AdminNavigation />
            <div className="flex-1 w-full overflow-x-hidden lg:ml-0">
              <main className="p-4 md:p-6 lg:p-8 max-w-full">
                {children}
              </main>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}