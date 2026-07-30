"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { muscleMap } from "../muscleMap";

export default function CardioPage() {
  const [art, setArt] = useState("");
  const [distanz, setDistanz] = useState("");
  const [dauer, setDauer] = useState("");

  async function saveCardio() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Kein Benutzer eingeloggt");
      return;
    }

    // Cardio-Volumen: Distanz × Dauer
    const cardioVolume = Number(distanz) * Number(dauer);

    // Muskelgruppen aus muscleMap
    const muscles = muscleMap[art] ?? [];

    const { error } = await supabase.from("cardio_entries").insert({
      user_id: user.id,
      exercise_type: art,
      distance_m: Number(distanz),
      duration_min: Number(dauer),
      volume: cardioVolume,
      muscles: muscles, // JSON array
      date: new Date().toISOString(),
    });

    if (error) {
      alert("Fehler beim Speichern");
      console.log(error);
    } else {
      alert("Cardio gespeichert!");
      setArt("");
      setDistanz("");
      setDauer("");
    }
  }

  return (
    <div className="w-full min-h-screen bg-black flex flex-col items-center px-4 pb-24">
      {/* HEADER */}
      <div className="bg-black backdrop-blur-xl border border-gray-700 rounded-2xl p-8 
                      shadow-[0_0_25px_rgba(0,255,150,0.25)] w-full max-w-2xl mt-10 text-center">
        <h1 className="text-4xl font-extrabold text-[#00ff9d]">Cardio</h1>
      </div>

      {/* FORM */}
      <div className="bg-black backdrop-blur-xl border border-gray-700 rounded-2xl p-8 
                      shadow-[0_0_25px_rgba(0,255,150,0.25)] w-full max-w-2xl mt-10">

        {/* ART */}
        <label className="text-xl text-white">Art</label>
        <select
          value={art}
          onChange={(e) => setArt(e.target.value)}
          className="w-full h-16 px-5 text-xl rounded-2xl bg-gray-900 border border-gray-700 text-white mt-2 mb-6"
        >
          <option value="">Bitte wählen...</option>
          <option value="laufen">Laufen</option>
          <option value="radfahren">Radfahren</option>
          <option value="schwimmen">Schwimmen</option>
        </select>

        {/* DISTANZ */}
        <label className="text-xl text-white">Distanz</label>
        <input
          type="number"
          value={distanz}
          onChange={(e) => setDistanz(e.target.value)}
          className="w-full h-16 px-5 text-xl rounded-2xl bg-gray-900 border border-gray-700 text-white mt-2 mb-6"
          placeholder="in km oder m"
        />

        {/* DAUER */}
        <label className="text-xl text-white">Dauer (Minuten)</label>
        <input
          type="number"
          value={dauer}
          onChange={(e) => setDauer(e.target.value)}
          className="w-full h-16 px-5 text-xl rounded-2xl bg-gray-900 border border-gray-700 text-white mt-2 mb-6"
        />

        {/* BUTTON */}
        <button
          onClick={saveCardio}
          className="w-full h-16 text-2xl font-bold rounded-2xl bg-[#00ff9d] text-black 
                     shadow-[0_0_20px_rgba(0,255,150,0.6)] hover:bg-purple-500 hover:text-white transition"
        >
          Speichern
        </button>
      </div>
    </div>
  );
}