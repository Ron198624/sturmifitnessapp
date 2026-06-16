"use client";

import { useEffect, useState } from "react";
import { getSupabaseClient } from "@/app/lib/supabaseClient";
const supabase = getSupabaseClient();
import { BarChart, PieChart } from "@/app/components/ChartComponent";

export default function VerlaufPage() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    async function loadEntries() {
      const { data, error } = await supabase
        .from("training_entries")
        .select("*")
        .order("Datum", { ascending: true });

      if (error) {
        console.error("Fehler beim Laden:", error);
        return;
      }

      const mapped = data.map((row) => ({
        id: row.id,
        datum: row.Datum,
        uebung: row.Übung,
        gewicht: row.Gewicht,
        wiederholungen: row.Wiederholungen,
      }));

      setEntries(mapped);
    }

    loadEntries();
  }, []);

  return (
    <div className="container">

      {/* --- Überschrift Card --- */}
      <div className="card">
        <h1>Trainingsverlauf</h1>
        <p className="text-muted">
          Übersicht deiner bisherigen Trainingseinträge und grafische Auswertung.
        </p>
      </div>

      {/* --- Chart Card --- */}
      <div className="card">
        <h2>Analyse</h2>

        {entries.length === 0 ? (
          <p>Keine Daten vorhanden.</p>
        ) : (
          <>
            <BarChart entries={entries} />
            <PieChart entries={entries} />
          </>
        )}
      </div>

      {/* --- Einträge Card --- */}
      <div className="card">
        <h2>Alle Einträge</h2>

        {entries.length === 0 ? (
          <p>Noch keine Einträge vorhanden.</p>
        ) : (
          <ul>
            {entries.map((entry) => (
              <li key={entry.id} style={{ marginBottom: "12px" }}>
                <strong>{entry.datum}</strong> – {entry.uebung} –{" "}
                {entry.gewicht} kg × {entry.wiederholungen}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}