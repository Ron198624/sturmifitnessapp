import "./globals.css";
import Navbar from "./components/Navbar";
import Image from "next/image";

export const metadata = {
  title: "SturmiFitness",
  description: "Neon Cyber Gym App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <body>
        <header className="header">
          <Image
            src="/Logo.png"
            alt="SturmiFitness Logo"
            width={140}
            height={140}
            priority
          />
          <Navbar />
        </header>

        {children}
      </body>
    </html>
  );
}