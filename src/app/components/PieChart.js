"use client";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart({ data }) {
  const labels = Object.keys(data);
  const values = Object.values(data);

  return (
    <Pie
      data={{
        labels,
        datasets: [
          {
            data: values,
            backgroundColor: [
              "rgba(0,255,100,0.6)",
              "rgba(0,150,255,0.6)",
              "rgba(255,100,0,0.6)",
              "rgba(255,0,150,0.6)",
              "rgba(200,200,0,0.6)",
            ],
          },
        ],
      }}
    />
  );
}