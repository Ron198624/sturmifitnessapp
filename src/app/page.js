export default function HomePage() {
  return (
    <div className="container mx-auto px-4 pb-24">

      {/* Willkommen-Karte */}
      <div className="card text-center py-10 px-6">
        <h1 className="text-3xl font-bold mb-4">Willkommen bei SturmFitness</h1>

        <p className="text-gray-300 text-lg mb-6">
          Deine futuristische FitnessApp für Analyse, Fortschritt und smarte Trainingsdaten.
        </p>

        <div className="flex justify-center gap-4">
          <a href="/uebungen" className="btn">Übungen ansehen</a>
          <a href="/analyse" className="btn-secondary">Analyse starten</a>
        </div>
      </div>

      {/* Feature-Liste */}
      <div className="card mt-6">
        <h2 className="text-2xl font-semibold mb-4">Was dich erwartet</h2>

        <ul className="space-y-2 text-lg">
          <li>📊 Fortschrittliche Trainingsanalyse</li>
          <li>💪 Übersicht deiner Übungen</li>
          <li>🧠 Automatische Volumen- und PR-Berechnung</li>
          <li>🔥 Neon-Cyber-Gym-Design für maximale Motivation</li>
        </ul>
      </div>

    </div>
  );
}
