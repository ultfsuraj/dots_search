import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Dribble Search',
  description: 'cool detailed search bar',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex-center h-[100dvh] w-[100vw] bg-neutral-300 text-neutral-800">{children}</body>
    </html>
  );
}
