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
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });
  }, []);

  async function logout() {
    await supabase.auth.signOut();
    window.location.href = "/login";
  }

  return (
    <nav className="w-full bg-black/90 backdrop-blur-xl border-b border-gray-700 py-5">
      <ul className="flex justify-center gap-12 text-2xl font-semibold max-w-4xl mx-auto">

        <li><Link href="/" className="text-white hover:text-[#00ff9d] transition">Home</Link></li>
        <li><Link href="/training" className="text-white hover:text-[#00ff9d] transition">Training</Link></li>
        <li><Link href="/cardio" className="text-white hover:text-[#00ff9d] transition">Cardio</Link></li>
        <li><Link href="/analyse" className="text-white hover:text-[#00ff9d] transition">Analyse</Link></li>
        <li><Link href="/verlauf" className="text-white hover:text-[#00ff9d] transition">Verlauf</Link></li>

        {/* LOGIN / LOGOUT */}
        {user ? (
          <li>
            <button
              onClick={logout}
              className="text-red-400 hover:text-red-300 transition"
            >
              Logout
            </button>
          </li>
        ) : (
          <>
            <li><Link href="/login" className="text-white hover:text-[#00ff9d] transition">Login</Link></li>
            <li><Link href="/signup" className="text-white hover:text-[#00ff9d] transition">Signup</Link></li>
          </>
        )}

      </ul>
    </nav>
  );
}