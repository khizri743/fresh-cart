import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext'; // <--- Import This

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Grocery Store App',
  description: 'Fresh groceries delivered to your door',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Wrap children with CartProvider */}
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
