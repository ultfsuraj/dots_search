import type { Metadata } from 'next';
import './globals.css';
import { Noto_Sans } from 'next/font/google';

export const metadata: Metadata = {
  title: 'Dribble Search',
  description: 'cool detailed search bar',
};

const notoSans = Noto_Sans({
  subsets: ['latin'],
  display: 'swap',
  fallback: ['system-ui', 'sans-serif'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={notoSans.className}>
      <body className="flex-center h-[100dvh] w-[100vw] bg-neutral-300 text-neutral-800">{children}</body>
    </html>
  );
}
