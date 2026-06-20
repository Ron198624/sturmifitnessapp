"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/utils/supabaseClient";

export default function TrainingPage() {
  const [uebung, setUebung] = useState("");
  const [gewicht, setGewicht] = useState("");
  const [wiederholungen, setWiederholungen] = useState("");
  const [saetze, setSaetze] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const volumen = Number(gewicht) * Number(wiederholungen) * Number(saetze);

    const { error } = await supabase.from("training_entries").insert([
      {
        Uebung: uebung,
        Gewicht: gewicht,
        Wiederholungen: wiederholungen,
        Saetze: saetze,
        Volumen: volumen,
        Datum: new Date().toISOString(),
      },
    ]);

    if (error) {
      setMessage("Fehler beim Speichern");
      return;
    }

    setMessage("Eintrag gespeichert!");
    setUebung("");
    setGewicht("");
    setWiederholungen("");
    setSaetze("");
  }

  return (
    <div className="p-6 text-white mt-6 pb-24">
      <h1 className="text-3xl font-bold mb-6 text-center">Training</h1>

      {message && (
        <div className="text-center mb-4 text-purple-400">{message}</div>
      )}

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 bg-gray-900 p-4 rounded-lg"
      >
        {/* Übung */}
        <div className="flex flex-col">
          <label className="mb-1 text-neon-green">Übung</label>
          <select
            value={uebung}
            onChange={(e) => setUebung(e.target.value)}
            className="p-2 rounded bg-black border border-gray-700"
            required
          >
            <option value="">Bitte wählen…</option>
            <option value="Rudermaschine">Rudermaschine</option>
            <option value="Brustpresse">Brustpresse</option>
            <option value="Butterfly">Butterfly</option>
            <option value="Reverse Butterfly">Reverse Butterfly</option>
            <option value="Latzug">Latzug</option>
            <option value="Beinpresse">Beinpresse</option>
            <option value="Bizepscurl">Bizepscurl</option>
          </select>
        </div>

        {/* Gewicht */}
        <div className="flex flex-col">
          <label className="mb-1 text-neon-green">Gewicht (kg)</label>
          <input
            type="number"
            value={gewicht}
            onChange={(e) => setGewicht(e.target.value)}
            className="p-2 rounded bg-black border border-gray-700"
            required
          />
        </div>

        {/* Wiederholungen */}
        <div className="flex flex-col">
          <label className="mb-1 text-neon-green">Wiederholungen</label>
          <input
            type="number"
            value={wiederholungen}
            onChange={(e) => setWiederholungen(e.target.value)}
            className="p-2 rounded bg-black border border-gray-700"
            required
          />
        </div>

        {/* Sätze */}
        <div className="flex flex-col">
          <label className="mb-1 text-neon-green">Sätze</label>
          <input
            type="number"
            value={saetze}
            onChange={(e) => setSaetze(e.target.value)}
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