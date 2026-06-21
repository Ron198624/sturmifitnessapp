// src/app/layout.js

import "./globals.css";
import Image from "next/image";
import Navbar from "./components/Navbar";

export const metadata = {
  title: "SturmiFitness",
  description: "Deine Fitness App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <body className="bg-black text-white min-h-screen flex flex-col relative overflow-x-hidden">

        {/* MATRIX CODE REGEN – GANZ HINTEN */}
        <div className="matrix-bg">
          {Array.from({ length: 40 }).map((_, i) => (
            <div
              key={i}
              className="matrix-line"
              style={{
                left: `${Math.random() * 100}%`,
                animationDuration: `${4 + Math.random() * 6}s`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            ></div>
          ))}
        </div>

        {/* LOGO – ÜBER DEM REGEN */}
        <header className="w-full flex flex-col items-center py-4 z-20">
          <Image
            src="/Logo.png"
            alt="SturmiFitness Logo"
            width={160}
            height={160}
            priority
            className="mb-3"
          />
        </header>

        {/* NAVBAR – MUSS ÜBER DEM REGEN SEIN */}
        <div className="z-20 w-full">
          <Navbar />
        </div>

        {/* CONTENT – AUCH ÜBER DEM REGEN */}
        <main className="flex-1 w-full px-4 z-20">
          {children}
        </main>

      </body>
    </html>
  );
}