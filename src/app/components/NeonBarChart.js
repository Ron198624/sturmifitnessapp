"use client";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function NeonBarChart({ labels, values }) {
  const data = {
    labels,
    datasets: [
      {
        label: "Volumen",
        data: values,
        backgroundColor: "rgba(0,255,157,0.7)",
        borderColor: "#00ff9d",
        borderWidth: 2,
        hoverBackgroundColor: "rgba(0,255,157,1)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { labels: { color: "#fff" } },
    },
    scales: {
      x: { ticks: { color: "#aaa" }, grid: { color: "#333" } },
      y: { ticks: { color: "#aaa" }, grid: { color: "#333" } },
    },
  };

  return <Bar data={data} options={options} />;
}