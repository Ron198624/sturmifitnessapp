export default function HomePage() {
  return (
    <div className="container">

      {/* Hero Card */}
      <div className="card">
        <h1>Willkommen bei SturmiFitness</h1>
        <p className="text-muted">
          Deine persönliche Fitness‑App zum Erfassen, Analysieren und Verbessern deiner Trainingsleistungen.
        </p>

        <div style={{ marginTop: "20px", display: "flex", gap: "12px" }}>
          <a href="/training" className="btn">Training erfassen</a>
          <a href="/verlauf" className="btn-secondary">Verlauf ansehen</a>
        </div>
      </div>

      {/* Info Card */}
      <div className="card">
        <h2>Was du hier machen kannst</h2>
        <ul>
          <li>Trainingseinträge speichern</li>
          <li>Deine Fortschritte analysieren</li>
          <li>Übungen verwalten</li>
          <li>Diagramme und Statistiken ansehen</li>
        </ul>
      </div>

    </div>
  );
}
