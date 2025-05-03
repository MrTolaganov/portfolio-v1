"use client";

import { ChildProps } from "@/types";
import { SessionProvider } from "next-auth/react";

export default function NextAuthSessionProvider({ children }: ChildProps) {
  return <SessionProvider>{children}</SessionProvider>;
}
