"use client";

import { FaRunning, FaBiking, FaSwimmer } from "react-icons/fa";
import {
  GiDumbbell,
  GiBiceps,
  GiLeg,
  GiChestArmor,
  GiBackPain,
  GiShoulderArmor,
  GiMuscleUp
} from "react-icons/gi";

export default function SportIcon({ type, size = 24 }) {
  if (!type) {
    return <GiDumbbell size={size} color="#ffffff" />;
  }

  // Normalisieren: "Rücken" → "ruecken"
  const t = type.toLowerCase().replace("ü", "ue");

  switch (t) {
    // -------------------------
    // CARDIO
    // -------------------------
    case "laufen":
      return <FaRunning size={size} color="#00ff9d" />;
    case "radfahren":
      return <FaBiking size={size} color="#00aaff" />;
    case "schwimmen":
      return <FaSwimmer size={size} color="#ff00ff" />;

    // -------------------------
    // KRAFTTRAINING (aus muscleGroups)
    // -------------------------
    case "brust":
      return <GiChestArmor size={size} color="#ff8800" />;
    case "ruecken":
      return <GiBackPain size={size} color="#00e1ff" />;
    case "schultern":
      return <GiShoulderArmor size={size} color="#ffaa00" />;
    case "beine":
      return <GiLeg size={size} color="#ff0066" />;
    case "bizeps":
      return <GiBiceps size={size} color="#00ff44" />;
    case "ganzkoerper":
      return <GiMuscleUp size={size} color="#ffffff" />;

    // -------------------------
    // FALLBACK
    // -------------------------
    default:
      return <GiDumbbell size={size} color="#ffffff" />;
  }
}