export default function UebungenPage() {
  const uebungen = [
    { name: "Rudermaschine", muskel: "Rücken" },
    { name: "Brustpresse", muskel: "Brust" },
    { name: "Butterfly", muskel: "Brust" },
    { name: "Reverse Butterfly", muskel: "Schultern / oberer Rücken" },
    { name: "Latzug", muskel: "Rücken" },
    { name: "Beinpresse", muskel: "Beine" },
    { name: "Bizepscurl", muskel: "Bizeps" }
  ];

  return (
    <div className="container">

      <div className="card">
        <h1>Übungen</h1>
        <p style={{ color: "var(--text-dim)", marginBottom: "20px" }}>
          Deine komplette Trainingsliste im Neon‑Cyber‑Gym‑Style.
        </p>

        <ul>
          {uebungen.map((uebung, index) => (
            <li key={index} style={{ display: "flex", justifyContent: "space-between" }}>
              <strong style={{ color: "var(--neon)", textShadow: "var(--neon-glow)" }}>
                {uebung.name}
              </strong>
              <span style={{ color: "var(--text-dim)" }}>{uebung.muskel}</span>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}
