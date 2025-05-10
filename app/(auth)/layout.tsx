import { ChildProps } from "@/types";
import Oauth from "@/components/shared/oauth";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/lib/auth-options";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tulaganov | Auth",
  description: "Authentication for website",
};

export default async function AuthLayout({ children }: ChildProps) {
  const session = await getServerSession(nextAuthOptions);

  if (session) return redirect("/");

  return (
    <div className={"h-screen flex justify-center items-center"}>
      <div className="flex flex-col w-full md:w-1/2 lg:w-1/3 px-2 gap-y-3">
        <h1 className="text-3xl font-bold text-center gradient-foreground from-blue to-red mb-3">
          Tulaganov
        </h1>
        {children}
        <Oauth />
      </div>
    </div>
  );
}
