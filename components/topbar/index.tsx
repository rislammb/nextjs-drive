"use client";

import { signIn, signOut, useSession } from "next-auth/react";

import Button from "@/components/common/Button";
import classes from "./styles.module.css";
import Image from "next/image";

export default function Topbar() {
  const { data: session } = useSession();

  return (
    <nav className={classes.nav}>
      {session ? (
        <Image
          src={session.user?.image ?? ""}
          alt={session.user?.name ?? "Profile Image"}
          width={50}
          height={50}
          className={classes.profileImg}
          onClick={() => signOut()}
        />
      ) : (
        <Button title="Sign Up!" onClick={signIn} btnClass="btn-primary" />
      )}
    </nav>
  );
}
