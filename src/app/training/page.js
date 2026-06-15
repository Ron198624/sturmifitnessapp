"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/app/lib/supabaseClient";

export default function TrainingPage() {
  const [datum, setDatum] = useState("");
  const [uebung, setUebung] = useState("");
  const [gewicht, setGewicht] = useState("");
  const [wiederholungen, setWiederholungen] = useState("");
  const [entries, setEntries] = useState([]);

  const [editMode, setEditMode] = useState(false);
  const [editEntry, setEditEntry] = useState(null);

  const uebungsliste = [
    "Rudermaschine",
    "Brustpresse",
    "Butterfly",
    "Reverse Butterfly",
    "Latzug",
    "Beinpresse",
    "Bizepscurl",
  ];

  // -----------------------------
  // 1. Daten aus Supabase laden
  // -----------------------------
  useEffect(() => {
    async function loadEntries() {
      const { data, error } = await supabase
        .from("training_entries")
        .select("*")
        .order("Datum", { ascending: true });

      if (error) {
        console.error("Supabase Load Fehler:", error);
        return;
      }

      const mapped = data.map((row) => ({
        id: row.id,
        datum: row.Datum,
        uebung: row.Übung,
        gewicht: row.Gewicht,
        wiederholungen: row.Wiederholungen,
        volumen: row.Gewicht * row.Wiederholungen,
      }));

      setEntries(mapped);
    }

    loadEntries();
  }, []);

  // -----------------------------
  // 2. Neuen Eintrag speichern
  // -----------------------------
  async function addEntry(e) {
    e.preventDefault();

    const newEntry = {
      datum,
      uebung,
      gewicht: Number(gewicht),
      wiederholungen: Number(wiederholungen),
    };

    const { data, error } = await supabase
      .from("training_entries")
      .insert([
        {
          Datum: newEntry.datum,
          Übung: newEntry.uebung,
          Gewicht: newEntry.gewicht,
          Wiederholungen: newEntry.wiederholungen,
        },
      ])
      .select("*");

    if (error) {
      console.error("Supabase Insert Fehler:", error);
      return;
    }

    const inserted = data[0];

    setEntries((prev) => [
      ...prev,
      {
        id: inserted.id,
        datum: inserted.Datum,
        uebung: inserted.Übung,
        gewicht: inserted.Gewicht,
        wiederholungen: inserted.Wiederholungen,
        volumen: inserted.Gewicht * inserted.Wiederholungen,
      },
    ]);

    resetForm();
  }

  // -----------------------------
  // 3. Löschen
  // -----------------------------
  async function deleteEntry(id) {
    const { error } = await supabase
      .from("training_entries")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Löschen fehlgeschlagen:", error);
      return;
    }

    setEntries((prev) => prev.filter((e) => e.id !== id));
  }

  // -----------------------------
  // 4. Bearbeiten starten
  // -----------------------------
  function startEdit(entry) {
    setEditMode(true);
    setEditEntry(entry);
    setDatum(entry.datum);
    setUebung(entry.uebung);
    setGewicht(entry.gewicht);
    setWiederholungen(entry.wiederholungen);
  }

  // -----------------------------
  // 5. Bearbeitung speichern
  // -----------------------------
  async function saveEdit(e) {
    e.preventDefault();

    if (!editEntry) return;

    const updated = {
      datum,
      uebung,
      gewicht: Number(gewicht),
      wiederholungen: Number(wiederholungen),
    };

    const { error } = await supabase
      .from("training_entries")
      .update({
        Datum: updated.datum,
        Übung: updated.uebung,
        Gewicht: updated.gewicht,
        Wiederholungen: updated.wiederholungen,
      })
      .eq("id", editEntry.id);

    if (error) {
      console.error("Update fehlgeschlagen:", error);
      return;
    }

    setEntries((prev) =>
      prev.map((e) => (e.id === editEntry.id ? { ...e, ...updated } : e))
    );

    setEditMode(false);
    setEditEntry(null);
    resetForm();
  }

  // -----------------------------
  // 6. Formular zurücksetzen
  // -----------------------------
  function resetForm() {
    setDatum("");
    setUebung("");
    setGewicht("");
    setWiederholungen("");
  }

  // -----------------------------
  // 7. UI Rendering
  // -----------------------------
  return (
    <div className="container">

      {/* FORM CARD */}
      <div className="card">
        <h1>Training erfassen</h1>

        <form onSubmit={editMode ? saveEdit : addEntry}>
          <label>Datum</label>
          <input
            type="date"
            value={datum}
            onChange={(e) => setDatum(e.target.value)}
            required
          />

          <label>Übung</label>
          <select
            value={uebung}
            onChange={(e) => setUebung(e.target.value)}
            required
          >
            <option value="">Bitte wählen</option>
            {uebungsliste.map((u) => (
              <option key={u} value={u}>
                {u}
              </option>
            ))}
          </select>

          <label>Gewicht (kg)</label>
          <input
            type="number"
            value={gewicht}
            onChange={(e) => setGewicht(e.target.value)}
            required
          />

          <label>Wiederholungen</label>
          <input
            type="number"
            value={wiederholungen}
            onChange={(e) => setWiederholungen(e.target.value)}
            required
          />

          <button className="btn" type="submit">
            {editMode ? "Änderungen speichern" : "Speichern"}
          </button>

          {editMode && (
            <button
              type="button"
              className="btn-secondary"
              style={{ marginLeft: "10px" }}
              onClick={() => {
                setEditMode(false);
                setEditEntry(null);
                resetForm();
              }}
            >
              Abbrechen
            </button>
          )}
        </form>
      </div>

      {/* LIST CARD */}
      <div className="card">
        <h2>Erfasste Einträge</h2>

        <ul>
          {entries.map((entry) => (
            <li key={entry.id}>
              <strong style={{ color: "var(--neon)", textShadow: "var(--neon-glow)" }}>
                {entry.datum}
              </strong>
              <br />
              {entry.uebung} – {entry.gewicht} kg × {entry.wiederholungen}
              <br />

              <button
                className="btn-secondary"
                style={{ marginTop: "8px", marginRight: "8px" }}
                onClick={() => startEdit(entry)}
              >
                Bearbeiten
              </button>

              <button
                className="btn-danger"
                style={{ marginTop: "8px" }}
                onClick={() => deleteEntry(entry.id)}
              >
                Löschen
              </button>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}