"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

export default function NeonLineChart({ labels, values }) {
  const data = {
    labels,
    datasets: [
      {
        label: "Volumen",
        data: values,
        borderColor: "#00ff9d",
        borderWidth: 3,
        pointRadius: 5,
        pointBackgroundColor: "#00ff9d",
        tension: 0.35,
        shadowColor: "#00ff9d",
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

  return <Line data={data} options={options} />;
}