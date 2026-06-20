"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabaseClient";
import { BarChart } from "@/app/components/ChartComponent";
import SportIcon from "@/app/components/SportIcon";

// --- MUSKELGRUPPEN ---
const muscleGroups = {
  "Rudermaschine": "Rücken",
  "Brustpresse": "Brust",
  "Butterfly": "Brust",
  "Reverse Butterfly": "Schultern",
  "Latzug": "Rücken",
  "Beinpresse": "Beine",
  "Bizepscurl": "Bizeps",
  "Laufen": "Beine",
  "Radfahren": "Beine",
  "Schwimmen": "Ganzkörper"
};

export default function VerlaufPage() {
  const [entries, setEntries] = useState([]);
  const [weeklyVolume, setWeeklyVolume] = useState({});

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from("training_entries")
        .select("*")
        .order("Datum", { ascending: true });

      if (error) {
        console.error("Verlauf Load Fehler:", error);
        return;
      }

      const mapped = data.map((row) => ({
        datum: row.Datum,
        uebung: row.Uebung,
        gewicht: row.Gewicht,
        wiederholungen: row.Wiederholungen,
        saetze: row.Saetze,
        volumen: row.Volumen,
      }));

      setEntries(mapped);
    }

    load();
  }, []);

  useEffect(() => {
    const weeks = {};

    entries.forEach((e) => {
      const w = getWeekNumber(new Date(e.datum));
      if (!weeks[w]) weeks[w] = 0;
      weeks[w] += e.volumen;
    });

    setWeeklyVolume(weeks);
  }, [entries]);

  function getWeekNumber(date) {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
  }

  return (
    <div className="p-6 text-white mt-6 pb-24">
      <h1 className="text-3xl font-bold mb-4 text-center">Trainingsverlauf</h1>
      <p className="text-neon-green text-center mb-8">
        Dein Trainingsvolumen über die Wochen.
      </p>

      {/* Wochenvolumen */}
      <div className="mb-10">
        <h2 className="text-xl mb-2 text-purple-400 text-center">Wochenvolumen</h2>
        <BarChart
          labels={Object.keys(weeklyVolume)}
          values={Object.values(weeklyVolume)}
        />
      </div>

      {/* Letzte Einträge */}
      <div className="mb-10">
        <h2 className="text-xl mb-4 text-purple-400 text-center">Letzte Einträge</h2>

        <ul className="space-y-4">
          {entries.slice(-15).map((entry, i) => (
            <li
              key={i}
              className="flex items-center gap-4 bg-gray-900 p-3 rounded-lg"
            >
              <SportIcon type={muscleGroups[entry.uebung]} size={26} />

              <div className="text-sm">
                <strong className="text-purple-300">{entry.uebung}</strong>
                <div className="text-neon-green">
                  {entry.gewicht} kg – {entry.wiederholungen} Wdh – {entry.saetze} Sätze
                </div>
                <div className="text-gray-400 text-xs">
                  {new Date(entry.datum).toLocaleDateString("de-DE")}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}