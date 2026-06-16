"use client";

import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement
} from "chart.js";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement
);

export function BarChart({ labels, values }) {
  return (
    <Bar
      data={{
        labels,
        datasets: [
          {
            label: "Volumen (kg)",
            data: values,
            backgroundColor: "#0070f3"
          }
        ]
      }}
    />
  );
}

export function PieChart({ labels, values }) {
  return (
    <Pie
      data={{
        labels,
        datasets: [
          {
            data: values,
            backgroundColor: [
              "#0070f3",
              "#ff4081",
              "#ffa000",
              "#00c853",
              "#7c4dff",
              "#ff1744"
            ]
          }
        ]
      }}
    />
  );
}