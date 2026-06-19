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
    <nav style={{ padding: 10, background: "#222", color: "white" }}>
      <Link href="/">Home</Link> |{" "}
      <Link href="/training">Training</Link> |{" "}
      <Link href="/cardio">Cardio</Link> |{" "}
      <Link href="/analyse">Analyse</Link> |{" "}
      <Link href="/verlauf">Verlauf</Link> |{" "}

      {user ? (
        <button onClick={logout} style={{ marginLeft: 10 }}>
          Logout
        </button>
      ) : (
        <>
          <Link href="/login">Login</Link> |{" "}
          <Link href="/signup">Signup</Link>
        </>
      )}
    </nav>
  );
}