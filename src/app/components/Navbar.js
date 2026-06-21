// src/app/components/Navbar.js

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
  }, []);

  async function logout() {
    await supabase.auth.signOut();
    window.location.reload();
  }

  const navBtn =
    "px-4 py-2 rounded-xl bg-gray-900 border border-gray-700 text-white text-lg shadow-[0_0_12px_rgba(0,255,150,0.25)] hover:border-purple-500 hover:text-purple-400 transition";

  return (
    <nav
      className="
        w-full 
        bg-black/85 
        backdrop-blur-md 
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

      {user ? (
        <button
          onClick={logout}
          className="px-4 py-2 rounded-xl bg-red-600 text-white text-lg shadow hover:bg-red-700 transition"
        >
          Logout
        </button>
      ) : (
        <>
          <Link href="/login" className={navBtn}>Login</Link>
          <Link href="/signup" className={navBtn}>Signup</Link>
        </>
      )}
    </nav>
  );
}