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
      <body className="bg-black text-white pb-20">
        <header className="w-full flex flex-col items-center py-4">
          <Image
            src="/Logo.png"
            alt="SturmiFitness Logo"
            width={160}
            height={160}
            priority
            className="mb-3"
          />
        </header>

        <main className="w-full">
          {children}
        </main>

        {/* Bottom Navigation */}
        <Navbar />
      </body>
    </html>
  );
}