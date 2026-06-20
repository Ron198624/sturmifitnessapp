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
      <body className="bg-black text-white min-h-screen flex flex-col">

        {/* HEADER + NAVIGATION */}
        <header className="w-full bg-black border-b border-gray-800 py-4">
          <div className="flex flex-col items-center">

            {/* Logo */}
            <Image
              src="/Logo.png"
              alt="SturmiFitness Logo"
              width={160}
              height={160}
              priority
              className="mb-3"
            />

            {/* Navigation oben */}
            <Navbar />
          </div>
        </header>

        {/* HAUPTINHALT – volle Breite */}
        <main className="flex-1 w-full px-4 py-4">
          {children}
        </main>

      </body>
    </html>
  )
}