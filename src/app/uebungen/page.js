// src/app/uebungen/page.js

export default function UebungenPage() {
  const uebungen = [
    "Rudermaschine",
    "Butterfly",
    "Brustpresse",
    "Reverse Butterfly",
    "Latzug",
    "Bizepscurl",
    "Beinpresse",
  ];

  return (
    <div className="w-full px-4 pb-24 flex flex-col items-center min-h-screen">

      {/* HEADER */}
      <div className="bg-black/90 backdrop-blur-xl border border-gray-700 rounded-2xl p-8 shadow-[0_0_25px_rgba(0,255,150,0.25)] w-full max-w-2xl mt-10 text-center">
        <h1 className="text-4xl font-extrabold text-[#00ff9d]">Übungen</h1>
        <p className="text-gray-300 text-lg mt-2">Deine komplette Trainingsliste</p>
      </div>

      {/* LISTE */}
      <div className="w-full max-w-2xl mt-8 space-y-4">
        {uebungen.map((name, index) => (
          <div
            key={index}
            className="bg-black/90 backdrop-blur-xl border border-gray-700 rounded-xl p-5 shadow-[0_0_15px_rgba(0,255,150,0.25)]"
          >
            <p className="text-xl text-white">{name}</p>
          </div>
        ))}
      </div>

    </div>
  );
}
