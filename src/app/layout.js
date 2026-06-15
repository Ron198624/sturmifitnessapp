import "./styles/design-system.css";
import Navbar from "./components/Navbar";
export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <body>
        <Navbar />

        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
