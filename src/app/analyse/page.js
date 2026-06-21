// src/app/analyse/page.js

"use client";

import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement
);

export default function AnalysePage() {
  const volumenProUebung = {
    labels: ["Rudermaschine", "Butterfly", "Brustpresse", "Reverse Butterfly", "Latzug", "Bizepscurl", "Beinpresse"],
    datasets: [{ label: "Werte", data: [12000, 8000, 15000, 7000, 11000, 5000, 14000], backgroundColor: "rgba(0,255,100,0.8)" }],
  };

  const wochenVolumen = {
    labels: ["Werte"],
    datasets: [{ label: "Werte", data: [25000], backgroundColor: "rgba(0,255,100,0.8)" }],
  };

  const muskelgruppen = {
    labels: ["Brust", "Rücken", "Beine", "Schultern", "Arme", "Core", "Ganzkörper"],
    datasets: [{
      data: [20, 30, 15, 10, 10, 5, 10],
      backgroundColor: [
        "rgba(0,255,100,0.8)",
        "rgba(0,120,255,0.8)",
        "rgba(150,75,0,0.8)",
        "rgba(180,0,255,0.8)",
        "rgba(255,255,0,0.8)",
        "rgba(0,255,255,0.8)",
        "rgba(0,0,150,0.8)",
      ],
    }],
  };

  return (
    <div className="w-full min-h-screen bg-black flex flex-col items-center px-4 pb-24">

      <div className="bg-black backdrop-blur-xl border border-gray-700 rounded-2xl p-8 
                      shadow-[0_0_25px_rgba(0,255,150,0.25)] w-full max-w-2xl mt-10 text-center">
        <h1 className="text-4xl font-extrabold text-[#00ff9d]">Analyse</h1>
      </div>

      <div className="bg-black backdrop-blur-xl border border-gray-700 rounded-2xl p-8 
                      shadow-[0_0_25px_rgba(0,255,150,0.25)] w-full max-w-2xl mt-10">
        <h2 className="text-2xl font-bold mb-4 text-[#00ff9d]">Volumen pro Übung</h2>
        <Bar data={volumenProUebung} />
      </div>

      <div className="bg-black backdrop-blur-xl border border-gray-700 rounded-2xl p-8 
                      shadow-[0_0_25px_rgba(0,255,150,0.25)] w-full max-w-2xl mt-10">
        <h2 className="text-2xl font-bold mb-4 text-[#00ff9d]">Wochenvolumen</h2>
        <Bar data={wochenVolumen} />
      </div>

      <div className="bg-black backdrop-blur-xl border border-gray-700 rounded-2xl p-8 
                      shadow-[0_0_25px_rgba(0,255,150,0.25)] w-full max-w-2xl mt-10">
        <h2 className="text-2xl font-bold mb-4 text-[#00ff9d]">Muskelgruppen Übersicht</h2>
        <Pie data={muskelgruppen} />
      </div>

    </div>
  );
}