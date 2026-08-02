"use client";

import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function NeonDonutChart({ labels, values }) {
  const data = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: [
          "#00ff9d",
          "#38bdf8",
          "#f97316",
          "#ec4899",
          "#8b5cf6",
          "#14b8a6",
        ],
        borderColor: "rgba(0,0,0,0.6)",
        borderWidth: 2,
        hoverOffset: 12,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // ⭐ wichtig für Mobile
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#fff",
          font: { size: 12 },
        },
      },
      tooltip: {
        backgroundColor: "#000",
        titleColor: "#00ff9d",
        bodyColor: "#fff",
        borderColor: "#00ff9d",
        borderWidth: 1,
      },
    },
    cutout: "55%", // Donut‑Loch
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-full h-full">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
}