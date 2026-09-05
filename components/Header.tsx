import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-slate-900 text-white shadow-md">
      <nav className="max-w-6xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div id="header-title">
          <Link
            href="/"
            className="text-2xl font-bold hover:text-blue-400 transition"
          >
            Martin Céspedes
          </Link>
          <p className="text-sm text-slate-300">
            Junior Full-Stack Developer
          </p>
        </div>

        <ul className="flex gap-6">
          <li>
            <Link
              href="/"
              className="hover:text-blue-400 transition"
            >
              Home
            </Link>
          </li>

          <li>
            <Link
              href="/about"
              className="hover:text-blue-400 transition"
            >
              About
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}