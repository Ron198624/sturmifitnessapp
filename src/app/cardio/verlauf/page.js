"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import {
  WeeklyDistanceChart,
  WeeklyDurationChart,
  MonthlyDistanceChart
} from "@/app/components/CardioCharts";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function CardioVerlaufPage() {
  const [entries, setEntries] = useState([]);

  const [weeklyDistanceLabels, setWeeklyDistanceLabels] = useState([]);
  const [weeklyDistanceValues, setWeeklyDistanceValues] = useState([]);

  const [weeklyDurationLabels, setWeeklyDurationLabels] = useState([]);
  const [weeklyDurationValues, setWeeklyDurationValues] = useState([]);

  const [monthlyDistanceLabels, setMonthlyDistanceLabels] = useState([]);
  const [monthlyDistanceValues, setMonthlyDistanceValues] = useState([]);

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
      calculateWeeklyDistance(data);
      calculateWeeklyDuration(data);
      calculateMonthlyDistance(data);
    }
  }

  useEffect(() => {
    loadEntries();
  }, []);

  // -------------------------------------------------------
  // Distanz pro Woche
  // -------------------------------------------------------
  function calculateWeeklyDistance(data) {
    const weekly = {};

    data.forEach((entry) => {
      const d = new Date(entry.date);
      const oneJan = new Date(d.getFullYear(), 0, 1);
      const week = Math.ceil((((d - oneJan) / 86400000) + oneJan.getDay() + 1) / 7);

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
      const week = Math.ceil((((d - oneJan) / 86400000) + oneJan.getDay() + 1) / 7);

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
      const month = d.getMonth(); // 0–11
      const key = monthNames[month];

      if (!monthly[key]) monthly[key] = 0;
      monthly[key] += entry.distance_m;
    });

    setMonthlyDistanceLabels(Object.keys(monthly));
    setMonthlyDistanceValues(Object.values(monthly));
  }

  // -------------------------------------------------------
  // UI
  // -------------------------------------------------------
  return (
    <div style={{ padding: "20px" }}>
      <h1>Cardio Verlauf</h1>

      <h2>Distanz pro Woche</h2>
      <WeeklyDistanceChart
        labels={weeklyDistanceLabels}
        values={weeklyDistanceValues}
      />

      <h2>Dauer pro Woche</h2>
      <WeeklyDurationChart
        labels={weeklyDurationLabels}
        values={weeklyDurationValues}
      />

      <h2>Distanz pro Monat</h2>
      <MonthlyDistanceChart
        labels={monthlyDistanceLabels}
        values={monthlyDistanceValues}
      />

      <h2>Alle Einträge</h2>
      <ul>
        {entries.map((entry) => (
          <li key={entry.id}>
            {entry.date} – {entry.exercise} – {entry.distance_m} m
            {entry.duration_min ? ` – ${entry.duration_min} min` : ""}
          </li>
        ))}
      </ul>
    </div>
  );
}