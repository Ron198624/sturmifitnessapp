"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabaseClient";
import BarChart from "../components/BarChart";
import PieChart from "../components/PieChart";
import SportIcon from "../components/SportIcon";

export default function AnalysePage() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  // -------------------------------------------------------
  // Daten aus Supabase laden
  // -------------------------------------------------------
  useEffect(() => {
    const loadData = async () => {
      const { data, error } = await supabase
        .from("training")
        .select("*");

      if (!error && data) {
        setEntries(data);
      }
      setLoading(false);
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-white mt-10">
        Lade Analyse…
      </div>
    );
  }

  // -------------------------------------------------------
  // Muskelgruppen berechnen (Fix A)
  // -------------------------------------------------------
  const muscleGroups = {
    Brust: 0,
    Rücken: 0,
    Beine: 0,
    Schultern: 0,
    Arme: 0,
    Core: 0,
    Ganzkörper: 0
  };

  entries.forEach((entry) => {
    if (!entry.muscle_group || !entry.volume) return;

    if (!muscleGroups[entry.muscle_group]) {
      muscleGroups[entry.muscle_group] = 0;
    }

    muscleGroups[entry.muscle_group] += entry.volume;
  });

  // -------------------------------------------------------
  // Wochenvolumen berechnen (Fix B)
  // -------------------------------------------------------
  const weekMap = {};

  entries.forEach((entry) => {
    if (!entry.date || !entry.volume) return;

    const date = new Date(entry.date);
    const week = getWeekNumber(date);

    if (!weekMap[week]) {
      weekMap[week] = 0;
    }

    weekMap[week] += entry.volume;
  });

  const weekLabels = Object.keys(weekMap);
  const weekValues = Object.values(weekMap);

  // -------------------------------------------------------
  // Hilfsfunktion: Kalenderwoche berechnen
  // -------------------------------------------------------
  function getWeekNumber(date) {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
  }

  // -------------------------------------------------------
  // Ausgabe
  // -------------------------------------------------------
  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">Analyse</h1>

      {/* Wochenvolumen */}
      <div className="mb-10">
        <h2 className="text-xl mb-2">Wochenvolumen (Kraft)</h2>
        <BarChart labels={weekLabels} values={weekValues} />
      </div>

      {/* Muskelgruppen */}
      <div className="mb-10">
        <h2 className="text-xl mb-2">Muskelgruppen Übersicht</h2>
        <PieChart data={muscleGroups} />
      </div>

      {/* Top Übungen */}
      <div>
        <h2 className="text-xl mb-2">Top Übungen</h2>
        <div className="grid grid-cols-2 gap-4">
          {entries.slice(0, 6).map((entry) => (
            <div key={entry.id} className="bg-gray-800 p-3 rounded-lg flex items-center gap-3">
              <SportIcon sport={entry.exercise} size={32} />
              <div>
                <p className="font-bold">{entry.exercise}</p>
                <p className="text-sm text-gray-400">{entry.volume} Volumen</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}