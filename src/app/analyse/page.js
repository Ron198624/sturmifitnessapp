"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { muscleMap } from "../muscleMap";

import NeonLineChart from "../components/NeonLineChart";
import NeonBarChart from "../components/NeonBarChart";
import NeonDonutChart from "../components/NeonDonutChart";

// Muskelgruppen für Heatmap
const MUSCLE_GROUPS = ["Brust", "Rücken", "Beine", "Schultern", "Arme", "Core"];

// Mapping: einzelne Muskeln → Oberkategorie
const MUSCLE_ALIAS = {
  Brust: "Brust",
  Rücken: "Rücken",
  Beine: "Beine",
  Schultern: "Schultern",
  Bizeps: "Arme",
  Trizeps: "Arme",
  Unterarme: "Arme",
  Arme: "Arme",
  Core: "Core",
};

// ⭐ Muskelbelastungs‑Gewichte
const muscleLoadWeights = {
  schwimmen: {
    Rücken: 0.18,
    Schultern: 0.16,
    Brust: 0.14,
    Bizeps: 0.12,
    Trizeps: 0.12,
    Core: 0.14,
    Beine: 0.14,
  },
  laufen: {
    Beine: 0.7,
    Core: 0.3,
  },
  radfahren: {
    Beine: 0.6,
    Core: 0.4,
  },
  // Beispiel Krafttraining
  "Brustpresse": { Brust: 0.6, Schultern: 0.25, Trizeps: 0.15 },
  "Butterfly": { Brust: 0.7, Schultern: 0.3 },
  "Liegestütze": { Brust: 0.5, Schultern: 0.3, Trizeps: 0.2 },
  "Hantelbank": { Brust: 0.6, Schultern: 0.25, Trizeps: 0.15 },
  "Bankdrücken": { Brust: 0.6, Schultern: 0.25, Trizeps: 0.15 },
  "Rudermaschine": { Rücken: 0.7, Bizeps: 0.3 },
  "Latzug": { Rücken: 0.7, Bizeps: 0.3 },
  "Klimmzüge": { Rücken: 0.6, Bizeps: 0.3, Unterarme: 0.1 },
  "Rückenstrecker": { Rücken: 0.8, Core: 0.2 },
  "Hyperextension": { Rücken: 0.8, Core: 0.2 },
  "Trizeps Maschine": { Trizeps: 1.0 },
  "Bizepscurl": { Bizeps: 1.0 },
  "Reverse Butterfly": { Schultern: 0.7, Rücken: 0.3 },
  "Beinpresse": { Beine: 0.9, Core: 0.1 },
};

// Farbskala für Heatmap
function getHeatColor(value, max) {
  if (max === 0) return "rgba(80,80,80,0.6)";
  const ratio = value / max;

  if (ratio < 0.2) return "#1e3a8a";
  if (ratio < 0.4) return "#10b981";
  if (ratio < 0.6) return "#eab308";
  if (ratio < 0.8) return "#f97316";
  return "#dc2626";
}

// ⭐ KORREKTE ISO‑KALENDERWOCHE
function getISOWeek(date) {
  const tmp = new Date(date.getTime());
  tmp.setHours(0, 0, 0, 0);
  tmp.setDate(tmp.getDate() + 3 - ((tmp.getDay() + 6) % 7));
  const week1 = new Date(tmp.getFullYear(), 0, 4);
  const weekNumber =
    1 +
    Math.round(
      ((tmp.getTime() - week1.getTime()) / 86400000 -
        3 +
        ((week1.getDay() + 6) % 7)) /
        7
    );

  return `${tmp.getFullYear()}-KW${weekNumber}`;
}

