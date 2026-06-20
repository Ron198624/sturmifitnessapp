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

  // FETTE, BREITE, LUFTIGE KACHELN
  const base =
    "min-w-[180px] px-8 py-5 text-xl font-bold rounded-2xl border border-gray-700 bg-gray-900 text-neon-green " +
    "transition shadow-[0_0_16px_rgba(0,255,0,0.5)] " +
    "hover:shadow-[0_0_28px_rgba(168,85,247,1)] hover:border-purple-500 hover:text-purple-400";

  return (
    <nav className="w-full flex flex-wrap justify-center gap-6 mt-6">

      <Link href="/" className={base}>Home</Link>
      <Link href="/training" className={base}>Training</Link>
      <Link href="/cardio" className={base}>Cardio</Link>
      <Link href="/analyse" className={base}>Analyse</Link>
      <Link href="/verlauf" className={base}>Verlauf</Link>

      {user ? (
        <button
          onClick={logout}
          className="min-w-[180px] px-8 py-5 text-xl font-bold rounded-2xl border border-red-700 bg-gray-900 text-red-400 transition shadow-[0_0_16px_rgba(255,0,0,0.5)] hover:shadow-[0_0_28px_rgba(255,0,0,1)] hover:border-red-500"
        >
          Logout
        </button>
      ) : (
        <>
          <Link href="/login" className={base}>Login</Link>
          <Link href="/signup" className={base}>Signup</Link>
        </>
      )}

    </nav>
  );
}