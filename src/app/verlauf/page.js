"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabaseClient";
import { BarChart, PieChart } from "@/app/components/ChartComponent";

export default function VerlaufPage() {
  const [entries, setEntries] = useState([]);

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

  const [weeklyVolume, setWeeklyVolume] = useState({});

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
    <div className="container">
      <div className="card">
        <h1>Trainingsverlauf</h1>
        <p style={{ color: "var(--text-dim)", marginBottom: "20px" }}>
          Dein Trainingsvolumen über die Wochen.
        </p>
      </div>

      <div className="card">
        <h2>Wochenvolumen</h2>
        <BarChart
          labels={Object.keys(weeklyVolume)}
          values={Object.values(weeklyVolume)}
        />
      </div>
    </div>
  );
}