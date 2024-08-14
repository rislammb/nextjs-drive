import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { Inter } from "next/font/google";
import "./globals.css";

import AuthProvider from "@/components/auth-provider";
import Topbar from "@/components/topbar";
import { authOptions } from "@/server/auth";

export const metadata: Metadata = {
  title: "Next.js Drive",
  description: "This is a Drive clone app made by Next.js",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en" className={inter.className}>
      <body className="min-h-screen bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <AuthProvider session={session}>
          <Topbar />
          <main className="px-4 py-2">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
