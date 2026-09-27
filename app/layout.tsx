import type { Metadata } from "next";
import type { ReactNode } from "react";
import "@fontsource/bodoni-moda/400.css";
import "@fontsource/bodoni-moda/500.css";
import "@fontsource/dm-sans/400.css";
import "@fontsource/dm-sans/500.css";
import "@fontsource/dm-sans/600.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Imaya & Shehan — Wedding Invitation",
  description: "Join Imaya Kehelkaduwa and Shehan Aluwihare on 16 July 2027.",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
