"use client";

import { SWRConfig } from "swr";
import fetcherCBFunction from "../utils/fetcher";

import NavBar from "./navbar";
import Header from "./header";
import Footer from "./footer";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SWRConfig value={{ fetcher: fetcherCBFunction }}>
      <div className="flex flex-col min-h-screen max-w-md m-auto items-center justify-center">
        <Header />
        <NavBar />
        <main className="w-full p-5 bg-slate-800 rounded-lg my-2">{children}</main>
        <Footer />
      </div>
    </SWRConfig>
  );
}
