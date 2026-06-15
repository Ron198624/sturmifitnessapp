export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <h1 className="logo">SturmiFitness</h1>
      </div>

      <div className="nav-right">
        <a href="/">Home</a>
        <a href="/uebungen">Übungen</a>
        <a href="/verlauf">Verlauf</a>
        <a href="/analyse">Analyse</a>
      </div>
    </nav>
  );
}
