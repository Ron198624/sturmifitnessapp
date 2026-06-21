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
      <body className="bg-black text-white min-h-screen flex flex-col relative overflow-x-hidden z-0">

        {/* HEADER: Logo + Navbar zusammen */}
        <header className="w-full flex flex-col items-center mt-6 mb-10 z-20">

          {/* LOGO */}
          <Image
            src="/Logo.png"
            alt="SturmiFitness Logo"
            width={160}
            height={160}
            priority
            className="mb-4"
          />

          {/* NAVBAR */}
          <Navbar />
        </header>

        {/* CONTENT */}
        <main className="flex-1 w-full px-4 z-20">
          {children}
        </main>

      </body>
    </html>
  );
}