"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { muscleMap } from "../muscleMap";

export default function EmpfehlungPage() {
	const [empfehlungen, setEmpfehlungen] = useState([]);

	useEffect(() => {
		async function loadTraining() {
		const { data: training, error } = await supabase	
		.from("training_entries")
		 .select("*");

		 if (error) {
			 console.log(error);
			 return;
		 }

		 const muscleVolume = {};

		 for (const entry of training) {
			const volume =
			entry.Volumen ||
			entry.Gewicht * entry.Wiederholungen * entry.Saetze ||
			0;

			const muscles = muscleMap[entry.Uebung] || [];

			 for (const muscle of muscles) {
				if (!muscleVolume[muscle]) {
					muscleVolume[muscle] = 0;
		}

		muscleVolume[muscle] += volume;
		}
	}

	const sortedMuscles = Object.entries(muscleVolume)
		.sort((a, b) => a[1] - b[1])
		.slice(0, 3);

		setEmpfehlungen(sortedMuscles);
		 }

	loadTraining();
	}, []);

  return (
	<div className="w-full min-h-screen bg-black flex flex-col items-center px-4 pb-24">   
		<div className="bg-black border border-gray-700 backdrop-blur-xl rounded-2xl p-8 shadow-[0_0_25px_rgba(0,255,150,0.25)] w-full max-w-3xl mt-10 text-center">
		<h1 className="text-5xl font-extrabold text-[#00ff9d]">
		🎯 Empfehlung Heute
		</h1>

		<p className="text-gray-400 mt-4 text-xl">
		Diese Muskelgruppen wurden bisher am wenigsten trainiert.
		</p>
		</div>

		<div className="w-full max-w-3xl mt-8">
		{empfehlungen.map(([muskel, volumen], index) => (
			<div key={muskel} className="bg-black border border-gray-700 rounded-2xl p-6 mb-6 shadow-[0_0_20px_rgba(0,255,150,0.15)]">
					<h2 className="text-3xl font-bold text-white">
						{index + 1}. {muskel}
					</h2>

					<p className="text-gray-400 mt-3">
						Gesamtes Trainingsvolumen: {Math.round(volumen)}
					</p>
			</div>
				 ))}
		</div>
	</div>
	);
}