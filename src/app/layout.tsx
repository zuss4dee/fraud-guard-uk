import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { DashboardLayout } from "@/components/layout/dashboard-layout";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "FraudGuard UK | Document Verification",
  description: "AI-powered fraud detection for UK rental market documents",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.variable} font-sans antialiased`}>
          <DashboardLayout>{children}</DashboardLayout>
        </body>
      </html>
    </ClerkProvider>
  );
}
