// import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen justify-center items-center">
      <div className="flex flex-col gap-2 p-5 max-w-xs w-full dark:bg-slate-800 bg-slate-300">
        <div className="text-center my-4">
          <h1>sxrings - xwitter clone</h1>
        </div>
        <div>
          <Link
            href="/signin"
            className="dark:bg-slate-900 bg-slate-400 my-4 p-3 rounded-lg block"
          >
            Sign In
          </Link>
        </div>
        <div>
          <Link
            href="/signup"
            className="dark:bg-slate-900 bg-slate-400 my-4 p-3 rounded-lg block"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </main>
  );
}
