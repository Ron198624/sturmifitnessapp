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

export default function BarChart({ labels, values, seriesLabels }) {
  const data = {
    labels,
    datasets: Array.isArray(values[0])
      ? values.map((v, i) => ({
          label: seriesLabels?.[i] || `Serie ${i + 1}`,
          data: v,
          backgroundColor: `rgba(${50 + i * 50}, 255, 100, 0.6)`,
        }))
      : [
          {
            label: seriesLabels?.[0] || "Werte",
            data: values,
            backgroundColor: "rgba(0, 255, 100, 0.6)",
          },
        ],
  };

  return <Bar data={data} />;
}