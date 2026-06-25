"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function CardioPage() {
  const [art, setArt] = useState("");
  const [distanz, setDistanz] = useState("");
  const [dauer, setDauer] = useState("");

  async function saveCardio() {
    const { error } = await supabase.from("cardio").insert({
      art,
      distanz,
      dauer,
      created_at: new Date(),
    });

    if (error) {
      alert("Fehler beim Speichern");
      console.log(error);
    } else {
      alert("Cardio gespeichert");
      setArt("");
      setDistanz("");
      setDauer("");
    }
  }

  return (
    <div className="w-full min-h-screen bg-black flex flex-col items-center px-4 pb-24">

      <div className="bg-black backdrop-blur-xl border border-gray-700 rounded-2xl p-8 
                      shadow-[0_0_25px_rgba(0,255,150,0.25)] w-full max-w-2xl mt-10 text-center">
        <h1 className="text-4xl font-extrabold text-[#00ff9d]">Cardio</h1>
      </div>

      <div className="bg-black backdrop-blur-xl border border-gray-700 rounded-2xl p-8 
                      shadow-[0_0_25px_rgba(0,255,150,0.25)] w-full max-w-2xl mt-10">

        <label className="text-xl text-white">Art</label>
        <select
          value={art}
          onChange={(e) => setArt(e.target.value)}
          className="w-full h-16 px-5 text-xl rounded-2xl bg-gray-900 border border-gray-700 
                     text-white mt-2 mb-6"
        >
          <option value="">Bitte wählen...</option>
          <option>Laufen</option>
          <option>Radfahren</option>
          <option>Schwimmen</option>
        </select>

        <label className="text-xl text-white">Distanz</label>
        <input
          type="number"
          value={distanz}
          onChange={(e) => setDistanz(e.target.value)}
          className="w-full h-16 px-5 text-xl rounded-2xl bg-gray-900 border border-gray-700 
                     text-white mt-2 mb-6"
          placeholder="in km oder m"
        />

        <label className="text-xl text-white">Dauer (Minuten)</label>
        <input
          type="number"
          value={dauer}
          onChange={(e) => setDauer(e.target.value)}
          className="w-full h-16 px-5 text-xl rounded-2xl bg-gray-900 border border-gray-700 
                     text-white mt-2 mb-6"
        />

        <button
          onClick={saveCardio}
          className="w-full h-16 text-2xl font-bold rounded-2xl bg-[#00ff9d] text-black 
                     shadow-[0_0_20px_rgba(0,255,150,0.6)] hover:bg-purple-500 hover:text-white 
                     transition"
        >
          Speichern
        </button>

      </div>

    </div>
  );
}