import { Inter } from 'next/font/google';
import Header from '@/components/Header';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Privacy Policy Generator',
  description:
    'Generate a comprehensive privacy policy for your website or app with ease. Customize it to fit your specific needs and ensure compliance with privacy regulations.',
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
