import { Inter } from 'next/font/google';
import Header from '@/components/Header';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Next.js 15 Starter App',
  description:
    'A starter template for Next.js 15 applications with Tailwind CSS and more.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased bg-gradient-to-br from-blue-100 via-amber-50 to-indigo-100`}
      >
        <Header />
        {/* <main className="max-w-6xl mx-auto px-4 pb-24"> */}
        <main className="min-h-screen">
          {children}
          <ScrollToTopButton />
        </main>
      </body>
    </html>
  );
}
