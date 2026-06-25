// src/app/uebungen/page.js
"use client";

import { muscleMap } from "../muscleMap";

export default function UebungenPage() {
  // Alle Übungen dynamisch aus muscleMap holen
  const allExercises = Object.keys(muscleMap).sort();

  return (
    <div className="w-full min-h-screen px-4 pb-24 flex flex-col items-center">

      {/* HEADER */}
      <div className="bg-black backdrop-blur-xl border border-gray-700 rounded-2xl p-8 
                      shadow-[0_0_25px_rgba(0,255,150,0.25)] w-full max-w-3xl mt-10 text-center">
        <h1 className="text-4xl font-extrabold text-[#00ff9d]">Übungen</h1>
        <p className="text-gray-400 mt-2">
          Alle verfügbaren Übungen – automatisch aus deiner muscleMap
        </p>
      </div>

      {/* ÜBUNGSLISTE */}
      <div className="bg-black backdrop-blur-xl border border-gray-700 rounded-2xl p-8 
                      shadow-[0_0_25px_rgba(0,255,150,0.25)] w-full max-w-3xl mt-10">

        <h2 className="text-2xl font-bold text-[#00ff9d] mb-6">Übungsliste</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {allExercises.map((exercise) => (
            <div
              key={exercise}
              className="bg-gray-900 border border-gray-700 rounded-2xl p-4 text-center 
                         text-white text-lg shadow-[0_0_15px_rgba(0,255,150,0.2)]"
            >
              {exercise}
            </div>
          ))}
        </div>

      </div>

    </div>
  );
}

