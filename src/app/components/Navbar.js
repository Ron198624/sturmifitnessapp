// src/app/components/Navbar.js

"use client";

import Link from "next/link";

export default function Navbar() {
  const navBtn =
    "px-4 py-2 rounded-xl bg-gray-900 border border-gray-700 text-white text-lg shadow-[0_0_12px_rgba(0,255,150,0.25)] hover:border-purple-500 hover:text-purple-400 transition";

  return (
    <nav
      className="
        w-full 
        bg-black/90 
        backdrop-blur-xl 
        border-b border-gray-700 
        shadow-[0_0_20px_rgba(0,255,150,0.15)]
        flex flex-wrap justify-center gap-4 py-4
        z-50
      "
    >
      <Link href="/" className={navBtn}>Home</Link>
      <Link href="/training" className={navBtn}>Training</Link>
      <Link href="/cardio" className={navBtn}>Cardio</Link>
      <Link href="/analyse" className={navBtn}>Analyse</Link>
      <Link href="/verlauf" className={navBtn}>Verlauf</Link>
    </nav>
  );
}