"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabaseClient";
import BarChart from "../components/BarChart";
import PieChart from "../components/PieChart";
import SportIcon from "../components/SportIcon";

export default function AnalysePage() {
  const [entries, setEntries] = useState([]);
  const [cardioEntries, setCardioEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  // Krafttraining laden
  useEffect(() => {
    const loadTraining = async () => {
      const { data, error } = await supabase
        .from("training_entries")
        .select("*");

      if (!error && data) setEntries(data);
      setLoading(false);
    };

    loadTraining();
  }, []);

  // Cardio laden
  useEffect(() => {
    const loadCardio = async () => {
      const { data, error } = await supabase
        .from("cardio_entries")
        .select("*");

      if (!error && data) setCardioEntries(data);
    };

    loadCardio();
  }, []);

  if (loading) return <div className="text-white">Lade Analyse…</div>;

  // Muskelgruppen
  const muscleGroups = {
    Brust: 0,
    Rücken: 0,
    Beine: 0,
    Schultern: 0,
    Arme: 0,
    Core: 0,
    Ganzkörper: 0
  };

  // Krafttraining → Muskelgruppen
  entries.forEach((entry) => {
    if (!entry.Uebung || !entry.Volumen) return;

    const map = {
      "Rudermaschine": "Rücken",
      "Brustpresse": "Brust",
      "Butterfly": "Brust",
      "Reverse Butterfly": "Schultern",
      "Latzug": "Rücken",
      "Beinpresse": "Beine",
      "Bizepscurl": "Arme"
    };

    const mg = map[entry.Uebung];
    if (mg) muscleGroups[mg] += entry.Volumen;
  });

  // Cardio → Muskelgruppen
  cardioEntries.forEach((entry) => {
    if (!entry.exercise_type || !entry.distance_m) return;

    if (entry.exercise_type === "schwimmen") {
      muscleGroups["Ganzkörper"] += entry.distance_m;
    }

    if (entry.exercise_type === "laufen" || entry.exercise_type === "radfahren") {
      muscleGroups["Beine"] += entry.distance_m * 1000;
    }
  });

  // Wochenvolumen
  const weekMap = {};

  function getWeekNumber(date) {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
  }

  // Krafttraining → Wochenvolumen
  entries.forEach((entry) => {
    const date = new Date(entry.Datum);
    const week = getWeekNumber(date);
    if (!weekMap[week]) weekMap[week] = 0;
    weekMap[week] += entry.Volumen;
  });

  // Cardio → Wochenvolumen
  cardioEntries.forEach((entry) => {
    const date = new Date(entry.date);
    const week = getWeekNumber(date);
    if (!weekMap[week]) weekMap[week] = 0;

    if (entry.exercise_type === "schwimmen") {
      weekMap[week] += entry.distance_m;
    }

    if (entry.exercise_type === "laufen" || entry.exercise_type === "radfahren") {
      weekMap[week] += entry.distance_m * 1000;
    }
  });

  const weekLabels = Object.keys(weekMap);
  const weekValues = Object.values(weekMap);

  // Kraftdiagramm
  const exerciseMap = {};
  entries.forEach((entry) => {
    if (!entry.Uebung || !entry.Volumen) return;
    if (!exerciseMap[entry.Uebung]) exerciseMap[entry.Uebung] = 0;
    exerciseMap[entry.Uebung] += entry.Volumen;
  });

  const exerciseLabels = Object.keys(exerciseMap);
  const exerciseValues = Object.values(exerciseMap);

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">Analyse</h1>

      <div className="mb-10">
        <h2 className="text-xl mb-2">Volumen pro Übung</h2>
        <BarChart labels={exerciseLabels} values={exerciseValues} />
      </div>

      <div className="mb-10">
        <h2 className="text-xl mb-2">Wochenvolumen (Kraft + Cardio)</h2>
        <BarChart labels={weekLabels} values={weekValues} />
      </div>

      <div className="mb-10">
        <h2 className="text-xl mb-2">Muskelgruppen Übersicht</h2>
        <PieChart data={muscleGroups} />
      </div>
    </div>
  );
}