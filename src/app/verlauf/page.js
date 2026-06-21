"use client";

export default function VerlaufPage() {
  return (
    <div className="w-full min-h-screen bg-black flex flex-col items-center px-4 pb-24">

      {/* HEADER */}
      <div className="bg-black backdrop-blur-xl border border-gray-700 rounded-2xl p-8 
                      shadow-[0_0_25px_rgba(0,255,150,0.25)] w-full max-w-3xl mt-10 text-center">
        <h1 className="text-4xl font-extrabold text-[#00ff9d]">Verlauf</h1>
      </div>

      {/* LISTE */}
      <div className="bg-black backdrop-blur-xl border border-gray-700 rounded-2xl p-8 
                      shadow-[0_0_25px_rgba(0,255,150,0.25)] w-full max-w-3xl mt-10">

        <h2 className="text-2xl font-bold mb-6 text-[#00ff9d]">Letzte Einträge</h2>

        <div className="space-y-4 text-white text-xl">

          <div className="border border-gray-700 rounded-xl p-4 bg-gray-900">
            <p className="font-bold text-[#00ff9d]">Rudermaschine</p>
            <p>4 × 12 × 40 kg</p>
            <p className="text-gray-400 text-sm">vor 2 Tagen</p>
          </div>

          <div className="border border-gray-700 rounded-xl p-4 bg-gray-900">
            <p className="font-bold text-[#00ff9d]">Laufen</p>
            <p>2 km – 12 Minuten</p>
            <p className="text-gray-400 text-sm">vor 3 Tagen</p>
          </div>

          <div className="border border-gray-700 rounded-xl p-4 bg-gray-900">
            <p className="font-bold text-[#00ff9d]">Brustpresse</p>
            <p>3 × 10 × 55 kg</p>
            <p className="text-gray-400 text-sm">vor 5 Tagen</p>
          </div>

        </div>

      </div>

    </div>
  );
}