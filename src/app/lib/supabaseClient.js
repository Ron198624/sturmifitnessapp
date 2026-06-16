"use client";

import { createClient } from "@supabase/supabase-js";

let client = null;

export function getSupabaseClient() {
  if (!client) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!url || !key) {
      console.error("Supabase ENV fehlt:", { url, key });
    }

    client = createClient(url, key);
  }

  return client;
}