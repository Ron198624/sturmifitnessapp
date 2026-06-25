"use client"

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

    const { error } = await supabase.from("training_entries").insert({
      Datum: new Date().toISOString().split("T")[0],
      Uebung: exercise,
      Gewicht: Number(weight),
      Wiederholungen: Number(reps),
      Saetze: Number(sets),
      Volumen: volumen
    });

    if (error) {
      alert("Fehler beim Speichern");
      console.log(error);
    } else {
      alert("Training gespeichert");
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
          <option>Brustpresse</option>
          <option>Butterfly</option>
          <option>Liegestütze</option>

          {/* Rücken */}
          <option>Rudermaschine</option>
          <option>Latzug</option>
          <option>Klimmzüge</option>
          <option value="Rückenstrecker">Rückenstrecker</option>

          {/* Trizeps */}
          <option>Trizeps Maschine</option>

          {/* Bizeps */}
          <option>Bizepscurl</option>

          {/* Schultern */}
          <option>Reverse Butterfly</option>

          {/* Beine */}
          <option>Beinpresse</option>

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