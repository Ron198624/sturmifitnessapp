"use client";

import { FaRunning, FaBiking, FaSwimmer } from "react-icons/fa";
import {
  GiBiceps,
  GiLeg,
  GiChestArmor,
  GiBackPain,
  GiMuscleUp,
  GiWeightLiftingUp,   // ersetzt GiDumbbell
  GiShoulderBag        // ersetzt GiShoulderArmor
} from "react-icons/gi";

export default function SportIcon({ type, size = 24 }) {
  switch (type) {
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
    // KRAFTTRAINING
    // -------------------------
    case "kraft_allgemein":
      return <GiWeightLiftingUp size={size} color="#ffcc00" />;

    case "brust":
      return <GiChestArmor size={size} color="#ff8800" />;

    case "ruecken":
      return <GiBackPain size={size} color="#00e1ff" />;

    case "beine":
      return <GiLeg size={size} color="#ff0066" />;

    case "bizeps":
      return <GiBiceps size={size} color="#00ff44" />;

    case "schultern":
      return <GiShoulderBag size={size} color="#ffaa00" />;

    case "ganzkoerper":
      return <GiMuscleUp size={size} color="#ffffff" />;

    // -------------------------
    // FALLBACK
    // -------------------------
    default:
      return <GiWeightLiftingUp size={size} color="#ffffff" />;
  }
}