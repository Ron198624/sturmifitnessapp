// src/app/page.js

export default function HomePage() {
  return (
    <div className="w-full px-4 pb-24 flex flex-col items-center min-h-screen">

      {/* HERO CARD */}
      <div className="bg-[rgba(20,20,20,0.8)] border border-gray-700 rounded-2xl p-6 backdrop-blur-md shadow-[0_0_20px_rgba(0,255,150,0.15)] text-center w-full max-w-2xl mt-10">
        <h1 className="text-4xl font-extrabold mb-6 text-[#00ff9d]">
          Willkommen bei SturmFitness
        </h1>

        <p className="text-gray-300 text-xl mb-10">
          Deine futuristische FitnessApp für Analyse, Fortschritt und smarte Trainingsdaten.
        </p>

        {/* BUTTONS */}
        <div className="flex flex-col sm:flex-row justify-center gap-6">

          <a
            href="/uebungen"
            className="min-w-[220px] px-10 py-6 text-2xl font-bold rounded-3xl border border-gray-700 bg-gray-900 text-[#00ff9d] text-center 
                       transition shadow-[0_0_20px_rgba(0,255,0,0.6)] 
                       hover:shadow-[0_0_36px_rgba(168,85,247,1)] hover:border-purple-500 hover:text-purple-400"
          >
            Übungen ansehen
          </a>

          <a
            href="/analyse"
            className="min-w-[220px] px-10 py-6 text-2xl font-bold rounded-3xl border border-purple-700 bg-gray-900 text-purple-300 text-center 
                       transition shadow-[0_0_20px_rgba(168,85,247,0.6)] 
                       hover:shadow-[0_0_36px_rgba(168,85,247,1)] hover:border-purple-500 hover:text-purple-400"
          >
            Analyse starten
          </a>

        </div>
      </div>

      {/* FEATURE CARD */}
      <div className="bg-[rgba(20,20,20,0.8)] border border-gray-700 rounded-2xl p-6 backdrop-blur-md shadow-[0_0_20px_rgba(0,255,150,0.15)] w-full max-w-2xl mt-10">
        <h2 className="text-3xl font-semibold mb-6 text-[#00ff9d]">Was dich erwartet</h2>

        <ul className="space-y-3 text-xl text-gray-300">
          <li>📊 Fortschrittliche Trainingsanalyse</li>
          <li>💪 Übersicht deiner Übungen</li>
          <li>🧠 Automatische Volumen- und PR-Berechnung</li>
          <li>🔥 Neon-Cyber-Gym-Design für maximale Motivation</li>
        </ul>
      </div>

    </div>
  );
}