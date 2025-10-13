import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import { GlobalAlertDialog } from "./components/global-alert-dialog";
import { ThemeProvider } from "./components/theme-provider";
import { ThemeScript } from "./components/theme-script";

const poppins = Poppins({
  variable: "--poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--inter",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "DSN Sandbox",
  description:
    "Sandbox AI DPI Frontend Application for API Testing and Development",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <ThemeScript />
      </head>
      <body className={`${poppins.variable} ${inter.variable} antialiased`}>
        <ThemeProvider>
          {children}
          <GlobalAlertDialog />
        </ThemeProvider>
      </body>
    </html>
  );
}
