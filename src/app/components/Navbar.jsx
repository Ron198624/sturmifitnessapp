
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

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

  const navLinkClass =
    "px-6 py-3 rounded-2xl !text-white font-bold text-2xl transition-all duration-300 hover:!text-[#00ff9d] hover:bg-gray-900 hover:shadow-[0_0_15px_rgba(0,255,157,0.4)]";

  return (
    <nav className="w-full flex justify-center px-4">
      <div className="flex flex-wrap items-center justify-center gap-10 bg-black/70 backdrop-blur-xl border border-gray-700 rounded-3xl px-10 py-5 shadow-[0_0_25px_rgba(0,255,157,0.25)]">
        
        <Link href="/" className={navLinkClass}>
          🏠 Home
        </Link>

        <Link href="/training" className={navLinkClass}>
          🏋️ Training
        </Link>

        <Link href="/cardio" className={navLinkClass}>
          ❤️ Cardio
        </Link>

        <Link href="/analyse" className={navLinkClass}>
          📊 Analyse
        </Link>

        <Link href="/verlauf" className={navLinkClass}>
          📅 Verlauf
        </Link>

        {user ? (
          <button
            onClick={logout}
            className="px-8 py-4 rounded-2xl border border-red-500 text-red-400 font-semibold transition-all duration-300 hover:bg-red-500 hover:text-white hover:shadow-[0_0_15px_rgba(239,68,68,0.8)]"
          >
            Logout
          </button>
        ) : (
          <>
            <Link href="/login" className={navLinkClass}>
              Login
            </Link>

            <Link href="/signup" className={navLinkClass}>
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
