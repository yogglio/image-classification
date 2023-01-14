"use client";
import { Inter } from "@next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className="max-w-lg mx-auto">
      <Link href="/camera">Camera</Link>
    </main>
  );
}
