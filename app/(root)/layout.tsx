import { ChildProps } from "@/types";
import Header from "@/components/shared/header";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/lib/auth-options";
import { redirect } from "next/navigation";
import Footer from "@/components/shared/footer";

export default async function RootLayout({ children }: ChildProps) {
  const session = await getServerSession(nextAuthOptions);

  if (!session) return redirect("/sign-in");

  return (
    <div>
      <Header />
      <main className={"mt-[10vh]"}>{children}</main>
      <Footer />
    </div>
  );
}