export default function AnalysePage() {
  const [muscleVolume, setMuscleVolume] = useState({});
  const [maxVolume, setMaxVolume] = useState(0);

  const [exerciseNames, setExerciseNames] = useState([]);
  const [exerciseVolumes, setExerciseVolumes] = useState([]);

  const [weekLabels, setWeekLabels] = useState([]);
  const [weekVolumes, setWeekVolumes] = useState([]);

  const [donutLabels, setDonutLabels] = useState([]);
  const [donutValues, setDonutValues] = useState([]);

  useEffect(() => {
    async function load() {
      // Krafttraining laden
      const { data: training } = await supabase
        .from("training_entries")
        .select("*");

      // Cardio laden
      const { data: cardio } = await supabase
        .from("cardio_entries")
        .select("*");

      // Einträge vereinheitlichen
      const allEntries = [
        ...training.map((t) => ({
          baseVolume:
            t.Gewicht * t.Wiederholungen * t.Saetze || 0,
          muscles: muscleMap[t.Uebung] || [],
          name: t.Uebung,
          date: t.Datum,
        })),
        ...cardio.map((c) => ({
          baseVolume: c.duration_min, // ⭐ Cardio = Minuten
          muscles: muscleMap[c.exercise_type] || [],
          name: c.exercise_type,
          date: c.date,
        })),
      ];

      // -------------------------
      // 1) MUSKELBELASTUNG HEATMAP
      // -------------------------
      const volumePerMuscle = {};

      for (const entry of allEntries) {
        const weights = muscleLoadWeights[entry.name] || {};

        for (const m of entry.muscles) {
          const group = MUSCLE_ALIAS[m] || m;
          const w = weights[group] ?? 0;

          if (!volumePerMuscle[group]) volumePerMuscle[group] = 0;

          volumePerMuscle[group] += entry.baseVolume * w;
        }
      }

      const max = Math.max(...Object.values(volumePerMuscle), 0);
      setMuscleVolume(volumePerMuscle);
      setMaxVolume(max);

      // -------------------------
      // 2) BAR CHART – Volumen pro Übung
      // -------------------------
      const exerciseMap = {};

      for (const entry of allEntries) {
        if (!exerciseMap[entry.name]) exerciseMap[entry.name] = 0;

        const weights = muscleLoadWeights[entry.name] || {};
        let sum = 0;

        for (const m of entry.muscles) {
          const group = MUSCLE_ALIAS[m] || m;
          const w = weights[group] ?? 0;
          sum += entry.baseVolume * w;
        }

        exerciseMap[entry.name] += sum;
      }

      setExerciseNames(Object.keys(exerciseMap));
      setExerciseVolumes(Object.values(exerciseMap));

      // -------------------------
      // 3) LINE CHART – Wochenvolumen (ISO‑KW)
      // -------------------------
      const weekMap = {};

      for (const entry of allEntries) {
        const date = new Date(entry.date);
        const week = getISOWeek(date);

        const weights = muscleLoadWeights[entry.name] || {};
        let sum = 0;

        for (const m of entry.muscles) {
          const group = MUSCLE_ALIAS[m] || m;
          const w = weights[group] ?? 0;
          sum += entry.baseVolume * w;
        }

        if (!weekMap[week]) weekMap[week] = 0;
        weekMap[week] += sum;
      }

      const sortedWeeks = Object.keys(weekMap).sort((a, b) => {
        const [yearA, weekA] = a.split("-KW").map(Number);
        const [yearB, weekB] = b.split("-KW").map(Number);

        if (yearA !== yearB) return yearA - yearB;
        return weekA - weekB;
      });

      setWeekLabels(sortedWeeks);
      setWeekVolumes(sortedWeeks.map((w) => weekMap[w]));

      // -------------------------
      // 4) DONUT – Muskelgruppen
      // -------------------------
      setDonutLabels(Object.keys(volumePerMuscle));
      setDonutValues(Object.values(volumePerMuscle));
    }

    load();
  }, []);

  return (
    <div className="w-full min-h-screen bg-black flex flex-col items-center px-4 pb-24">
      {/* HEADER */}
      <div className="bg-black backdrop-blur-xl border border-gray-700 rounded-2xl p-8 shadow-[0_0_25px_rgba(0,255,150,0.25)] w-full max-w-4xl mt-10 text-center">
        <h1 className="text-4xl font-extrabold text-[#00ff9d]">Analyse</h1>
        <p className="text-gray-400 mt-2">
          Muskelbelastung basierend auf realistischen Prozentanteilen
        </p>
      </div>

      {/* HEATMAP SECTION */}
      <div className="w-full max-w-4xl mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-black backdrop-blur-xl border border-gray-700 rounded-2xl p-6 shadow-[0_0_25px_rgba(0,255,150,0.25)] flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-4 text-[#00ff9d]">Körper‑Heatmap</h2>
          <SilhouetteHeatmap muscleVolume={muscleVolume} maxVolume={maxVolume} />
        </div>

        <div className="bg-black backdrop-blur-xl border border-gray-700 rounded-2xl p-6 shadow-[0_0_25px_rgba(0,255,150,0.25)]">
          <h2 className="text-2xl font-bold mb-4 text-[#00ff9d]">Muskelgruppen Übersicht</h2>
          <MuscleGrid muscleVolume={muscleVolume} maxVolume={maxVolume} />
        </div>
      </div>

      {/* CHART SECTION */}
      <div className="w-full max-w-4xl mt-10 grid grid-cols-1 gap-6">
        <div className="bg-black backdrop-blur-xl border border-gray-700 rounded-2xl p-6">
          <h2 className="text-2xl font-bold mb-4 text-[#00ff9d]">Belastung pro Übung</h2>
          <NeonBarChart labels={exerciseNames} values={exerciseVolumes} />
        </div>

        <div className="bg-black backdrop-blur-xl border border-gray-700 rounded-2xl p-6">
          <h2 className="text-2xl font-bold mb-4 text-[#00ff9d]">Wochenbelastung</h2>
          <NeonLineChart labels={weekLabels} values={weekVolumes} />
        </div>

        <div className="bg-black backdrop-blur-xl border border-gray-700 rounded-2xl p-6">
          <h2 className="text-2xl font-bold mb-4 text-[#00ff9d]">Muskelgruppen‑Verteilung</h2>
          <NeonDonutChart labels={donutLabels} values={donutValues} />
        </div>
      </div>
    </div>
  );
}

