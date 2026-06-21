// src/app/verlauf/page.js

"use client";

export default function VerlaufPage() {
  const eintraege = [
    { datum: "20.06.2026", text: "Rudermaschine – 23kg – 6×3" },
    { datum: "19.06.2026", text: "Butterfly – 35kg – 10×4" },
    { datum: "18.06.2026", text: "Latzug – 45kg – 8×3" },
  ];

  return (
    <div className="w-full px-4 pb-24 flex flex-col items-center min-h-screen">

      {/* HEADER */}
      <div className="bg-black/90 backdrop-blur-xl border border-gray-700 rounded-2xl p-8 
                      shadow-[0_0_25px_rgba(0,255,150,0.25)] w-full max-w-2xl mt-10 text-center">
        <h1 className="text-4xl font-extrabold text-[#00ff9d]">Verlauf</h1>
      </div>

      {/* LISTE */}
      <div className="w-full max-w-2xl mt-8 space-y-4">
        {eintraege.map((e, i) => (
          <div
            key={i}
            className="bg-black/90 backdrop-blur-xl border border-gray-700 rounded-xl p-5 
                       shadow-[0_0_15px_rgba(0,255,150,0.25)]"
          >
            <p className="text-lg text-gray-400">{e.datum}</p>
            <p className="text-xl text-white">{e.text}</p>
          </div>
        ))}
      </div>

    </div>
  );
}