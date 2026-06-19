"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function CardioPage() {
  const [message, setMessage] = useState("");
  const [exerciseType, setExerciseType] = useState("laufen");

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    const date = formData.get("date");
    const exercise = formData.get("exercise");
    const distance_m = Number(formData.get("distance_m"));
    const duration_min = Number(formData.get("duration_min"));
    const exercise_type = formData.get("exercise_type");

    const { data: { user } } = await supabase.auth.getUser();

    const { error } = await supabase
      .from("cardio_entries")
      .insert({
        user_id: user.id,
        date,
        exercise,
        distance_m,
        duration_min,
        exercise_type
      });

    if (error) {
      setMessage("Fehler beim Speichern");
    } else {
      setMessage("Eintrag gespeichert!");
      e.target.reset();
    }
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Cardio Eintrag</h1>

      <form onSubmit={handleSubmit}>

        <div>
          <label>Datum:</label>
          <input type="date" name="date" required />
        </div>

        <div>
          <label>Übung:</label>
          <input type="text" name="exercise" required />
        </div>

        <div>
          <label>Art:</label>
          <select
            name="exercise_type"
            value={exerciseType}
            onChange={(e) => setExerciseType(e.target.value)}
            required
          >
            <option value="laufen">Laufen</option>
            <option value="radfahren">Radfahren</option>
            <option value="schwimmen">Schwimmen</option>
          </select>
        </div>

        {/* Dynamische Eingabefelder */}
        {exerciseType === "schwimmen" && (
          <div>
            <label>Distanz (Meter):</label>
            <input type="number" name="distance_m" required />
          </div>
        )}

        {(exerciseType === "laufen" || exerciseType === "radfahren") && (
          <>
            <div>
              <label>Distanz (Kilometer):</label>
              <input type="number" name="distance_m" step="0.01" required />
            </div>

            <div>
              <label>Dauer (Minuten):</label>
              <input type="number" name="duration_min" required />
            </div>
          </>
        )}

        <button type="submit">Speichern</button>
      </form>

      <p>{message}</p>
    </div>
  );
}