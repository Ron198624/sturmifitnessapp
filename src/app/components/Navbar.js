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

  const base =
    "px-4 py-2 rounded-lg border border-gray-700 bg-gray-900 text-neon-green transition shadow-[0_0_8px_rgba(0,255,0,0.3)] hover:shadow-[0_0_12px_rgba(168,85,247,0.8)] hover:border-purple-500 hover:text-purple-400";

  return (
    <nav className="w-full flex flex-wrap justify-center gap-3 mt-2">

      <Link href="/" className={base}>Home</Link>
      <Link href="/training" className={base}>Training</Link>
      <Link href="/cardio" className={base}>Cardio</Link>
      <Link href="/analyse" className={base}>Analyse</Link>
      <Link href="/verlauf" className={base}>Verlauf</Link>

      {user && (
        <button
          onClick={logout}
          className="px-4 py-2 rounded-lg border border-red-700 bg-gray-900 text-red-400 transition shadow-[0_0_8px_rgba(255,0,0,0.3)] hover:shadow-[0_0_12px_rgba(255,0,0,0.8)] hover:border-red-500"
        >
          Logout
        </button>
      )}

      {!user && (
        <>
          <Link href="/login" className={base}>Login</Link>
          <Link href="/signup" className={base}>Signup</Link>
        </>
      )}

    </nav>
  );
}