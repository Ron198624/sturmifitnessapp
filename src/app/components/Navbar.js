export default function Navbar() {
  return (
    <nav className="w-full bg-black/90 backdrop-blur-xl border-b border-gray-700 py-5">
      <ul className="flex justify-center gap-12 text-2xl font-semibold max-w-4xl mx-auto">
        <li><a className="text-white no-underline hover:text-[#00ff9d] transition" href="/">Home</a></li>
        <li><a className="text-white no-underline hover:text-[#00ff9d] transition" href="/training">Training</a></li>
        <li><a className="text-white no-underline hover:text-[#00ff9d] transition" href="/cardio">Cardio</a></li>
        <li><a className="text-white no-underline hover:text-[#00ff9d] transition" href="/analyse">Analyse</a></li>
        <li><a className="text-white no-underline hover:text-[#00ff9d] transition" href="/verlauf">Verlauf</a></li>
      </ul>
    </nav>
  );
}