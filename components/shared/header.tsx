"use client";

import Link from "next/link";
import { ModeToggle } from "@/components/shared/mode-toggle";
import { signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navItems } from "@/constants";

export default function Header() {
  const { data: session } = useSession();

  console.log(session);

  return (
    <header className={"h-[10vh] fixed inset-0 bg-background z-50"}>
      <div className="size-full flex justify-between items-center px-2 sm:px-4 md:px-8 lg:px-16">
        <Link href="/" className={"text-3xl font-bold gradient-foreground"}>
          Tulaganov
        </Link>
        <div className={"max-md:hidden flex items-center gap-x-12"}>
          {navItems.map((navItem) => (
            <Link
              key={navItem.name}
              id={"navItem"}
              href={navItem.path}
              className={"text-lg hover:underline"}
            >
              {navItem.name}
            </Link>
          ))}
        </div>
        <div className={"flex items-center gap-x-4"}>
          <ModeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar>
                <AvatarFallback className="cursor-pointer font-bold">
                  {session?.currentUser?.fullName.at(0)?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem className={"flex flex-col gap-y-1 items-start"}>
                <p className={"gradient-foreground text-lg"}>
                  {session?.currentUser?.fullName}
                </p>
                <p className={"text-muted-foreground text-base"}>
                  {session?.currentUser?.email}
                </p>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Button
                  size={"sm"}
                  className="w-full bg-transparent border-red-500 text-red-500 hover:text-red-500 hover:bg-transparent"
                  onClick={() => signOut({ callbackUrl: "/sign-in" })}
                >
                  Sign out
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                size={"icon"}
                variant={"outline"}
                className={"md:hidden border-0"}
              >
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent className={"w-full"}>
              <SheetTitle />
              <SheetDescription />
              <div className={"h-full flex flex-col justify-center"}>
                {navItems.map((navItem) => (
                  <SheetClose key={navItem.name} asChild>
                    <Link
                      id={"navItem"}
                      href={navItem.path}
                      className={"text-lg text-center py-4 hover:underline"}
                    >
                      {navItem.name}
                    </Link>
                  </SheetClose>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
