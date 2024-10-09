"use client";
import Link from "next/link";
import { CircleUser, Menu } from "lucide-react";
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
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
    const { data: session,status } = useSession();

  return (
    <>
    
    <div className="bg-gray-50">
    <header className=" top-0 flex w-full h-16 items-center gap-4  px-4 md:px-6">
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

    
                                            

    <section className="pt-12 pb-12 sm:pb-16 lg:pt-8">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="grid max-w-lg grid-cols-1 mx-auto lg:max-w-full lg:items-center lg:grid-cols-2 gap-y-12 lg:gap-x-16">
                <div>
                    <div className="text-center lg:text-left">
                        <h1 className="text-4xl font-bold leading-tight text-gray-700 sm:text-5xl sm:leading-tight lg:leading-tight lg:text-6xl font-pj">Crack JEE & NEET with AI-Powered Practice Questions.</h1>
                        <p className="mt-2 text-lg text-gray-600 sm:mt-8 font-inter">Personalized learning paths, real-time competition, and in-depth performance insights to help you excel.</p>

                        {/* <form action="#" method="POST" className="mt-8 sm:mt-10">
                            <div className="relative p-2 sm:border sm:border-gray-400 group sm:rounded-xl sm:focus-within:ring-1 sm:focus-within:ring-gray-900 sm:focus-within:border-gray-900">
                                <input
                                    type="email"
                                    name=""
                                    id=""
                                    placeholder="Enter email address"
                                    className="block w-full px-4 py-4 text-gray-900 placeholder-gray-900 bg-transparent border border-gray-400 outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 rounded-xl sm:border-none sm:focus:ring-0 sm:focus:border-transparent"
                                    required
                                />
                                <div className="mt-4 sm:mt-0 sm:absolute sm:inset-y-0 sm:right-0 sm:flex sm:items-center sm:pr-2">
                                    <button type="submit" className="inline-flex px-6 py-3 text-lg font-bold text-white transition-all duration-200 bg-gray-900 rounded-lg focus:outline-none focus:bg-gray-600 font-pj hover:bg-gray-600">Get Free Card</button>
                                </div>
                            </div>
                        </form> */}
                    </div>

                    <div className="flex items-center justify-center mt-10 space-x-6 lg:justify-start sm:space-x-8">
                        <div className="flex items-center">
                            <p className="text-3xl font-medium text-gray-900 sm:text-4xl font-pj">2943</p>
                            <p className="ml-3 text-sm text-gray-900 font-pj">Cards<br />Delivered</p>
                        </div>

                        <div className="hidden sm:block">
                            <svg className="text-gray-400" width="16" height="39" viewBox="0 0 16 39" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <line x1="0.72265" y1="10.584" x2="15.7226" y2="0.583975"></line>
                                <line x1="0.72265" y1="17.584" x2="15.7226" y2="7.58398"></line>
                                <line x1="0.72265" y1="24.584" x2="15.7226" y2="14.584"></line>
                                <line x1="0.72265" y1="31.584" x2="15.7226" y2="21.584"></line>
                                <line x1="0.72265" y1="38.584" x2="15.7226" y2="28.584"></line>
                            </svg>
                        </div>

                        <div className="flex items-center">
                            <p className="text-3xl font-medium text-gray-900 sm:text-4xl font-pj">$1M+</p>
                            <p className="ml-3 text-sm text-gray-900 font-pj">Transaction<br />Completed</p>
                        </div>
                    </div>
                </div>

                <div>
                    <img className="w-full" src="https://d33wubrfki0l68.cloudfront.net/d6f1462500f7670e0db6b76b35054a081679a5a0/0ce15/images/hero/5.1/illustration.png" alt="" />
                </div>
            </div>
        </div>
    </section>
</div>

{/* Feature Section */}
<section className="py-24 ">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mb-10 lg:mb-16 flex justify-center items-center flex-col gap-x-0 gap-y-6 lg:gap-y-0 lg:flex-row lg:justify-between max-md:max-w-lg max-md:mx-auto">
                  <div className="relative w-full text-center lg:text-left lg:w-2/4">
                      <h2 className="text-4xl font-bold text-gray-900 leading-[3.25rem] lg:mb-6 mx-auto max-w-max lg:max-w-md lg:mx-0">Enjoy the finest features with our products</h2>
                  </div>
                  <div className="relative w-full text-center  lg:text-left lg:w-2/4">
                      <p className="text-lg font-normal text-gray-500 mb-5">We provide all the advantages that can simplify all your financial transactions without any further requirements</p> 
                      <a href="#" className="flex flex-row items-center justify-center gap-2 text-base font-semibold text-indigo-600 lg:justify-start hover:text-indigo-700 ">Button CTA <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M7.5 15L11.0858 11.4142C11.7525 10.7475 12.0858 10.4142 12.0858 10C12.0858 9.58579 11.7525 9.25245 11.0858 8.58579L7.5 5" stroke="#4F46E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                          </svg>
                          </a> 
                  </div>
              </div>
              <div className="flex justify-center items-center  gap-x-5 gap-y-8 lg:gap-y-0 flex-wrap md:flex-wrap lg:flex-nowrap lg:flex-row lg:justify-between lg:gap-x-8">
                  <div className="group relative w-full bg-gray-100 rounded-2xl p-4 transition-all duration-500 max-md:max-w-md max-md:mx-auto md:w-2/5 md:h-64 xl:p-7 xl:w-1/4 hover:bg-indigo-600">
                      <div className="bg-white rounded-full flex justify-center items-center mb-5 w-14 h-14 ">
                          <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M24.7222 11.6667V7.22225C24.7222 5.99495 23.7273 5 22.5 5H4.72222C3.49492 5 2.5 5.99492 2.5 7.22222V22.7778C2.5 24.0051 3.49492 25 4.72222 25H22.5C23.7273 25 24.7222 24.005 24.7222 22.7777V17.7778M20.8333 17.7778H25.2778C26.5051 17.7778 27.5 16.7829 27.5 15.5556V13.8889C27.5 12.6616 26.5051 11.6667 25.2778 11.6667H20.8333C19.606 11.6667 18.6111 12.6616 18.6111 13.8889V15.5556C18.6111 16.7829 19.606 17.7778 20.8333 17.7778Z" stroke="#4F46E5" stroke-width="2"></path>
                              </svg>
                              
                      </div>
                      <h4 className="text-xl font-semibold text-gray-900 mb-3 capitalize transition-all duration-500 group-hover:text-white">Easy Payment</h4>
                      <p className="text-sm font-normal text-gray-500 transition-all duration-500 leading-5 group-hover:text-white">
                          We Provide Various Methods For You To Carry Out All Transactions Related To Your Finances 
                      </p>
                  </div>
                  <div className="group relative w-full bg-gray-100 rounded-2xl p-4 transition-all duration-500 max-md:max-w-md max-md:mx-auto md:w-2/5 md:h-64 xl:p-7 xl:w-1/4 hover:bg-indigo-600">
                      <div className="bg-white rounded-full flex justify-center items-center mb-5 w-14 h-14 ">
                          <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M14.375 15.8571C16.1009 15.8571 17.5 14.458 17.5 12.7321C17.5 11.0062 16.1009 9.6071 14.375 9.6071C12.6491 9.6071 11.25 11.0062 11.25 12.7321C11.25 14.458 12.6491 15.8571 14.375 15.8571ZM14.375 15.8571V20.8571M3.75 13.2264V15.2343C3.75 17.6868 3.75 18.9131 4.27747 19.9685C4.80493 21.0239 5.78567 21.76 7.74715 23.2322L8.57248 23.8516C11.4626 26.0208 12.9077 27.1054 14.5753 27.1054C16.243 27.1054 17.688 26.0208 20.5782 23.8516L21.4035 23.2322C23.365 21.76 24.3457 21.0239 24.8732 19.9685C25.4006 18.9131 25.4006 17.6868 25.4006 15.2343V13.2264C25.4006 9.95932 25.4006 8.32576 24.546 7.05852C23.6913 5.79128 22.1768 5.17918 19.1477 3.95499L18.3223 3.62144C16.4724 2.87381 15.5475 2.5 14.5753 2.5C13.6032 2.5 12.6782 2.87381 10.8283 3.62144L10.003 3.95499C6.97389 5.17919 5.45934 5.79128 4.60467 7.05852C3.75 8.32576 3.75 9.95932 3.75 13.2264Z" stroke="#4F46E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                              </svg>
                              
                      </div>
                      <h4 className="text-xl font-semibold text-gray-900 mb-3 capitalize transition-all duration-500 group-hover:text-white">Safe Transaction</h4>
                      <p className="text-sm font-normal text-gray-500 transition-all duration-500 leading-5 group-hover:text-white">
                          We have the most up-to-date security to support the security of all our customers in carrying out all transactions.  
                      </p>
                  </div>
                  <div className="group relative w-full bg-gray-100 rounded-2xl p-4 transition-all duration-500 max-md:max-w-md max-md:mx-auto md:w-2/5 md:h-64 xl:p-7 xl:w-1/4 hover:bg-indigo-600">
                      <div className="bg-white rounded-full flex justify-center items-center mb-5 w-14 h-14 ">
                          <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M15.0067 10V15.6652C15.0067 16.0358 15.1712 16.3873 15.4556 16.6248L18.75 19.375M15 27.5C8.09644 27.5 2.5 21.9036 2.5 15C2.5 8.09644 8.09644 2.5 15 2.5C21.9036 2.5 27.5 8.09644 27.5 15C27.5 21.9036 21.9036 27.5 15 27.5Z" stroke="#4F46E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                              </svg>
                              
                      </div>
                      <h4 className="text-xl font-semibold text-gray-900 mb-3 capitalize transition-all duration-500 group-hover:text-white">Fast Customer Service </h4>
                      <p className="text-sm font-normal text-gray-500 transition-all duration-500 leading-5 group-hover:text-white">
                          Provide Customer Service For Those Of You Who Have Problems 24 Hours A Week  
                      </p>
                  </div>
                  <div className="group relative w-full bg-gray-100 rounded-2xl p-4 transition-all duration-500 max-md:max-w-md max-md:mx-auto md:w-2/5 md:h-64 xl:p-7 xl:w-1/4 hover:bg-indigo-600">
                      <div className="bg-white rounded-full flex justify-center items-center mb-5 w-14 h-14 ">
                          <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M10 14.7875L13.0959 17.8834C13.3399 18.1274 13.7353 18.1275 13.9794 17.8838L20.625 11.25M15 27.5C8.09644 27.5 2.5 21.9036 2.5 15C2.5 8.09644 8.09644 2.5 15 2.5C21.9036 2.5 27.5 8.09644 27.5 15C27.5 21.9036 21.9036 27.5 15 27.5Z" stroke="#4F46E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                              </svg>
                              
                      </div>
                      <h4 className="text-xl font-semibold text-gray-900 mb-3 capitalize transition-all duration-500 group-hover:text-white">Quick Transaction</h4>
                      <p className="text-sm font-normal text-gray-500 transition-all duration-500 leading-5 group-hover:text-white">
                          We provide faster transaction speeds than competitors, so money arrives and is received faster. 
                      </p>
                  </div>
              </div>
        </div>
      </section>

<section className="py-10 bg-gray-100 sm:py-16 lg:py-24">
    <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">What our customers say</h2>
            <p className="max-w-lg mx-auto mt-4 text-base leading-relaxed text-gray-600">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis.</p>
        </div>

        <div className="grid grid-cols-1 gap-6 px-4 mt-12 sm:px-0 xl:mt-20 xl:grid-cols-4 sm:grid-cols-2">
            <div className="overflow-hidden bg-white rounded-md">
                <div className="px-5 py-6">
                    <div className="flex items-center justify-between">
                        <img className="flex-shrink-0 object-cover w-10 h-10 rounded-full" src="https://cdn.rareblocks.xyz/collection/celebration/images/testimonials/7/avatar-1.jpg" alt="" />
                        <div className="min-w-0 ml-3 mr-auto">
                            <p className="text-base font-semibold text-black truncate">Darrell Steward</p>
                            <p className="text-sm text-gray-600 truncate">@darrels</p>
                        </div>
                        <a href="#" title="" className="inline-block text-sky-500">
                            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path
                                    d="M19.633 7.997c.013.175.013.349.013.523 0 5.325-4.053 11.461-11.46 11.461-2.282 0-4.402-.661-6.186-1.809.324.037.636.05.973.05a8.07 8.07 0 0 0 5.001-1.721 4.036 4.036 0 0 1-3.767-2.793c.249.037.499.062.761.062.361 0 .724-.05 1.061-.137a4.027 4.027 0 0 1-3.23-3.953v-.05c.537.299 1.16.486 1.82.511a4.022 4.022 0 0 1-1.796-3.354c0-.748.199-1.434.548-2.032a11.457 11.457 0 0 0 8.306 4.215c-.062-.3-.1-.611-.1-.923a4.026 4.026 0 0 1 4.028-4.028c1.16 0 2.207.486 2.943 1.272a7.957 7.957 0 0 0 2.556-.973 4.02 4.02 0 0 1-1.771 2.22 8.073 8.073 0 0 0 2.319-.624 8.645 8.645 0 0 1-2.019 2.083z"
                                ></path>
                            </svg>
                        </a>
                    </div>
                    <blockquote className="mt-5">
                        <p className="text-base text-gray-800">
                            You made it so simple. My new site is so much faster and easier to work with than my old site. I just choose the page, make the change and click save.
                            <span className="block text-sky-500">#another</span>
                        </p>
                    </blockquote>
                </div>
            </div>

            <div className="overflow-hidden bg-white rounded-md">
                <div className="px-5 py-6">
                    <div className="flex items-center justify-between">
                        <img className="flex-shrink-0 object-cover w-10 h-10 rounded-full" src="https://cdn.rareblocks.xyz/collection/celebration/images/testimonials/7/avatar-2.jpg" alt="" />
                        <div className="min-w-0 ml-3 mr-auto">
                            <p className="text-base font-semibold text-black truncate">Leslie Alexander</p>
                            <p className="text-sm text-gray-600 truncate">@lesslie</p>
                        </div>
                        <a href="#" title="" className="inline-block text-sky-500">
                            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path
                                    d="M19.633 7.997c.013.175.013.349.013.523 0 5.325-4.053 11.461-11.46 11.461-2.282 0-4.402-.661-6.186-1.809.324.037.636.05.973.05a8.07 8.07 0 0 0 5.001-1.721 4.036 4.036 0 0 1-3.767-2.793c.249.037.499.062.761.062.361 0 .724-.05 1.061-.137a4.027 4.027 0 0 1-3.23-3.953v-.05c.537.299 1.16.486 1.82.511a4.022 4.022 0 0 1-1.796-3.354c0-.748.199-1.434.548-2.032a11.457 11.457 0 0 0 8.306 4.215c-.062-.3-.1-.611-.1-.923a4.026 4.026 0 0 1 4.028-4.028c1.16 0 2.207.486 2.943 1.272a7.957 7.957 0 0 0 2.556-.973 4.02 4.02 0 0 1-1.771 2.22 8.073 8.073 0 0 0 2.319-.624 8.645 8.645 0 0 1-2.019 2.083z"
                                ></path>
                            </svg>
                        </a>
                    </div>
                    <blockquote className="mt-5">
                        <p className="text-base text-gray-800">
                            Simply the best. Better than all the rest. I’d recommend this product to beginners and advanced users.
                            <span className="block text-sky-500">#Celebration</span>
                        </p>
                    </blockquote>
                </div>
            </div>

            <div className="overflow-hidden bg-white rounded-md">
                <div className="px-5 py-6">
                    <div className="flex items-center justify-between">
                        <img className="flex-shrink-0 object-cover w-10 h-10 rounded-full" src="https://cdn.rareblocks.xyz/collection/celebration/images/testimonials/7/avatar-3.jpg" alt="" />
                        <div className="min-w-0 ml-3 mr-auto">
                            <p className="text-base font-semibold text-black truncate">Jenny Wilson</p>
                            <p className="text-sm text-gray-600 truncate">@jennywilson</p>
                        </div>
                        <a href="#" title="" className="inline-block text-sky-500">
                            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path
                                    d="M19.633 7.997c.013.175.013.349.013.523 0 5.325-4.053 11.461-11.46 11.461-2.282 0-4.402-.661-6.186-1.809.324.037.636.05.973.05a8.07 8.07 0 0 0 5.001-1.721 4.036 4.036 0 0 1-3.767-2.793c.249.037.499.062.761.062.361 0 .724-.05 1.061-.137a4.027 4.027 0 0 1-3.23-3.953v-.05c.537.299 1.16.486 1.82.511a4.022 4.022 0 0 1-1.796-3.354c0-.748.199-1.434.548-2.032a11.457 11.457 0 0 0 8.306 4.215c-.062-.3-.1-.611-.1-.923a4.026 4.026 0 0 1 4.028-4.028c1.16 0 2.207.486 2.943 1.272a7.957 7.957 0 0 0 2.556-.973 4.02 4.02 0 0 1-1.771 2.22 8.073 8.073 0 0 0 2.319-.624 8.645 8.645 0 0 1-2.019 2.083z"
                                ></path>
                            </svg>
                        </a>
                    </div>
                    <blockquote className="mt-5">
                        <p className="text-base text-gray-800">
                            This is a top quality product. No need to think twice before making it live on web.
                            <span className="block text-sky-500">#make_it_fast</span>
                        </p>
                    </blockquote>
                </div>
            </div>

            <div className="overflow-hidden bg-white rounded-md">
                <div className="px-5 py-6">
                    <div className="flex items-center justify-between">
                        <img className="flex-shrink-0 object-cover w-10 h-10 rounded-full" src="https://cdn.rareblocks.xyz/collection/celebration/images/testimonials/7/avatar-4.jpg" alt="" />
                        <div className="min-w-0 ml-3 mr-auto">
                            <p className="text-base font-semibold text-black truncate">Kristin Watson</p>
                            <p className="text-sm text-gray-600 truncate">@kristinwatson2</p>
                        </div>
                        <a href="#" title="" className="inline-block text-sky-500">
                            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path
                                    d="M19.633 7.997c.013.175.013.349.013.523 0 5.325-4.053 11.461-11.46 11.461-2.282 0-4.402-.661-6.186-1.809.324.037.636.05.973.05a8.07 8.07 0 0 0 5.001-1.721 4.036 4.036 0 0 1-3.767-2.793c.249.037.499.062.761.062.361 0 .724-.05 1.061-.137a4.027 4.027 0 0 1-3.23-3.953v-.05c.537.299 1.16.486 1.82.511a4.022 4.022 0 0 1-1.796-3.354c0-.748.199-1.434.548-2.032a11.457 11.457 0 0 0 8.306 4.215c-.062-.3-.1-.611-.1-.923a4.026 4.026 0 0 1 4.028-4.028c1.16 0 2.207.486 2.943 1.272a7.957 7.957 0 0 0 2.556-.973 4.02 4.02 0 0 1-1.771 2.22 8.073 8.073 0 0 0 2.319-.624 8.645 8.645 0 0 1-2.019 2.083z"
                                ></path>
                            </svg>
                        </a>
                    </div>
                    <blockquote className="mt-5">
                        <p className="text-base text-gray-800">
                            YFinally, I’ve found a template that covers all bases for a bootstrapped startup. We were able to launch in days, not months.
                            <span className="block text-sky-500">#Celebration</span>
                        </p>
                    </blockquote>
                </div>
            </div>

            <div className="overflow-hidden bg-white rounded-md">
                <div className="px-5 py-6">
                    <div className="flex items-center justify-between">
                        <img className="flex-shrink-0 object-cover w-10 h-10 rounded-full" src="https://cdn.rareblocks.xyz/collection/celebration/images/testimonials/7/avatar-5.jpg" alt="" />
                        <div className="min-w-0 ml-3 mr-auto">
                            <p className="text-base font-semibold text-black truncate">Guy Hawkins</p>
                            <p className="text-sm text-gray-600 truncate">@jennywilson</p>
                        </div>
                        <a href="#" title="" className="inline-block text-sky-500">
                            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path
                                    d="M19.633 7.997c.013.175.013.349.013.523 0 5.325-4.053 11.461-11.46 11.461-2.282 0-4.402-.661-6.186-1.809.324.037.636.05.973.05a8.07 8.07 0 0 0 5.001-1.721 4.036 4.036 0 0 1-3.767-2.793c.249.037.499.062.761.062.361 0 .724-.05 1.061-.137a4.027 4.027 0 0 1-3.23-3.953v-.05c.537.299 1.16.486 1.82.511a4.022 4.022 0 0 1-1.796-3.354c0-.748.199-1.434.548-2.032a11.457 11.457 0 0 0 8.306 4.215c-.062-.3-.1-.611-.1-.923a4.026 4.026 0 0 1 4.028-4.028c1.16 0 2.207.486 2.943 1.272a7.957 7.957 0 0 0 2.556-.973 4.02 4.02 0 0 1-1.771 2.22 8.073 8.073 0 0 0 2.319-.624 8.645 8.645 0 0 1-2.019 2.083z"
                                ></path>
                            </svg>
                        </a>
                    </div>
                    <blockquote className="mt-5">
                        <p className="text-base text-gray-800">
                            This is a top quality product. No need to think twice before making it live on web.
                            <span className="block text-sky-500">#make_it_fast</span>
                        </p>
                    </blockquote>
                </div>
            </div>

            <div className="overflow-hidden bg-white rounded-md">
                <div className="px-5 py-6">
                    <div className="flex items-center justify-between">
                        <img className="flex-shrink-0 object-cover w-10 h-10 rounded-full" src="https://cdn.rareblocks.xyz/collection/celebration/images/testimonials/7/avatar-6.jpg" alt="" />
                        <div className="min-w-0 ml-3 mr-auto">
                            <p className="text-base font-semibold text-black truncate">Marvin McKinney</p>
                            <p className="text-sm text-gray-600 truncate">@darrels</p>
                        </div>
                        <a href="#" title="" className="inline-block text-sky-500">
                            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path
                                    d="M19.633 7.997c.013.175.013.349.013.523 0 5.325-4.053 11.461-11.46 11.461-2.282 0-4.402-.661-6.186-1.809.324.037.636.05.973.05a8.07 8.07 0 0 0 5.001-1.721 4.036 4.036 0 0 1-3.767-2.793c.249.037.499.062.761.062.361 0 .724-.05 1.061-.137a4.027 4.027 0 0 1-3.23-3.953v-.05c.537.299 1.16.486 1.82.511a4.022 4.022 0 0 1-1.796-3.354c0-.748.199-1.434.548-2.032a11.457 11.457 0 0 0 8.306 4.215c-.062-.3-.1-.611-.1-.923a4.026 4.026 0 0 1 4.028-4.028c1.16 0 2.207.486 2.943 1.272a7.957 7.957 0 0 0 2.556-.973 4.02 4.02 0 0 1-1.771 2.22 8.073 8.073 0 0 0 2.319-.624 8.645 8.645 0 0 1-2.019 2.083z"
                                ></path>
                            </svg>
                        </a>
                    </div>
                    <blockquote className="mt-5">
                        <p className="text-base text-gray-800">
                            With Celebration, it’s quicker with the customer, the customer is more ensured of getting exactly what they ordered, and I’m all for the efficiency.
                            <span className="block text-sky-500">#dev #tools</span>
                        </p>
                    </blockquote>
                </div>
            </div>

            <div className="overflow-hidden bg-white rounded-md">
                <div className="px-5 py-6">
                    <div className="flex items-center justify-between">
                        <img className="flex-shrink-0 object-cover w-10 h-10 rounded-full" src="https://cdn.rareblocks.xyz/collection/celebration/images/testimonials/7/avatar-7.jpg" alt="" />
                        <div className="min-w-0 ml-3 mr-auto">
                            <p className="text-base font-semibold text-black truncate">Annette Black</p>
                            <p className="text-sm text-gray-600 truncate">@darrels</p>
                        </div>
                        <a href="#" title="" className="inline-block text-sky-500">
                            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path
                                    d="M19.633 7.997c.013.175.013.349.013.523 0 5.325-4.053 11.461-11.46 11.461-2.282 0-4.402-.661-6.186-1.809.324.037.636.05.973.05a8.07 8.07 0 0 0 5.001-1.721 4.036 4.036 0 0 1-3.767-2.793c.249.037.499.062.761.062.361 0 .724-.05 1.061-.137a4.027 4.027 0 0 1-3.23-3.953v-.05c.537.299 1.16.486 1.82.511a4.022 4.022 0 0 1-1.796-3.354c0-.748.199-1.434.548-2.032a11.457 11.457 0 0 0 8.306 4.215c-.062-.3-.1-.611-.1-.923a4.026 4.026 0 0 1 4.028-4.028c1.16 0 2.207.486 2.943 1.272a7.957 7.957 0 0 0 2.556-.973 4.02 4.02 0 0 1-1.771 2.22 8.073 8.073 0 0 0 2.319-.624 8.645 8.645 0 0 1-2.019 2.083z"
                                ></path>
                            </svg>
                        </a>
                    </div>
                    <blockquote className="mt-5">
                        <p className="text-base text-gray-800">
                            You made it so simple. My new site is so much faster and easier to work with than my old site. I just choose the page, make the change and click save.
                            <span className="block text-sky-500">#another</span>
                        </p>
                    </blockquote>
                </div>
            </div>

            <div className="overflow-hidden bg-white rounded-md">
                <div className="px-5 py-6">
                    <div className="flex items-center justify-between">
                        <img className="flex-shrink-0 object-cover w-10 h-10 rounded-full" src="https://cdn.rareblocks.xyz/collection/celebration/images/testimonials/7/avatar-8.jpg" alt="" />
                        <div className="min-w-0 ml-3 mr-auto">
                            <p className="text-base font-semibold text-black truncate">Floyd Miles</p>
                            <p className="text-sm text-gray-600 truncate">@darrels</p>
                        </div>
                        <a href="#" title="" className="inline-block text-sky-500">
                            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path
                                    d="M19.633 7.997c.013.175.013.349.013.523 0 5.325-4.053 11.461-11.46 11.461-2.282 0-4.402-.661-6.186-1.809.324.037.636.05.973.05a8.07 8.07 0 0 0 5.001-1.721 4.036 4.036 0 0 1-3.767-2.793c.249.037.499.062.761.062.361 0 .724-.05 1.061-.137a4.027 4.027 0 0 1-3.23-3.953v-.05c.537.299 1.16.486 1.82.511a4.022 4.022 0 0 1-1.796-3.354c0-.748.199-1.434.548-2.032a11.457 11.457 0 0 0 8.306 4.215c-.062-.3-.1-.611-.1-.923a4.026 4.026 0 0 1 4.028-4.028c1.16 0 2.207.486 2.943 1.272a7.957 7.957 0 0 0 2.556-.973 4.02 4.02 0 0 1-1.771 2.22 8.073 8.073 0 0 0 2.319-.624 8.645 8.645 0 0 1-2.019 2.083z"
                                ></path>
                            </svg>
                        </a>
                    </div>
                    <blockquote className="mt-5">
                        <p className="text-base text-gray-800">
                            My new site is so much faster and easier to work with than my old site. I just choose the page, make the change and click save.
                            <span className="block text-sky-500">#Celebration</span>
                        </p>
                    </blockquote>
                </div>
            </div>
        </div>
    </div>
</section>

{/* FAQ */}
{/* <section className="py-10 bg-gray-50 sm:py-16 lg:py-24">
    <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">Frequently Asked Questions</h2>
            <p className="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-600">Amet minim mollit non deserunt ullamco est sit aliqua dolor do</p>
        </div>

        <div className="max-w-3xl mx-auto mt-8 space-y-4 md:mt-16">
            <div className="transition-all duration-200 bg-white border border-gray-200 shadow-lg cursor-pointer hover:bg-gray-50">
                <button type="button" className="flex items-center justify-between w-full px-4 py-5 sm:p-6">
                    <span className="flex text-lg font-semibold text-black"> How to create an account? </span>

                    <svg className="w-6 h-6 text-gray-400 rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                <div className="px-4 pb-5 sm:px-6 sm:pb-6">
                    <p>Amet minim mollit non deserunt ullamco est sit <a href="#" title="" className="text-blue-600 transition-all duration-200 hover:underline">aliqua dolor</a> do amet sint. Velit officia consequat duis enim velit mollit.</p>
                </div>
            </div>

            <div className="transition-all duration-200 bg-white border border-gray-200 cursor-pointer hover:bg-gray-50">
                <button type="button" className="flex items-center justify-between w-full px-4 py-5 sm:p-6">
                    <span className="flex text-lg font-semibold text-black"> How can I make payment using Paypal? </span>

                    <svg className="w-6 h-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                <div className="hidden px-4 pb-5 sm:px-6 sm:pb-6">
                    <p>Amet minim mollit non deserunt ullamco est sit <a href="#" title="" className="text-blue-600 transition-all duration-200 hover:underline">aliqua dolor</a> do amet sint. Velit officia consequat duis enim velit mollit.</p>
                </div>
            </div>

            <div className="transition-all duration-200 bg-white border border-gray-200 cursor-pointer hover:bg-gray-50">
                <div className="">
                    <button type="button" className="flex items-center justify-between w-full px-4 py-5 sm:p-6">
                        <span className="flex text-lg font-semibold text-black"> Can I cancel my plan? </span>

                        <svg className="w-6 h-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    <div className="hidden px-4 pb-5 sm:px-6 sm:pb-6">
                        <p>Amet minim mollit non deserunt ullamco est sit <a href="#" title="" className="text-blue-600 transition-all duration-200 hover:underline">aliqua dolor</a> do amet sint. Velit officia consequat duis enim velit mollit.</p>
                    </div>
                </div>
            </div>

            <div className="transition-all duration-200 bg-white border border-gray-200 cursor-pointer hover:bg-gray-50">
                <button type="button" className="flex items-center justify-between w-full px-4 py-5 sm:p-6">
                    <span className="flex text-lg font-semibold text-black"> How can I reach to support? </span>

                    <svg className="w-6 h-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                <div className="hidden px-4 pb-5 sm:px-6 sm:pb-6">
                    <p>Amet minim mollit non deserunt ullamco est sit <a href="#" title="" className="text-blue-600 transition-all duration-200 hover:underline">aliqua dolor</a> do amet sint. Velit officia consequat duis enim velit mollit.</p>
                </div>
            </div>
        </div>

        <p className="text-center text-gray-600 textbase mt-9">Didn’t find the answer you are looking for? <a href="#" title="" className="font-medium text-blue-600 transition-all duration-200 hover:text-blue-700 focus:text-blue-700 hover:underline">Contact our support</a></p>
    </div>
</section> */}

<section className="py-10 bg-gray-50 sm:pt-16 lg:pt-24">
    <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-2 md:col-span-3 lg:grid-cols-6 gap-y-16 gap-x-12">
            <div className="col-span-2 md:col-span-3 lg:col-span-2 lg:pr-8">
                <img className="w-auto h-9" src="https://cdn.rareblocks.xyz/collection/celebration/images/logo.svg" alt="" />

                <p className="text-base leading-relaxed text-gray-600 mt-7">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.</p>

                <ul className="flex items-center space-x-3 mt-9">
                    <li>
                        <a href="#" title="" className="flex items-center justify-center text-white transition-all duration-200 bg-gray-800 rounded-full w-7 h-7 hover:bg-blue-600 focus:bg-blue-600">
                            <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path
                                    d="M19.633 7.997c.013.175.013.349.013.523 0 5.325-4.053 11.461-11.46 11.461-2.282 0-4.402-.661-6.186-1.809.324.037.636.05.973.05a8.07 8.07 0 0 0 5.001-1.721 4.036 4.036 0 0 1-3.767-2.793c.249.037.499.062.761.062.361 0 .724-.05 1.061-.137a4.027 4.027 0 0 1-3.23-3.953v-.05c.537.299 1.16.486 1.82.511a4.022 4.022 0 0 1-1.796-3.354c0-.748.199-1.434.548-2.032a11.457 11.457 0 0 0 8.306 4.215c-.062-.3-.1-.611-.1-.923a4.026 4.026 0 0 1 4.028-4.028c1.16 0 2.207.486 2.943 1.272a7.957 7.957 0 0 0 2.556-.973 4.02 4.02 0 0 1-1.771 2.22 8.073 8.073 0 0 0 2.319-.624 8.645 8.645 0 0 1-2.019 2.083z"
                                ></path>
                            </svg>
                        </a>
                    </li>

                    <li>
                        <a href="#" title="" className="flex items-center justify-center text-white transition-all duration-200 bg-gray-800 rounded-full w-7 h-7 hover:bg-blue-600 focus:bg-blue-600">
                            <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z"></path>
                            </svg>
                        </a>
                    </li>

                    <li>
                        <a href="#" title="" className="flex items-center justify-center text-white transition-all duration-200 bg-gray-800 rounded-full w-7 h-7 hover:bg-blue-600 focus:bg-blue-600">
                            <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M11.999 7.377a4.623 4.623 0 1 0 0 9.248 4.623 4.623 0 0 0 0-9.248zm0 7.627a3.004 3.004 0 1 1 0-6.008 3.004 3.004 0 0 1 0 6.008z"></path>
                                <circle cx="16.806" cy="7.207" r="1.078"></circle>
                                <path
                                    d="M20.533 6.111A4.605 4.605 0 0 0 17.9 3.479a6.606 6.606 0 0 0-2.186-.42c-.963-.042-1.268-.054-3.71-.054s-2.755 0-3.71.054a6.554 6.554 0 0 0-2.184.42 4.6 4.6 0 0 0-2.633 2.632 6.585 6.585 0 0 0-.419 2.186c-.043.962-.056 1.267-.056 3.71 0 2.442 0 2.753.056 3.71.015.748.156 1.486.419 2.187a4.61 4.61 0 0 0 2.634 2.632 6.584 6.584 0 0 0 2.185.45c.963.042 1.268.055 3.71.055s2.755 0 3.71-.055a6.615 6.615 0 0 0 2.186-.419 4.613 4.613 0 0 0 2.633-2.633c.263-.7.404-1.438.419-2.186.043-.962.056-1.267.056-3.71s0-2.753-.056-3.71a6.581 6.581 0 0 0-.421-2.217zm-1.218 9.532a5.043 5.043 0 0 1-.311 1.688 2.987 2.987 0 0 1-1.712 1.711 4.985 4.985 0 0 1-1.67.311c-.95.044-1.218.055-3.654.055-2.438 0-2.687 0-3.655-.055a4.96 4.96 0 0 1-1.669-.311 2.985 2.985 0 0 1-1.719-1.711 5.08 5.08 0 0 1-.311-1.669c-.043-.95-.053-1.218-.053-3.654 0-2.437 0-2.686.053-3.655a5.038 5.038 0 0 1 .311-1.687c.305-.789.93-1.41 1.719-1.712a5.01 5.01 0 0 1 1.669-.311c.951-.043 1.218-.055 3.655-.055s2.687 0 3.654.055a4.96 4.96 0 0 1 1.67.311 2.991 2.991 0 0 1 1.712 1.712 5.08 5.08 0 0 1 .311 1.669c.043.951.054 1.218.054 3.655 0 2.436 0 2.698-.043 3.654h-.011z"
                                ></path>
                            </svg>
                        </a>
                    </li>

                    <li>
                        <a href="#" title="" className="flex items-center justify-center text-white transition-all duration-200 bg-gray-800 rounded-full w-7 h-7 hover:bg-blue-600 focus:bg-blue-600">
                            <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path
                                    d="M12.026 2c-5.509 0-9.974 4.465-9.974 9.974 0 4.406 2.857 8.145 6.821 9.465.499.09.679-.217.679-.481 0-.237-.008-.865-.011-1.696-2.775.602-3.361-1.338-3.361-1.338-.452-1.152-1.107-1.459-1.107-1.459-.905-.619.069-.605.069-.605 1.002.07 1.527 1.028 1.527 1.028.89 1.524 2.336 1.084 2.902.829.091-.645.351-1.085.635-1.334-2.214-.251-4.542-1.107-4.542-4.93 0-1.087.389-1.979 1.024-2.675-.101-.253-.446-1.268.099-2.64 0 0 .837-.269 2.742 1.021a9.582 9.582 0 0 1 2.496-.336 9.554 9.554 0 0 1 2.496.336c1.906-1.291 2.742-1.021 2.742-1.021.545 1.372.203 2.387.099 2.64.64.696 1.024 1.587 1.024 2.675 0 3.833-2.33 4.675-4.552 4.922.355.308.675.916.675 1.846 0 1.334-.012 2.41-.012 2.737 0 .267.178.577.687.479C19.146 20.115 22 16.379 22 11.974 22 6.465 17.535 2 12.026 2z"
                                ></path>
                            </svg>
                        </a>
                    </li>
                </ul>
            </div>

            <div>
                <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase">Company</p>

                <ul className="mt-6 space-y-4">
                    <li>
                        <a href="#" title="" className="flex text-base text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"> About </a>
                    </li>

                    <li>
                        <a href="#" title="" className="flex text-base text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"> Features </a>
                    </li>

                    <li>
                        <a href="#" title="" className="flex text-base text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"> Works </a>
                    </li>

                    <li>
                        <a href="#" title="" className="flex text-base text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"> Career </a>
                    </li>
                </ul>
            </div>

            <div>
                <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase">Help</p>

                <ul className="mt-6 space-y-4">
                    <li>
                        <a href="#" title="" className="flex text-base text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"> Customer Support </a>
                    </li>

                    <li>
                        <a href="#" title="" className="flex text-base text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"> Delivery Details </a>
                    </li>

                    <li>
                        <a href="#" title="" className="flex text-base text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"> Terms & Conditions </a>
                    </li>

                    <li>
                        <a href="#" title="" className="flex text-base text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"> Privacy Policy </a>
                    </li>
                </ul>
            </div>

           
        </div>

        <hr className="mt-16 mb-10 border-gray-200" />

        <p className="text-sm text-center text-gray-600">© Copyright 2021, All Rights Reserved by Postcraft</p>
    </div>
</section>


    </>

  );
}
