"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

import {
  WeeklyDistanceChart,
  WeeklyDurationChart,
  MonthlyDistanceChart,
  WeeklyPaceChart
} from "@/app/components/CardioCharts";

import SportIcon from "@/app/components/SportIcon";
import { FaRunning, FaBiking, FaSwimmer } from "react-icons/fa";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function CardioDashboard() {
  const [entries, setEntries] = useState([]);

  const [sportFilter, setSportFilter] = useState("alle");

  const [weeklyDistanceLabels, setWeeklyDistanceLabels] = useState([]);
  const [weeklyDistanceValues, setWeeklyDistanceValues] = useState([]);

  const [weeklyDurationLabels, setWeeklyDurationLabels] = useState([]);
  const [weeklyDurationValues, setWeeklyDurationValues] = useState([]);

  const [monthlyDistanceLabels, setMonthlyDistanceLabels] = useState([]);
  const [monthlyDistanceValues, setMonthlyDistanceValues] = useState([]);

  const [weeklyPaceLabels, setWeeklyPaceLabels] = useState([]);
  const [weeklyPaceValues, setWeeklyPaceValues] = useState([]);

  const [totalDistance, setTotalDistance] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [totalSessions, setTotalSessions] = useState(0);

  const [bestTimes, setBestTimes] = useState(null);

  // -------------------------------------------------------
  // Cardio-Einträge laden
  // -------------------------------------------------------
  async function loadEntries() {
    const { data: { user } } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from("cardio_entries")
      .select("*")
      .eq("user_id", user.id)
      .order("date", { ascending: false });

    if (!error) {
      setEntries(data);
    }
  }

  useEffect(() => {
    loadEntries();
  }, []);

  // -------------------------------------------------------
  // Gefilterte Einträge
  // -------------------------------------------------------
  const filteredEntries =
    sportFilter === "alle"
      ? entries
      : entries.filter((e) => e.exercise_type === sportFilter);

  useEffect(() => {
    calculateWeeklyDistance(filteredEntries);
    calculateWeeklyDuration(filteredEntries);
    calculateMonthlyDistance(filteredEntries);
    calculateWeeklyPace(filteredEntries);
    calculateTotals(filteredEntries);
    setBestTimes(calculateBestTimes(filteredEntries));
  }, [filteredEntries]);

  // -------------------------------------------------------
  // Distanz pro Woche
  // -------------------------------------------------------
  function calculateWeeklyDistance(data) {
    const weekly = {};

    data.forEach((entry) => {
      const d = new Date(entry.date);
      const oneJan = new Date(d.getFullYear(), 0, 1);
      const week = Math.ceil(
        ((d - oneJan) / 86400000 + oneJan.getDay() + 1) / 7
      );

      const key = `KW ${week}`;

      if (!weekly[key]) weekly[key] = 0;
      weekly[key] += entry.distance_m;
    });

    setWeeklyDistanceLabels(Object.keys(weekly));
    setWeeklyDistanceValues(Object.values(weekly));
  }

  // -------------------------------------------------------
  // Dauer pro Woche
  // -------------------------------------------------------
  function calculateWeeklyDuration(data) {
    const weekly = {};

    data.forEach((entry) => {
      const d = new Date(entry.date);
      const oneJan = new Date(d.getFullYear(), 0, 1);
      const week = Math.ceil(
        ((d - oneJan) / 86400000 + oneJan.getDay() + 1) / 7
      );

      const key = `KW ${week}`;

      if (!weekly[key]) weekly[key] = 0;
      weekly[key] += entry.duration_min || 0;
    });

    setWeeklyDurationLabels(Object.keys(weekly));
    setWeeklyDurationValues(Object.values(weekly));
  }

  // -------------------------------------------------------
  // Distanz pro Monat
  // -------------------------------------------------------
  function calculateMonthlyDistance(data) {
    const monthly = {};

    const monthNames = [
      "Jan", "Feb", "Mär", "Apr", "Mai", "Jun",
      "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"
    ];

    data.forEach((entry) => {
      const d = new Date(entry.date);
      const month = d.getMonth();
      const key = monthNames[month];

      if (!monthly[key]) monthly[key] = 0;
      monthly[key] += entry.distance_m;
    });

    setMonthlyDistanceLabels(Object.keys(monthly));
    setMonthlyDistanceValues(Object.values(monthly));
  }

  // -------------------------------------------------------
  // Pace pro Woche
  // -------------------------------------------------------
  function calculateWeeklyPace(data) {
    const weekly = {};

    data.forEach((entry) => {
      if (!entry.duration_min || entry.duration_min === 0) return;
      if (!entry.distance_m || entry.distance_m === 0) return;

      const d = new Date(entry.date);
      const oneJan = new Date(d.getFullYear(), 0, 1);
      const week = Math.ceil(
        ((d - oneJan) / 86400000 + oneJan.getDay() + 1) / 7
      );

      const key = `KW ${week}`;

      const pace = entry.duration_min / (entry.distance_m / 1000);

      if (!weekly[key]) weekly[key] = [];
      weekly[key].push(pace);
    });

    const labels = Object.keys(weekly);
    const values = labels.map((week) => {
      const arr = weekly[week];
      return arr.reduce((a, b) => a + b, 0) / arr.length;
    });

    setWeeklyPaceLabels(labels);
    setWeeklyPaceValues(values);
  }

  // -------------------------------------------------------
  // Gesamtstatistiken
  // -------------------------------------------------------
  function calculateTotals(data) {
    let dist = 0;
    let dur = 0;

    data.forEach((entry) => {
      dist += entry.distance_m;
      dur += entry.duration_min || 0;
    });

    setTotalDistance(dist);
    setTotalDuration(dur);
    setTotalSessions(data.length);
  }

  // -------------------------------------------------------
  // Bestzeiten
  // -------------------------------------------------------
  function calculateBestTimes(data) {
    if (data.length === 0) return null;

    const longestDistance = Math.max(...data.map((e) => e.distance_m));

    const shortestDuration = Math.min(
      ...data.filter((e) => e.duration_min > 0).map((e) => e.duration_min)
    );

    const paces = data
      .filter((e) => e.duration_min > 0 && e.distance_m > 0)
      .map((e) => e.duration_min / (e.distance_m / 1000));

    const bestPace = Math.min(...paces);

    const longestDuration = Math.max(...data.map((e) => e.duration_min || 0));

    const avgPace =
      paces.reduce((a, b) => a + b, 0) / paces.length;

    return {
      longestDistance,
      shortestDuration,
      bestPace,
      longestDuration,
      avgPace
    };
  }

  // -------------------------------------------------------
  // UI
  // -------------------------------------------------------
  return (
    <div style={{ padding: "20px" }}>
      <h1>Cardio Dashboard</h1>

      {/* Sportarten-Filter */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <button onClick={() => setSportFilter("alle")}>Alle</button>

        <button onClick={() => setSportFilter("laufen")}>
          <FaRunning size={18} /> Laufen
        </button>

        <button onClick={() => setSportFilter("radfahren")}>
          <FaBiking size={18} /> Radfahren
        </button>

        <button onClick={() => setSportFilter("schwimmen")}>
          <FaSwimmer size={18} /> Schwimmen
        </button>
      </div>

      {/* Gesamtstatistiken */}
      <div style={{ display: "flex", gap: "20px", marginBottom: "30px" }}>
        <div style={{ padding: "10px", border: "1px solid gray" }}>
          <h3>Gesamt Distanz</h3>
          <p>{totalDistance} m</p>
        </div>

        <div style={{ padding: "10px", border: "1px solid gray" }}>
          <h3>Gesamt Dauer</h3>
          <p>{totalDuration} min</p>
        </div>

        <div style={{ padding: "10px", border: "1px solid gray" }}>
          <h3>Sessions</h3>
          <p>{totalSessions}</p>
        </div>
      </div>

      {/* Bestzeiten */}
      {bestTimes && (
        <div style={{ marginTop: "30px" }}>
          <h2>Bestzeiten</h2>

          <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
            <div style={{ padding: "10px", border: "1px solid gray" }}>
              <h3><FaRunning /> Längste Distanz</h3>
              <p>{bestTimes.longestDistance} m</p>
            </div>

            <div style={{ padding: "10px", border: "1px solid gray" }}>
              <h3><FaRunning /> Kürzeste Dauer</h3>
              <p>{bestTimes.shortestDuration} min</p>
            </div>

            <div style={{ padding: "10px", border: "1px solid gray" }}>
              <h3><FaRunning /> Beste Pace</h3>
              <p>{bestTimes.bestPace.toFixed(2)} min/km</p>
            </div>

            <div style={{ padding: "10px", border: "1px solid gray" }}>
              <h3><FaRunning /> Längste Session</h3>
              <p>{bestTimes.longestDuration} min</p>
            </div>

            <div style={{ padding: "10px", border: "1px solid gray" }}>
              <h3><FaRunning /> Ø Pace</h3>
              <p>{bestTimes.avgPace.toFixed(2)} min/km</p>
            </div>
          </div>
        </div>
      )}

      <h2>Distanz pro Woche</h2>
      <WeeklyDistanceChart labels={weeklyDistanceLabels} values={weeklyDistanceValues} />

      <h2>Dauer pro Woche</h2>
      <WeeklyDurationChart labels={weeklyDurationLabels} values={weeklyDurationValues} />

      <h2>Pace pro Woche</h2>
      <WeeklyPaceChart labels={weeklyPaceLabels} values={weeklyPaceValues} />

      <h2>Distanz pro Monat</h2>
      <MonthlyDistanceChart labels={monthlyDistanceLabels} values={monthlyDistanceValues} />

      <h2>Letzte Einträge</h2>
      <ul>
        {filteredEntries.slice(0, 5).map((entry) => (
          <li
            key={entry.id}
            style={{ display: "flex", alignItems: "center", gap: "10px" }}
          >
            <SportIcon type={entry.exercise_type} size={22} />
            {entry.date} – {entry.exercise} – {entry.distance_m} m
            {entry.duration_min ? ` – ${entry.duration_min} min` : ""}
          </li>
        ))}
      </ul>
    </div>
  );
}