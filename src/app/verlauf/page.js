"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";



export default function VerlaufPage() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    async function load() {
      // Training laden
      const { data: training, error: tError } = await supabase
        .from("training_entries")
        .select("*")
        .order("Datum", { ascending: false });

      // Cardio laden
      const { data: cardio, error: cError } = await supabase
        .from("cardio_entries")
        .select("*")
        .order("date", { ascending: false });

      if (tError || cError) {
        console.log("Fehler beim Laden:", tError || cError);
        return;
      }

      // Cardio in ein einheitliches Format bringen
      const cardioMapped = cardio.map((c) => ({
        type: "cardio",
        date: c.date,
        name: c.exercise_type,
        details: `${c.distance_m} m – ${c.duration_min} Min`
      }));

      // Training in ein einheitliches Format bringen
      const trainingMapped = training.map((t) => ({
        type: "training",
        date: t.Datum,
        name: t.Uebung,
        details: `${t.Saetze} × ${t.Wiederholungen} × ${t.Gewicht} kg`
      }));

      // Beide Listen zusammenführen
      const combined = [...trainingMapped, ...cardioMapped];

      // Nach Datum sortieren
      combined.sort((a, b) => new Date(b.date) - new Date(a.date));

      setEntries(combined);
    }

    load();
  }, []);

  return (
    <div className="w-full min-h-screen bg-black flex flex-col items-center px-4 pb-24">

      {/* HEADER */}
      <div className="bg-black backdrop-blur-xl border border-gray-700 rounded-2xl p-8 
                      shadow-[0_0_25px_rgba(0,255,150,0.25)] w-full max-w-3xl mt-10 text-center">
        <h1 className="text-4xl font-extrabold text-[#00ff9d]">Verlauf</h1>
      </div>

      {/* LISTE */}
      <div className="bg-black backdrop-blur-xl border border-gray-700 rounded-2xl p-8 
                      shadow-[0_0_25px_rgba(0,255,150,0.25)] w-full max-w-3xl mt-10">

        <h2 className="text-2xl font-bold mb-6 text-[#00ff9d]">Alle Einträge</h2>

        <div className="space-y-4 text-white text-xl">

          {entries.length === 0 && (
            <p className="text-gray-400">Noch keine Einträge vorhanden.</p>
          )}

          {entries.map((e, i) => (
            <div key={i} className="border border-gray-700 rounded-xl p-4 bg-gray-900">
              <p className="font-bold text-[#00ff9d]">{e.name}</p>
              <p>{e.details}</p>
              <p className="text-gray-400 text-sm">{e.date}</p>
            </div>
          ))}

        </div>

      </div>

    </div>
  );
}