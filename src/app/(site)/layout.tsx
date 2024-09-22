import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ClientSessionProvider from "@/context/ClientSessionProvider";
import QueryProvider from "@/context/QueryContext";
import { Toaster } from "@/components/ui/toaster";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <ClientSessionProvider>
      <QueryProvider>
        <div className="m-0 p-0 overflow-x-hidden min-h-screen flex flex-col">
          <Navbar />
          {children}
          <Toaster />
          <Footer />
        </div>
        </QueryProvider>
    </ClientSessionProvider>
  );
};

export default Layout;