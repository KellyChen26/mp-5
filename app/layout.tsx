import type { Metadata } from "next";
import "./globals.css";
import Header from "@/component/Header";

export const metadata: Metadata = {
  title: "URL Shortener",
  description: "Welcome! Shorten your URLs here with your custom alias!",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
      <html lang="en">
        <body>
        <Header/>
        {children}
        </body>
      </html>

  );
}
