
'use client';

import { useEffect } from 'react';

export default function ProjectsError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error('Projects error:', error);
    }, [error]);

    return (
        <main className="mx-auto flex min-h-[60vh] max-w-2xl items-center justify-center px-6 py-12">
            <div className="w-full rounded-xl bg-white p-8 text-center shadow-sm ring-1 ring-slate-200">
                <h1 className="text-3xl font-bold text-slate-900">
                    Unable to load projects
                </h1>

                <p className="mt-4 text-slate-600">
                    Something went wrong while loading the projects.
                    Please try again.
                </p>

                <button
                    type="button"
                    onClick={() => reset()}
                    className="mt-6 rounded-lg bg-slate-900 px-5 py-3 font-medium text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
                >
                    Try Again
                </button>
            </div>
        </main>
    );
}