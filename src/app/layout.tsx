import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AgeGate } from "@/components/AgeGate";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SMOQUEE | Curated. Imported. Unapologetic.",
  description: "SMOQUEE is a premium curated store offering imported chocolates, imported perfumes, premium smoke accessories, lifestyle accessories and other imported products located on Thanisandra Main Road, Bengaluru.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${outfit.variable}`} suppressHydrationWarning>
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <AgeGate />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
