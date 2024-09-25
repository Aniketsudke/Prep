import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import React from "react";

export default function ContributionBanner() {
  return (
    <Card
      className=" p-6   mx-auto bg-blue-300 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 border border-gray-100 w-full"
      style={{
        backgroundImage: `url('/contributeBanner.png')`, // Replace with your image path
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="text-center text-white ">
        <h2 className="text-2xl font-semibold">Contribute to the community</h2>
        <p className="text-lg font-normal">
          Share your knowledge and help others
        </p>
        <Button className="bg-white text-gray-500 px-4 py-2 rounded-md mt-4 hover:bg-slate-200">
          <Link href={"/contribute"}> Contribute Now</Link>
        </Button>
      </div>
    </Card>
  );
}
