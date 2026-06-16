"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabaseClient";
import { BarChart, PieChart } from "@/app/components/ChartComponent";

export default function AnalysePage() {
  const [entries, setEntries] = useState([]);

  // --- DATEN LADEN ---
  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from("training_entries")
        .select("*")
        .order("Datum", { ascending: true });

      if (error) {
        console.error("Analyse Load Fehler:", error);
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

  // --- WOCHENVOLUMEN ---
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

  // --- MUSKELGRUPPEN ---
  const muscleGroups = {
    "Rudermaschine": "Rücken",
    "Brustpresse": "Brust",
    "Butterfly": "Brust",
    "Reverse Butterfly": "Schultern",
    "Latzug": "Rücken",
    "Beinpresse": "Beine",
    "Bizepscurl": "Bizeps",
  };

  const [muscleVolume, setMuscleVolume] = useState({});

  useEffect(() => {
    const mv = {};

    entries.forEach((e) => {
      const mg = muscleGroups[e.uebung] || "Sonstiges";
      if (!mv[mg]) mv[mg] = 0;
      mv[mg] += e.volumen;
    });

    setMuscleVolume(mv);
  }, [entries]);

  // --- TOP ÜBUNGEN ---
  const [topExercises, setTopExercises] = useState({});

  useEffect(() => {
    const totals = {};

    entries.forEach((e) => {
      if (!totals[e.uebung]) totals[e.uebung] = 0;
      totals[e.uebung] += e.volumen;
    });

    setTopExercises(totals);
  }, [entries]);

  // --- PRs ---
  const [prs, setPRs] = useState({});

  useEffect(() => {
    const pr = {};

    entries.forEach((e) => {
      if (!pr[e.uebung]) {
        pr[e.uebung] = {
          maxGewicht: e.gewicht,
          maxWdh: e.wiederholungen,
          maxVol: e.volumen,
        };
      } else {
        pr[e.uebung].maxGewicht = Math.max(pr[e.uebung].maxGewicht, e.gewicht);
        pr[e.uebung].maxWdh = Math.max(pr[e.uebung].maxWdh, e.wiederholungen);
        pr[e.uebung].maxVol = Math.max(pr[e.uebung].maxVol, e.volumen);
      }
    });

    setPRs(pr);
  }, [entries]);

  // --- UI ---
  return (
    <div className="container">
      <div className="card">
        <h1>Analyse Dashboard</h1>
        <p style={{ color: "var(--text-dim)", marginBottom: "20px" }}>
          Deine komplette Trainingsanalyse im Neon‑Cyber‑Gym‑Style.
        </p>
      </div>

      <div className="card">
        <h2>Wochenvolumen</h2>
        <BarChart
          labels={Object.keys(weeklyVolume)}
          values={Object.values(weeklyVolume)}
        />
      </div>

      <div className="card">
        <h2>Muskelgruppen</h2>
        <PieChart
          labels={Object.keys(muscleVolume)}
          values={Object.values(muscleVolume)}
        />
      </div>

      <div className="card">
        <h2>Top Übungen</h2>
        <ul>
          {Object.entries(topExercises).map(([uebung, vol]) => (
            <li key={uebung}>
              <strong style={{ color: "var(--neon)", textShadow: "var(--neon-glow)" }}>
                {uebung}
              </strong>
              <br />
              {vol} kg Gesamtvolumen
            </li>
          ))}
        </ul>
      </div>

      <div className="card">
        <h2>Persönliche Rekorde</h2>
        <ul>
          {Object.entries(prs).map(([uebung, pr]) => (
            <li key={uebung}>
              <strong style={{ color: "var(--neon)", textShadow: "var(--neon-glow)" }}>
                {uebung}
              </strong>
              <br />
              Max Gewicht: {pr.maxGewicht} kg<br />
              Max Wdh: {pr.maxWdh}<br />
              Max Volumen: {pr.maxVol}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}