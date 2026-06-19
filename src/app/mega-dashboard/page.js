"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabaseClient";
import BarChart from "../components/BarChart";
import PieChart from "../components/PieChart";

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

export default function MegaDashboardPage() {
  // -------------------------------------------------------
  // STATES
  // -------------------------------------------------------
  const [training, setTraining] = useState([]);
  const [cardio, setCardio] = useState([]);

  const [weeklyKraft, setWeeklyKraft] = useState({});
  const [weeklyCardio, setWeeklyCardio] = useState({});
  const [muscleGroups, setMuscleGroups] = useState({});
  const [cardioSplit, setCardioSplit] = useState({});

  const [weeklyPace, setWeeklyPace] = useState({});
  const [weeklySpeed, setWeeklySpeed] = useState({});

  // -------------------------------------------------------
  // LOAD TRAINING + CARDIO
  // -------------------------------------------------------
  useEffect(() => {
    async function load() {
      const { data: tData } = await supabase
        .from("training_entries")
        .select("*")
        .order("Datum", { ascending: true });

      const { data: cData } = await supabase
        .from("cardio_entries")
        .select("*")
        .order("date", { ascending: true });

      setTraining(tData || []);
      setCardio(cData || []);
    }
    load();
  }, []);

  // -------------------------------------------------------
  // ANALYSE: Krafttraining
  // -------------------------------------------------------
  useEffect(() => {
    const wk = {};
    const mg = {};

    training.forEach((e) => {
      const w = getWeekNumber(new Date(e.Datum));

      if (!wk[w]) wk[w] = 0;
      wk[w] += e.Volumen;

      if (!mg[e.Muskelgruppe]) mg[e.Muskelgruppe] = 0;
      mg[e.Muskelgruppe] += e.Volumen;
    });

    setWeeklyKraft(wk);
    setMuscleGroups(mg);
  }, [training]);

  // -------------------------------------------------------
  // ANALYSE: Cardio Volumen
  // -------------------------------------------------------
  useEffect(() => {
    const wc = {};
    const split = { laufen: 0, radfahren: 0, schwimmen: 0 };

    cardio.forEach((e) => {
      const w = getWeekNumber(new Date(e.date));

      if (!wc[w]) wc[w] = 0;
      wc[w] += e.distance_m;

      if (e.exercise_type === "laufen") split.laufen += e.distance_m;
      if (e.exercise_type === "radfahren") split.radfahren += e.distance_m;
      if (e.exercise_type === "schwimmen") split.schwimmen += e.distance_m;
    });

    setWeeklyCardio(wc);
    setCardioSplit(split);
  }, [cardio]);

  // -------------------------------------------------------
  // CARDIO: Pace & Speed
  // -------------------------------------------------------
  function calculatePace(distance_m, duration_min, type) {
    if (!distance_m || !duration_min) return null;

    if (type === "laufen" || type === "radfahren") {
      return duration_min / distance_m; // min/km
    }

    if (type === "schwimmen") {
      return (duration_min / distance_m) * 100; // min/100m
    }

    return null;
  }

  function calculateSpeed(distance_m, duration_min) {
    if (!distance_m || !duration_min) return null;

    const hours = duration_min / 60;
    return distance_m / hours; // km/h
  }

  useEffect(() => {
    const paceData = {};
    const speedData = {};

    cardio.forEach((e) => {
      const week = getWeekNumber(new Date(e.date));

      if (!paceData[week]) paceData[week] = [];
      if (!speedData[week]) speedData[week] = [];

      const pace = calculatePace(e.distance_m, e.duration_min, e.exercise_type);
      const speed = calculateSpeed(e.distance_m, e.duration_min);

      if (pace) paceData[week].push(pace);
      if (speed) speedData[week].push(speed);
    });

    const avgPace = {};
    const avgSpeed = {};

    Object.keys(paceData).forEach((w) => {
      avgPace[w] = paceData[w].reduce((a, b) => a + b, 0) / paceData[w].length;
    });

    Object.keys(speedData).forEach((w) => {
      avgSpeed[w] = speedData[w].reduce((a, b) => a + b, 0) / speedData[w].length;
    });

    setWeeklyPace(avgPace);
    setWeeklySpeed(avgSpeed);
  }, [cardio]);

  // -------------------------------------------------------
  // SUMMEN
  // -------------------------------------------------------
  const totalKraft = Object.values(weeklyKraft).reduce((a, b) => a + b, 0);
  const totalCardio = Object.values(weeklyCardio).reduce((a, b) => a + b, 0);

  // -------------------------------------------------------
  // RENDER
  // -------------------------------------------------------
  return (
    <div className="analyse-container">
      <h1>Mega Dashboard</h1>
      <p>Kraft & Cardio im direkten Vergleich.</p>

      {/* OVERVIEW */}
      <div className="card" style={{ display: "flex", gap: "20px" }}>
        <div>
          <h2>Gesamtvolumen Kraft</h2>
          <p>{totalKraft} kg</p>
        </div>
        <div>
          <h2>Gesamtvolumen Cardio</h2>
          <p>{totalCardio} (km/m je nach Einheit)</p>
        </div>
      </div>

      {/* WEEKLY COMPARISON */}
      <div className="card">
        <h2>Wochenvergleich: Kraft vs. Cardio</h2>
        <BarChart
          labels={Object.keys({ ...weeklyKraft, ...weeklyCardio })}
          values={[
            Object.values(weeklyKraft),
            Object.values(weeklyCardio),
          ]}
          seriesLabels={["Kraft (kg)", "Cardio (Distanz)"]}
        />
      </div>

      {/* MUSCLE GROUPS VS CARDIO SPLIT */}
      <div className="card" style={{ display: "flex", gap: "20px" }}>
        <div style={{ flex: 1 }}>
          <h2>Muskelgruppen (Kraft)</h2>
          <PieChart data={muscleGroups} />
        </div>
        <div style={{ flex: 1 }}>
          <h2>Cardio Verteilung</h2>
          <PieChart
            data={{
              Laufen: cardioSplit.laufen,
              Radfahren: cardioSplit.radfahren,
              Schwimmen: cardioSplit.schwimmen,
            }}
          />
        </div>
      </div>

      {/* PACE */}
      <div className="card">
        <h2>Durchschnitts‑Pace</h2>
        <BarChart
          labels={Object.keys(weeklyPace)}
          values={Object.values(weeklyPace)}
        />
      </div>

      {/* SPEED */}
      <div className="card">
        <h2>Durchschnitts‑Speed (km/h)</h2>
        <BarChart
          labels={Object.keys(weeklySpeed)}
          values={Object.values(weeklySpeed)}
        />
      </div>

      {/* INFO KACHELN */}
      <div className="card" style={{ display: "flex", gap: "20px" }}>
        <div>
          <h3>Ø Pace (Laufen)</h3>
          <p>{Object.values(weeklyPace).pop()?.toFixed(2)} min/km</p>
        </div>

        <div>
          <h3>Ø Speed (Radfahren)</h3>
          <p>{Object.values(weeklySpeed).pop()?.toFixed(1)} km/h</p>
        </div>

        <div>
          <h3>Ø Swim Pace</h3>
          <p>{Object.values(weeklyPace).pop()?.toFixed(2)} min/100m</p>
        </div>
      </div>
    </div>
  );
}