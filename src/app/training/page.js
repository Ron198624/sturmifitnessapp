"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { muscleMap } from "../muscleMap";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function TrainingPage() {
  const [exercise, setExercise] = useState("");
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");
  const [sets, setSets] = useState("");

  async function saveTraining() {
    const volumen = Number(weight) * Number(reps) * Number(sets);

    // USER LADEN
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      alert("Kein Benutzer eingeloggt");
      return;
    }

    // MUSCLE MAP INDEX
    const muscleIndex = muscleMap[exercise] ?? null;

    // EINTRAG SPEICHERN
    const { error } = await supabase.from("training_entries").insert({
      user_id: user.id,                 // ← ENTSCHEIDEND!
      Uebung: exercise,
      Gewicht: Number(weight),
      Wiederholungen: Number(reps),
      Saetze: Number(sets),
      Volumen: volumen,
      muscle_index: muscleIndex,        // ← ENTSCHEIDEND!
      Datum: new Date().toISOString().split("T")[0],
    });

    if (error) {
      alert("Fehler beim Speichern");
      console.log(error);
    } else {
      alert("Training gespeichert!");
      setExercise("");
      setWeight("");
      setReps("");
      setSets("");
    }
  }

  return (
    <div className="w-full px-4 pb-24 flex flex-col items-center min-h-screen">

      <div className="bg-black backdrop-blur-xl border border-gray-700 rounded-2xl p-8 
                      shadow-[0_0_25px_rgba(0,255,150,0.25)] w-full max-w-2xl mt-10 text-center">
        <h1 className="text-4xl font-extrabold text-[#00ff9d]">Training</h1>
      </div>

      <div className="bg-black backdrop-blur-xl border border-gray-700 rounded-2xl p-8 
                      shadow-[0_0_25px_rgba(0,255,150,0.25)] w-full max-w-2xl mt-10">

        <label className="text-xl text-white">Übung</label>
        <select
          value={exercise}
          onChange={(e) => setExercise(e.target.value)}
          className="w-full h-16 px-5 text-xl rounded-2xl bg-gray-900 border border-gray-700 
                     text-white mt-2 mb-6"
        >
          <option value="">Bitte wählen...</option>

          {/* Brust */}
          <option value="Brustpresse">Brustpresse</option>
          <option value="Butterfly">Butterfly</option>
          <option value="Liegestütze">Liegestütze</option>

          {/* Rücken */}
          <option value="Rudermaschine">Rudermaschine</option>
          <option value="Latzug">Latzug</option>
          <option value="Klimmzüge">Klimmzüge</option>
          <option value="Rückenstrecker">Rückenstrecker</option>

          {/* Trizeps */}
          <option value="Trizeps Maschine">Trizeps Maschine</option>

          {/* Bizeps */}
          <option value="Bizepscurl">Bizepscurl</option>

          {/* Schultern */}
          <option value="Reverse Butterfly">Reverse Butterfly</option>

          {/* Beine */}
          <option value="Beinpresse">Beinpresse</option>

          {/* Home‑Gym */}
          <option value="Hantelbank">Hantelbank</option>
        </select>

        <label className="text-xl text-white">Gewicht (kg)</label>
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className="w-full h-16 px-5 text-xl rounded-2xl bg-gray-900 border border-gray-700 
                     text-white mt-2 mb-6"
        />

        <label className="text-xl text-white">Wiederholungen</label>
        <input
          type="number"
          value={reps}
          onChange={(e) => setReps(e.target.value)}
          className="w-full h-16 px-5 text-xl rounded-2xl bg-gray-900 border border-gray-700 
                     text-white mt-2 mb-6"
        />

        <label className="text-xl text-white">Sätze</label>
        <input
          type="number"
          value={sets}
          onChange={(e) => setSets(e.target.value)}
          className="w-full h-16 px-5 text-xl rounded-2xl bg-gray-900 border border-gray-700 
                     text-white mt-2 mb-6"
        />

        <button
          onClick={saveTraining}
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
