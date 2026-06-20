"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

// Heroicons (FILLED)
import {
  HomeIcon,
  ChartBarIcon,
  HeartIcon,
  ClockIcon,
  FireIcon,
} from "@heroicons/react/24/solid";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function Navbar() {
  const pathname = usePathname();
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
  }, []);

  async function logout() {
    await supabase.auth.signOut();
    window.location.reload();
  }

  const navItems = [
    { href: "/", label: "Home", icon: HomeIcon },
    { href: "/training", label: "Training", icon: FireIcon },
    { href: "/cardio", label: "Cardio", icon: HeartIcon },
    { href: "/analyse", label: "Analyse", icon: ChartBarIcon },
    { href: "/verlauf", label: "Verlauf", icon: ClockIcon },
  ];

  return (
  <nav className="fixed bottom-0 left-0 w-full bg-red-600 border-t border-gray-700 py-2 flex justify-around z-50">
      {navItems.map((item) => {
        const Icon = item.icon;
        const active = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            className="flex flex-col items-center text-xs"
          >
            <Icon
              className={`h-7 w-7 ${
                active ? "text-purple-400" : "text-neon-green"
              }`}
            />
            <span
              className={`mt-1 ${
                active ? "text-purple-400" : "text-neon-green"
              }`}
            >
              {item.label}
            </span>
          </Link>
        );
      })}

      {user && (
        <button
          onClick={logout}
          className="flex flex-col items-center text-xs text-red-400"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M16 17v-1a4 4 0 00-8 0v1H5v2h14v-2h-3zM12 3a5 5 0 00-5 5v2h2V8a3 3 0 016 0v2h2V8a5 5 0 00-5-5z" />
          </svg>
          <span className="mt-1">Logout</span>
        </button>
      )}
    </nav>
  );
}