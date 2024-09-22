"use client";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  console.log(session)

  return (
    <>
    {
      session ? (
        <div>
          <h1>Welcome {session.user.email}</h1>
          <Button onClick={() => signOut({ callbackUrl: '/sign-in' })}>Sign Out</Button>
        </div>
      ) : (
        <div>
          <h1>Not logged in</h1>
        </div>
      )
    }
    </>
  );
}