// ---------------- SILHOUETTE HEATMAP ----------------

function SilhouetteHeatmap({ muscleVolume, maxVolume }) {
  const get = (name) => getHeatColor(muscleVolume[name] || 0, maxVolume);

  return (
    <div className="flex flex-col items-center gap-6">
      {/* FRONT */}
      <div className="relative">
        <svg
          width="180"
          height="360"
          viewBox="0 0 180 360"
          className="drop-shadow-[0_0_25px_rgba(0,255,150,0.35)]"
        >
          <path
            d="M90 10 C70 10 55 30 55 55 L55 90 C55 110 45 130 45 150 L45 260 C45 290 60 320 90 320 C120 320 135 290 135 260 L135 150 C135 130 125 110 125 90 L125 55 C125 30 110 10 90 10 Z"
            fill="none"
            stroke="#22c55e"
            strokeWidth="2"
          />

          <rect x="65" y="70" width="50" height="30" rx="10" fill={get("Brust")} fillOpacity="0.85" />
          <rect x="45" y="55" width="30" height="20" rx="10" fill={get("Schultern")} fillOpacity="0.85" />
          <rect x="105" y="55" width="30" height="20" rx="10" fill={get("Schultern")} fillOpacity="0.85" />
          <rect x="35" y="80" width="20" height="70" rx="10" fill={get("Arme")} fillOpacity="0.85" />
          <rect x="125" y="80" width="20" height="70" rx="10" fill={get("Arme")} fillOpacity="0.85" />
          <rect x="70" y="105" width="40" height="50" rx="10" fill={get("Core")} fillOpacity="0.85" />
          <rect x="65" y="160" width="20" height="80" rx="10" fill={get("Beine")} fillOpacity="0.85" />
          <rect x="95" y="160" width="20" height="80" rx="10" fill={get("Beine")} fillOpacity="0.85" />
        </svg>
      </div>

      {/* BACK */}
      <div className="relative">
        <svg
          width="180"
          height="360"
          viewBox="0 0 180 360"
          className="drop-shadow-[0_0_25px_rgba(0,255,150,0.35)]"
        >
          <path
            d="M90 10 C70 10 55 30 55 55 L55 90 C55 110 45 130 45 150 L45 260 C45 290 60 320 90 320 C120 320 135 290 135 260 L135 150 C135 130 125 110 125 90 L125 55 C125 30 110 10 90 10 Z"
            fill="none"
            stroke="#22c55e"
            strokeWidth="2"
          />

          <rect x="65" y="70" width="50" height="50" rx="10" fill={get("Rücken")} fillOpacity="0.85" />
          <rect x="45" y="55" width="30" height="20" rx="10" fill={get("Schultern")} fillOpacity="0.85" />
          <rect x="105" y="55" width="30" height="20" rx="10" fill={get("Schultern")} fillOpacity="0.85" />
          <rect x="35" y="80" width="20" height="70" rx="10" fill={get("Arme")} fillOpacity="0.85" />
          <rect x="125" y="80" width="20" height="70" rx="10" fill={get("Arme")} fillOpacity="0.85" />
          <rect x="70" y="120" width="40" height="40" rx="10" fill={get("Core")} fillOpacity="0.85" />
          <rect x="65" y="160" width="20" height="80" rx="10" fill={get("Beine")} fillOpacity="0.85" />
          <rect x="95" y="160" width="20" height="80" rx="10" fill={get("Beine")} fillOpacity="0.85" />
        </svg>
      </div>
    </div>
  );
}
// ---------------- GRID HEATMAP ----------------

function MuscleGrid({ muscleVolume, maxVolume }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {MUSCLE_GROUPS.map((m) => {
        const value = muscleVolume[m] || 0;
        const color = getHeatColor(value, maxVolume);

        return (
          <div
            key={m}
            className="rounded-xl p-4 border border-gray-700 bg-gray-900 flex flex-col gap-2"
            style={{ boxShadow: `0 0 18px ${color}55` }}
          >
            {/* Titel + Wert */}
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-white">{m}</span>
              <span className="text-sm text-gray-400">
                {value > 0 ? `${value.toFixed(1)} Belastung` : "keine Belastung"}
              </span>
            </div>

            {/* Balken */}
            <div className="w-full h-3 rounded-full bg-gray-800 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: maxVolume ? `${(value / maxVolume) * 100}%` : "0%",
                  background: color,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}