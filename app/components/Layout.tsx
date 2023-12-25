import React from "react";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="flex-1 mt-4">{children}</main>
      <Footer />
    </div>
  );
}
