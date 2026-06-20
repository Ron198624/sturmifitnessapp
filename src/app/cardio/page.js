"use client";

import { useState } from "react";
import { supabase } from "@/utils/supabaseClient";

export default function CardioPage() {
  const [exerciseType, setExerciseType] = useState("");
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    // Distanz in Meter speichern
    const distance_m =
      exerciseType === "schwimmen"
        ? Number(distance) // Meter
        : Number(distance) * 1000; // km → m

    const { error } = await supabase.from("cardio_entries").insert([
      {
        exercise_type: exerciseType,
        distance_m: distance_m,
        duration_min: Number(duration),
        date: new Date().toISOString(),
      },
    ]);

    if (error) {
      setMessage("Fehler beim Speichern");
      return;
    }

    setMessage("Cardio-Eintrag gespeichert!");
    setExerciseType("");
    setDistance("");
    setDuration("");
  }

  return (
    <div className="p-6 text-white mt-6 pb-24">
      <h1 className="text-3xl font-bold mb-6 text-center">Cardio</h1>

      {message && (
        <div className="text-center mb-4 text-purple-400">{message}</div>
      )}

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 bg-gray-900 p-4 rounded-lg"
      >
        {/* Art */}
        <div className="flex flex-col">
          <label className="mb-1 text-neon-green">Art</label>
          <select
            value={exerciseType}
            onChange={(e) => setExerciseType(e.target.value)}
            className="p-2 rounded bg-black border border-gray-700"
            required
          >
            <option value="">Bitte wählen…</option>
            <option value="laufen">Laufen</option>
            <option value="radfahren">Radfahren</option>
            <option value="schwimmen">Schwimmen</option>
          </select>
        </div>

        {/* Distanz */}
        <div className="flex flex-col">
          <label className="mb-1 text-neon-green">
            Distanz ({exerciseType === "schwimmen" ? "Meter" : "Kilometer"})
          </label>
          <input
            type="number"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            className="p-2 rounded bg-black border border-gray-700"
            required
          />
        </div>

        {/* Dauer */}
        <div className="flex flex-col">
          <label className="mb-1 text-neon-green">Dauer (Minuten)</label>
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="p-2 rounded bg-black border border-gray-700"
            required
          />
        </div>

        {/* Speichern */}
        <button
          type="submit"
          className="mt-2 bg-purple-600 hover:bg-purple-700 py-2 rounded font-semibold"
        >
          Speichern
        </button>
      </form>
    </div>
  );
}