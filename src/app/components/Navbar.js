export default function Navbar() {
  return (
    <nav className="w-full bg-black/90 backdrop-blur-xl border-b border-gray-700 
                    text-white py-5 mb-10">
      <ul className="flex justify-between max-w-3xl mx-auto w-full px-4 text-2xl font-semibold">
        <li><a href="/" className="hover:text-[#00ff9d] transition">Home</a></li>
        <li><a href="/training" className="hover:text-[#00ff9d] transition">Training</a></li>
        <li><a href="/cardio" className="hover:text-[#00ff9d] transition">Cardio</a></li>
        <li><a href="/analyse" className="hover:text-[#00ff9d] transition">Analyse</a></li>
        <li><a href="/verlauf" className="hover:text-[#00ff9d] transition">Verlauf</a></li>
      </ul>
    </nav>
  );
}