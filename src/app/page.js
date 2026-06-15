export default function HomePage() {
  return (
    <div className="container">

      <div className="card" style={{ textAlign: "center", padding: "60px 30px" }}>
        <h1>Willkommen bei SturmiFitness</h1>

        <p style={{ color: "var(--text-dim)", fontSize: "1.2rem", marginBottom: "30px" }}>
          Deine futuristische Fitness‑App für Analyse, Fortschritt und smarte Trainingsdaten.
        </p>

        <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
          <a href="/uebungen" className="btn">Übungen ansehen</a>
          <a href="/analyse" className="btn-secondary">Analyse starten</a>
        </div>
      </div>

      <div className="card">
        <h2>Was dich erwartet</h2>

        <ul>
          <li>📊 Fortschrittliche Trainingsanalyse</li>
          <li>💪 Übersicht deiner Übungen</li>
          <li>🧠 Automatische Volumen‑ und PR‑Berechnung</li>
          <li>🔥 Neon‑Cyber‑Gym‑Design für maximale Motivation</li>
        </ul>
      </div>

    </div>
  );
}
