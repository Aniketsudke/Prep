import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="border-t bg-background px-4 py-6 md:px-6">
      <div className="container mx-auto flex flex-col items-center gap-4 md:flex-row md:justify-between">
        <div className="text-center md:text-left">
          <h2 className="text-lg font-semibold">Prep Arena</h2>
          <p className="text-sm text-muted-foreground">
            ©{new Date().getFullYear()} Prep Arena. All rights reserved.
          </p>
        </div>

        <div className=" text-center flex space-x-4 mt-4 md:mt-0">
          <Link
            href="#"
            className="text-muted-foreground hover:text-foreground"
          >
            Help Center
          </Link>
          <Link
            href="/contribute"
            className="text-muted-foreground hover:text-foreground"
          >
            Contribute Question
          </Link>
          <Link
            href="#"
            className="text-muted-foreground hover:text-foreground"
          >
            Terms
          </Link>
          <Link
            href="#"
            className="text-muted-foreground hover:text-foreground"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;