"use client";

import Image from "next/image";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import Button from "@/app/components/common/button";
import classes from "./styles.module.css";

export default function Topbar() {
  const { data: session } = useSession();

  return (
    <nav className={classes.nav}>
      <Link className={classes.homeIcon} href={"/"}>
        Next.js Drive
      </Link>
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
        <Button
          title="Sign Up!"
          onClick={() => signIn()}
          btnClass="btn-primary"
        />
      )}
    </nav>
  );
}
