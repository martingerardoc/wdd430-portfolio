import Link from 'next/link';

import { auth } from '@/auth';
import { logout } from '@/app/lib/actions';

export default async function Header() {
  const session = await auth();

  return (
    <header className="bg-slate-900 text-white shadow-md">
      <nav className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-4 md:flex-row">
        <div id="header-title">
          <Link
            href="/"
            className="text-2xl font-bold transition hover:text-blue-400"
          >
            Martin Céspedes
          </Link>

          <p className="text-sm text-slate-300">
            Junior Full-Stack Developer
          </p>
        </div>

        <ul className="flex items-center gap-6">
          <li>
            <Link
              href="/"
              className="transition hover:text-blue-400"
            >
              Home
            </Link>
          </li>

          <li>
            <Link
              href="/about"
              className="transition hover:text-blue-400"
            >
              About
            </Link>
          </li>

          {session?.user ? (
            <>
              <li className="text-sm text-slate-300">
                {session.user.name ?? session.user.email}
              </li>

              <li>
                <form action={logout}>
                  <button
                    type="submit"
                    className="rounded-lg border border-slate-600 px-3 py-2 text-sm transition hover:border-blue-400 hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Sign Out
                  </button>
                </form>
              </li>
            </>
          ) : (
            <li>
              <Link
                href="/login"
                className="rounded-lg border border-slate-600 px-3 py-2 text-sm transition hover:border-blue-400 hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Sign In
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}