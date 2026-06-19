"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function SignupPage() {
  const router = useRouter();
  const [message, setMessage] = useState("");

  async function handleSignup(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    const email = formData.get("email");
    const password = formData.get("password");

    const { error } = await supabase.auth.signUp({
      email,
      password
    });

    if (error) {
      setMessage("Registrierung fehlgeschlagen");
    } else {
      setMessage("Account erstellt! Bitte einloggen.");
      router.push("/login");
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Registrieren</h1>

      <form onSubmit={handleSignup}>
        <div>
          <label>Email:</label>
          <input type="email" name="email" required />
        </div>

        <div>
          <label>Passwort:</label>
          <input type="password" name="password" required />
        </div>

        <button type="submit">Registrieren</button>
      </form>

      <p>{message}</p>
    </div>
  );
}