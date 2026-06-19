"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabaseClient";
import BarChart from "@/app/components/BarChart";
import PieChart from "@/app/components/PieChart";
import SportIcon from "@/app/components/SportIcon";

export default function AnalysePage() {
  // -------------------------------------------------------
  // STATES
  // -------------------------------------------------------
  const [entries, setEntries] = useState([]);
  const [cardioEntries, setCardioEntries] = useState([]);

  const [weeklyVolume, setWeeklyVolume] = useState({});
  const [muscleGroups, setMuscleGroups] = useState({});
  const [topExercises, setTopExercises] = useState({});
  const [prs, setPrs] = useState({});

  const [cardioWeekly, setCardioWeekly] = useState({});

  // -------------------------------------------------------
  // HELPER: Kalenderwoche berechnen
  // -------------------------------------------------------
  function getWeekNumber(date) {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
  }

  // -------------------------------------------------------
  // LOAD: Krafttraining
  // -------------------------------------------------------
  useEffect(() => {
    async function loadTraining() {
      const { data, error } = await supabase
        .from("training_entries")
        .select("*")
        .order("Datum", { ascending: true });

      if (error) {
        console.error("Training Load Fehler:", error);
        return;
      }

      setEntries(data);
    }

    loadTraining();
  }, []);

  // -------------------------------------------------------
  // LOAD: Cardio
  // -------------------------------------------------------
  useEffect(() => {
    async function loadCardio() {
      const { data, error } = await supabase
        .from("cardio_entries")
        .select("*")
        .order("date", { ascending: true });

      if (error) {
        console.error("Cardio Load Fehler:", error);
        return;
      }

      setCardioEntries(data);
    }

    loadCardio();
  }, []);

  // -------------------------------------------------------
  // ANALYSE: Krafttraining
  // -------------------------------------------------------
  useEffect(() => {
    const weeks = {};
    const groups = {};
    const exercises = {};
    const prData = {};

    entries.forEach((e) => {
      const week = getWeekNumber(new Date(e.Datum));

      // Wochenvolumen
      if (!weeks[week]) weeks[week] = 0;
      weeks[week] += e.Volumen;

      // Muskelgruppen
      if (!groups[e.Muskelgruppe]) groups[e.Muskelgruppe] = 0;
      groups[e.Muskelgruppe] += e.Volumen;

      // Top Übungen
      if (!exercises[e.Uebung]) exercises[e.Uebung] = 0;
      exercises[e.Uebung] += e.Volumen;

      // PRs
      if (!prData[e.Uebung]) {
        prData[e.Uebung] = {
          maxGewicht: e.Gewicht,
          maxWdh: e.Wiederholungen,
          maxVolumen: e.Volumen,
        };
      } else {
        prData[e.Uebung].maxGewicht = Math.max(prData[e.Uebung].maxGewicht, e.Gewicht);
        prData[e.Uebung].maxWdh = Math.max(prData[e.Uebung].maxWdh, e.Wiederholungen);
        prData[e.Uebung].maxVolumen = Math.max(prData[e.Uebung].maxVolumen, e.Volumen);
      }
    });

    setWeeklyVolume(weeks);
    setMuscleGroups(groups);
    setTopExercises(exercises);
    setPrs(prData);
  }, [entries]);

  // -------------------------------------------------------
  // ANALYSE: Cardio
  // -------------------------------------------------------
  useEffect(() => {
    const weeks = {};

    cardioEntries.forEach((e) => {
      const week = getWeekNumber(new Date(e.date));

      if (!weeks[week]) {
        weeks[week] = { laufen: 0, radfahren: 0, schwimmen: 0 };
      }

      if (e.exercise_type === "laufen") weeks[week].laufen += e.distance_m;
      if (e.exercise_type === "radfahren") weeks[week].radfahren += e.distance_m;
      if (e.exercise_type === "schwimmen") weeks[week].schwimmen += e.distance_m;
    });

    setCardioWeekly(weeks);
  }, [cardioEntries]);

  // -------------------------------------------------------
  // CARDIO HEATMAP RENDERER
  // -------------------------------------------------------
  function renderCardioHeatmap() {
    return Object.keys(cardioWeekly).map((week) => {
      const w = cardioWeekly[week];
      const max = Math.max(w.laufen, w.radfahren, w.schwimmen);

      return (
        <div key={week} className="card">
          <h3>Cardio – Woche {week}</h3>

          <ul style={{ listStyle: "none", padding: 0 }}>
            {[
              ["Laufen", w.laufen, "laufen"],
              ["Radfahren", w.radfahren, "radfahren"],
              ["Schwimmen", w.schwimmen, "schwimmen"],
            ].map(([label, value, type]) => {
              if (value === 0) return null;

              const intensity = value / max;
              const color = `hsl(${(1 - intensity) * 240}, 100%, 50%)`;

              return (
                <li
                  key={type}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: "10px",
                    padding: "10px",
                    borderRadius: "8px",
                    background: `linear-gradient(90deg, ${color}55, transparent)`,
                    boxShadow: `0 0 12px ${color}55`,
                  }}
                >
                  <SportIcon type={type} size={26} />

                  <span>
                    <strong style={{ color: color, textShadow: `0 0 8px ${color}` }}>
                      {label}
                    </strong>
                    <br />
                    {value} {type === "schwimmen" ? "m" : "km"}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      );
    });
  }

  // -------------------------------------------------------
  // RENDER
  // -------------------------------------------------------
  return (
    <div className="analyse-container">
      <h1>Analyse Dashboard</h1>
      <p>Deine komplette Trainingsanalyse im Neon-Cyber-Gym-Style.</p>

      {/* ------------------- KRAFTTRAINING ------------------- */}
      <div className="card">
        <h2>Wochenvolumen (Kraft)</h2>
        <BarChart
          labels={Object.keys(weeklyVolume)}
          values={Object.values(weeklyVolume)}
        />
      </div>

      <div className="card">
        <h2>Muskelgruppen Übersicht</h2>
        <PieChart data={muscleGroups} />
      </div>

      <div className="card">
        <h2>Top Übungen</h2>
        <ul>
          {Object.entries(topExercises).map(([name, vol]) => (
            <li key={name}>
              {name}: {vol} kg Gesamtvolumen
            </li>
          ))}
        </ul>
      </div>

      <div className="card">
        <h2>Persönliche Rekorde</h2>
        {Object.entries(prs).map(([name, pr]) => (
          <div key={name} style={{ marginBottom: "15px" }}>
            <strong>{name}</strong>
            <br />
            Max Gewicht: {pr.maxGewicht} kg
            <br />
            Max Wdh: {pr.maxWdh}
            <br />
            Max Volumen: {pr.maxVolumen}
          </div>
        ))}
      </div>

      {/* ------------------- CARDIO ------------------- */}
      <div className="card">
        <h2>Cardio – Wochenvolumen</h2>
        <BarChart
          labels={Object.keys(cardioWeekly)}
          values={Object.values(cardioWeekly).map(
            (w) => w.laufen + w.radfahren + w.schwimmen
          )}
        />
      </div>

      <div className="card">
        <h2>Cardio – Heatmap pro Woche</h2>
        {renderCardioHeatmap()}
      </div>
    </div>
  );
}