"use client";
import Link from "next/link";
import { CircleUser, Menu, Package2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
import { Skeleton } from "./ui/skeleton";

const Navbar = () => {
  const { data: session,status } = useSession();
  return (
    <header className="sticky z-50 top-0 flex w-full h-16 items-center gap-4 border-b bg-white px-4 md:px-6">
      <nav className="hidden  flex-col gap-8 text-lg font-medium md:flex md:flex-row md:items-center md:gap-8 md:text-sm lg:gap-10">
        <Link
          href="#"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <Image src={'/logo.svg'} alt="Acme Inc" width={250} height={250} />
        </Link>
        <Link
          href="/"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Home
        </Link>
        <Link
          href="/questionset"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Questions
        </Link>
        <Link
          href="/challenge"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Challenge
        </Link>
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="bg-white w-[220px] ">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="#"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <Image src={'/logo.svg'} alt="Acme Inc" width={60} height={60} />
            </Link>
            <Link
              href="/"
              className="text-muted-foreground  hover:text-foreground"
            >
              Home
            </Link>
            <Link
              href="/questionset"
              className="text-muted-foreground hover:text-foreground"
            >
              Question
            </Link>
            <Link
              href="challenge"
              className="text-muted-foreground hover:text-foreground"
            >
              Challenge
            </Link>

            <Link href="#" className="hover:text-foreground">
              Profile
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full items-center justify-end  md:ml-auto md:gap-2 lg:gap-4">
        {!session && status === "unauthenticated" ? (
          <div className="flex gap-1 md:gap-2">
            <Link href={"/sign-in"}>
              {" "}
              <Button>Login</Button>
            </Link>
            <Link href={"/sign-up"}>
              {" "}
              <Button>Register</Button>
            </Link>
          </div>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                {status !== "loading" ? (session?.user.image ? (
                  <Image
                    src={session.user.image}
                    alt="user profile"
                    width={28}
                    height={28}
                    className="rounded-full"
                  />
                ) : (
                  <CircleUser className="h-7 w-7" />
                )):(
                  <Skeleton className="h-7 w-7 rounded-full" />
                )}
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })}>
                Log Out{" "}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  );
};

export default Navbar;