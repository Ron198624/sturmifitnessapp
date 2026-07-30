// src/app/muscleMap.js

// ---------------------------------------------
//  MUSCLE MAP – EINHEITLICH FÜR KRAFT + CARDIO
// ---------------------------------------------
//
// Jede Übung liefert ein Array von Muskelgruppen.
// Diese werden in der Analyse automatisch zu Obergruppen
// (Brust, Rücken, Beine, Schultern, Arme, Core) gemappt.
//
// Cardio ist vollständig integriert:
// - laufen
// - radfahren
// - schwimmen
//
// ---------------------------------------------

export const muscleMap = {
  // -------------------------
  // BRUST
  // -------------------------
  "Brustpresse": ["Brust", "Trizeps", "Schultern"],
  "Butterfly": ["Brust", "Schultern"],
  "Liegestütze": ["Brust", "Trizeps", "Schultern", "Core"],
  "Hantelbank": ["Brust", "Schultern", "Trizeps"],
  "Bankdrücken": ["Brust", "Schultern", "Trizeps"],

  // -------------------------
  // RÜCKEN
  // -------------------------
  "Rudermaschine": ["Rücken", "Bizeps"],
  "Latzug": ["Rücken", "Bizeps"],
  "Klimmzüge": ["Rücken", "Bizeps", "Unterarme"],
  "Rückenstrecker": ["Rücken", "Core"],
  "Hyperextension": ["Rücken", "Core"],

  // -------------------------
  // TRIZEPS
  // -------------------------
  "Trizeps Maschine": ["Trizeps", "Schultern"],

  // -------------------------
  // BIZEPS
  // -------------------------
  "Bizepscurl": ["Bizeps", "Unterarme"],

  // -------------------------
  // SCHULTERN
  // -------------------------
  "Reverse Butterfly": ["Schultern", "Rücken"],

  // -------------------------
  // BEINE
  // -------------------------
  "Beinpresse": ["Beine", "Core"],

  // -------------------------
  // CARDIO – GANZKÖRPER / BEINE / CORE
  // -------------------------

  // Laufen → Beine + Core
  "laufen": ["Beine", "Core"],

  // Radfahren → Beine + Core
  "radfahren": ["Beine", "Core"],

  // Schwimmen → Ganzkörper
  "schwimmen": [
    "Rücken",
    "Schultern",
    "Brust",
    "Bizeps",
    "Trizeps",
    "Core",
    "Beine"
  ],
};