"use client";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

// -------------------------------------------------------
// Distanz pro Woche
// -------------------------------------------------------
export function WeeklyDistanceChart({ labels, values }) {
  return (
    <Bar
      data={{
        labels,
        datasets: [
          {
            label: "Distanz pro Woche (m)",
            data: values,
            backgroundColor: "#0070f3"
          }
        ]
      }}
    />
  );
}

// -------------------------------------------------------
// Dauer pro Woche
// -------------------------------------------------------
export function WeeklyDurationChart({ labels, values }) {
  return (
    <Bar
      data={{
        labels,
        datasets: [
          {
            label: "Dauer pro Woche (Minuten)",
            data: values,
            backgroundColor: "#f39c12"
          }
        ]
      }}
    />
  );
}
// -------------------------------------------------------
// Distanz pro Monat
// -------------------------------------------------------
export function MonthlyDistanceChart({ labels, values }) {
  return (
    <Bar
      data={{
        labels,
        datasets: [
          {
            label: "Distanz pro Monat (m)",
            data: values,
            backgroundColor: "#2ecc71"
          }
        ]
      }}
    />
  );
}
// -------------------------------------------------------
// Pace pro Woche (min/km)
// -------------------------------------------------------
export function WeeklyPaceChart({ labels, values }) {
  return (
    <Bar
      data={{
        labels,
        datasets: [
          {
            label: "Pace pro Woche (min/km)",
            data: values,
            backgroundColor: "#9b59b6"
          }
        ]
      }}
    />
  );
}