import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { Inter } from "next/font/google";

import AuthProvider from "@/app/components/auth-provider";
import Topbar from "@/app/components/topbar";
import { authOptions } from "@/server/auth";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next.js Drive",
  description: "This is a Drive clone app made by Next.js",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen`}>
        <AuthProvider session={session}>
          <Topbar />
          <main className="px-4 py-2">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
