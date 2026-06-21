// src/app/training/page.js

"use client";

export default function TrainingPage() {
  return (
    <div className="w-full px-4 pb-24 flex flex-col items-center min-h-screen">

      {/* HEADER CONTAINER */}
      <div className="bg-black/90 backdrop-blur-xl border border-gray-700 rounded-2xl p-8 
                      shadow-[0_0_25px_rgba(0,255,150,0.25)] w-full max-w-2xl mt-10 text-center">
        <h1 className="text-4xl font-extrabold text-[#00ff9d]">Training</h1>
      </div>

      {/* FORM CONTAINER */}
      <div className="bg-black/90 backdrop-blur-xl border border-gray-700 rounded-2xl p-8 
                      shadow-[0_0_25px_rgba(0,255,150,0.25)] w-full max-w-2xl mt-10">

        {/* Übung */}
        <label className="text-xl text-white">Übung</label>
        <select className="w-full h-16 px-5 text-xl rounded-2xl bg-gray-900 border border-gray-700 
                           text-white mt-2 mb-6">
          <option>Bitte wählen...</option>
          <option>Rudermaschine</option>
          <option>Butterfly</option>
          <option>Brustpresse</option>
          <option>Latzug</option>
        </select>

        {/* Gewicht */}
        <label className="text-xl text-white">Gewicht (kg)</label>
        <input
          type="number"
          className="w-full h-16 px-5 text-xl rounded-2xl bg-gray-900 border border-gray-700 
                     text-white mt-2 mb-6"
        />

        {/* Wiederholungen */}
        <label className="text-xl text-white">Wiederholungen</label>
        <input
          type="number"
          className="w-full h-16 px-5 text-xl rounded-2xl bg-gray-900 border border-gray-700 
                     text-white mt-2 mb-6"
        />

        {/* Sätze */}
        <label className="text-xl text-white">Sätze</label>
        <input
          type="number"
          className="w-full h-16 px-5 text-xl rounded-2xl bg-gray-900 border border-gray-700 
                     text-white mt-2 mb-6"
        />

        {/* Button */}
        <button className="w-full h-16 text-2xl font-bold rounded-2xl bg-[#00ff9d] text-black 
                           shadow-[0_0_20px_rgba(0,255,150,0.6)] hover:bg-purple-500 hover:text-white 
                           transition">
          Speichern
        </button>

      </div>

    </div>
  );
}