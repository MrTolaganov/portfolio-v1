"use client";

import { Button } from "@/components/ui/button";
import { FaGithub } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { signIn } from "next-auth/react";

export default function Oauth() {
  return (
    <div className={"grid grid-cols-2 gap-x-3"}>
      <Button
        variant={"secondary"}
        className={"text-primary"}
        onClick={() => signIn("github", { callbackUrl: "/" })}
      >
        <FaGithub /> Github
      </Button>
      <Button
        variant={"secondary"}
        className={"text-primary"}
        onClick={() => signIn("google", { callbackUrl: "/" })}
      >
        <FaGoogle />
        Google
      </Button>
    </div>
  );
}
