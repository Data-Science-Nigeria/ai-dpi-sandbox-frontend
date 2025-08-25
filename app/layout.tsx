import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import { GlobalAlertDialog } from './components/global-alert-dialog';


const poppins = Poppins({
  variable: '--poppins',
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700'],
});

const inter = Inter({
  variable: '--inter',
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: "Sandbox Frontend",
  description: "Sandbox AI DPI Frontend",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${inter.variable} antialiased`}>
          {children}
          <GlobalAlertDialog />
      </body>
    </html>
  );
}
