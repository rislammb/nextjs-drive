"use client";

import { useSession, signIn, signOut } from "next-auth/react";

import Button from "@/components/Button";

export default function HomePage() {
  const session = useSession();

  console.log("session => ", session);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        {session?.data ? (
          <Button onClick={signOut} title="Sign Out!" btnClass="btn-primary" />
        ) : (
          <Button title="Sign Up!" onClick={signIn} btnClass="btn-primary" />
        )}
      </div>
    </main>
  );
}
