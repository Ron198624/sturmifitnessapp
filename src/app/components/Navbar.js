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

  return (
    <nav className="
      w-full 
      bg-black/80 
      backdrop-blur-md 
      border-b border-gray-700 
      shadow-[0_0_20px_rgba(0,255,150,0.15)]
      flex justify-center gap-6 py-4
      text-lg font-semibold text-[#00ff9d]
      z-50
    ">
      <Link href="/" className="hover:text-purple-400">Home</Link>
      <Link href="/training" className="hover:text-purple-400">Training</Link>
      <Link href="/cardio" className="hover:text-purple-400">Cardio</Link>
      <Link href="/analyse" className="hover:text-purple-400">Analyse</Link>
      <Link href="/verlauf" className="hover:text-purple-400">Verlauf</Link>

      {user ? (
        <button
          onClick={logout}
          className="ml-2 px-3 py-1 bg-purple-600 rounded hover:bg-purple-700"
        >
          Logout
        </button>
      ) : (
        <>
          <Link href="/login" className="hover:text-purple-400">Login</Link>
          <Link href="/signup" className="hover:text-purple-400">Signup</Link>
        </>
      )}
    </nav>
  );
}