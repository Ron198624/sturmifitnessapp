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
  const colors = [
    "#00ff9d",
    "#00c8ff",
    "#ff9d00",
    "#ff0066",
    "#a855f7",
    "#22d3ee",
  ];

  const data = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: colors,
        borderColor: "#000",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    plugins: {
      legend: { labels: { color: "#fff" } },
    },
  };

  return <Doughnut data={data} options={options} />;
}