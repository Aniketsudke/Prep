"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const SignInForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  console.log(username, password);
  const router = useRouter();

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      const result = await signIn("credentials", {
        email: username,
        password,
        redirect: false,
      });
      console.log(result);
      if (result?.error) {
        setErrorMessage(result.error);
      } else {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-md">
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <form onSubmit={handleLogin}>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email or Username</Label>
                  <Input
                    id="email"
                    type="text"
                    placeholder="Email or Username"
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <Link
                      href="#"
                      className="ml-auto inline-block text-sm underline"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    className="mb-2"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  {errorMessage && (
                    <p className="text-red-500 text-sm ">{errorMessage}</p>
                  )}
                </div>
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </form>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => signIn("google")}
              >
                Login with Google
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/sign-up" className="underline">
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignInForm;