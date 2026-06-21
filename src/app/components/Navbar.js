export default function Navbar() {
  return (
    <nav className="w-full bg-black/90 backdrop-blur-xl border-b border-gray-700 
                    py-5 mt-8 mb-12">
      <ul className="flex justify-center gap-12 text-2xl font-semibold max-w-4xl mx-auto">
        <li><a href="/" className="text-white hover:text-[#00ff9d] transition">Home</a></li>
        <li><a href="/training" className="text-white hover:text-[#00ff9d] transition">Training</a></li>
        <li><a href="/cardio" className="text-white hover:text-[#00ff9d] transition">Cardio</a></li>
        <li><a href="/analyse" className="text-white hover:text-[#00ff9d] transition">Analyse</a></li>
        <li><a href="/verlauf" className="text-white hover:text-[#00ff9d] transition">Verlauf</a></li>
      </ul>
    </nav>
  );
}