"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";



export default function LoginPage() {
  const router = useRouter();
  const [message, setMessage] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    const email = formData.get("email");
    const password = formData.get("password");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      setMessage("Login fehlgeschlagen");
    } else {
      router.push("/");
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Login</h1>

      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input type="email" name="email" required />
        </div>

        <div>
          <label>Passwort:</label>
          <input type="password" name="password" required />
        </div>

        <button type="submit">Einloggen</button>
      </form>

      <p>{message}</p>
    </div>
  );
}