
import Link from 'next/link';

export default function NotFound() {
    return (
        <main className="mx-auto flex min-h-[60vh] max-w-2xl items-center justify-center px-6 py-12">
            <div className="w-full rounded-xl bg-white p-8 text-center shadow-sm ring-1 ring-slate-200">
                <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
                    404
                </p>

                <h1 className="mt-3 text-3xl font-bold text-slate-900">
                    Project Not Found
                </h1>

                <p className="mt-4 text-slate-600">
                    The project you are looking for does not exist.
                </p>

                <Link
                    href="/projects"
                    className="mt-6 inline-block rounded-lg bg-slate-900 px-5 py-3 font-medium text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
                >
                    Back to Projects
                </Link>
            </div>
        </main>
    );
}