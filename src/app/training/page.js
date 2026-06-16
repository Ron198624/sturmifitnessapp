"use client";


import { useState } from "react";
import { getSupabaseClient } from "@/app/lib/supabaseClient";

console.log("ENV URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log("ENV KEY:", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "OK" : "MISSING");

export default function TrainingPage() {
  const supabase = getSupabaseClient();

  const [exercise, setExercise] = useState("");
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");
  const [sets, setSets] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    if (!exercise || !weight || !reps || !sets) return;

    setLoading(true);

    const volume = Number(weight) * Number(reps) * Number(sets);

    const payload = {
      Datum: new Date().toISOString().split("T")[0],
      Uebung: exercise,
      Gewicht: Number(weight),
      Wiederholungen: Number(reps),
      Saetze: Number(sets),
      Volumen: volume,
    };

    console.log("Insert payload:", payload);

    const { data, error } = await supabase
      .from("training_entries")
      .insert([payload]);

    console.log("Insert result:", { data, error });

    setLoading(false);

    if (error) {
      console.error("Fehler beim Speichern:", error);
      return;
    }

    setExercise("");
    setWeight("");
    setReps("");
    setSets("");
  };

  return (
    <div className="training-container">
      <h1>Training erfassen</h1>

      <div className="training-form">
        <select
          value={exercise}
          onChange={(e) => setExercise(e.target.value)}
        >
          <option value="">Übung wählen</option>
          <option value="Rudermaschine">Rudermaschine</option>
          <option value="Brustpresse">Brustpresse</option>
          <option value="Butterfly">Butterfly</option>
          <option value="Reverse Butterfly">Reverse Butterfly</option>
          <option value="Latzug">Latzug</option>
          <option value="Beinpresse">Beinpresse</option>
          <option value="Bizepscurl">Bizepscurl</option>
        </select>

        <input
          type="number"
          placeholder="Gewicht (kg)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />

        <input
          type="number"
          placeholder="Wiederholungen"
          value={reps}
          onChange={(e) => setReps(e.target.value)}
        />

        <input
          type="number"
          placeholder="Sätze"
          value={sets}
          onChange={(e) => setSets(e.target.value)}
        />

        <button onClick={handleAdd} disabled={loading} className="btn">
          {loading ? "Speichern..." : "Satz speichern"}
        </button>
      </div>
    </div>
  );
}