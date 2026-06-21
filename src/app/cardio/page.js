"use client";

export default function CardioPage() {
  return (
    <div className="w-full min-h-screen bg-black flex flex-col items-center px-4 pb-24">

      {/* HEADER */}
      <div className="bg-black backdrop-blur-xl border border-gray-700 rounded-2xl p-8 
                      shadow-[0_0_25px_rgba(0,255,150,0.25)] w-full max-w-2xl mt-10 text-center">
        <h1 className="text-4xl font-extrabold text-[#00ff9d]">Cardio</h1>
      </div>

      {/* FORM */}
      <div className="bg-black backdrop-blur-xl border border-gray-700 rounded-2xl p-8 
                      shadow-[0_0_25px_rgba(0,255,150,0.25)] w-full max-w-2xl mt-10">

        {/* Art */}
        <label className="text-xl text-white">Art</label>
        <select className="w-full h-16 px-5 text-xl rounded-2xl bg-gray-900 border border-gray-700 
                           text-white mt-2 mb-6">
          <option>Bitte wählen...</option>
          <option>Laufen</option>
          <option>Radfahren</option>
          <option>Schwimmen</option>
        </select>

        {/* Distanz */}
        <label className="text-xl text-white">Distanz</label>
        <input
          type="number"
          className="w-full h-16 px-5 text-xl rounded-2xl bg-gray-900 border border-gray-700 
                     text-white mt-2 mb-6"
          placeholder="in km oder m"
        />

        {/* Dauer */}
        <label className="text-xl text-white">Dauer (Minuten)</label>
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