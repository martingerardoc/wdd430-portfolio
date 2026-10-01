import Link from 'next/link';
import { getProjects } from '@/lib/projects-db';

export default async function OpenSourceProjectsPage() {
    const projects = await getProjects('opensource');

    return (
        <main className="mx-auto max-w-6xl px-6 py-12">
            <div className="mb-10">
                <h1 className="text-4xl font-bold">Open Source Projects</h1>
                <p className="mt-2 text-slate-600">
                    Projects and contributions related to open source development.
                </p>
            </div>

            {projects.length === 0 ? (
                <p className="rounded-lg bg-white p-6 text-slate-600 shadow">
                    No open source projects found.
                </p>
            ) : (
                <div className="grid gap-6 md:grid-cols-2">
                    {projects.map((project) => (
                        <article
                            key={project.id}
                            className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200"
                        >
                            <h2 className="text-2xl font-semibold">
                                {project.title}
                            </h2>

                            <p className="mt-3 text-slate-600">
                                {project.description}
                            </p>

                            <p className="mt-4 text-sm text-slate-500">
                                <strong>Type:</strong> {project.type}
                            </p>

                            {project.technologies?.length > 0 && (
                                <div className="mt-4 flex flex-wrap gap-2">
                                    {project.technologies.map((technology) => (
                                        <span
                                            key={technology}
                                            className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700"
                                        >
                                            {technology}
                                        </span>
                                    ))}
                                </div>
                            )}

                            {project.link && (
                                <div className="mt-6">
                                    <a
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="font-medium text-blue-700 underline hover:text-blue-900"
                                    >
                                        Visit Project
                                    </a>
                                </div>
                            )}
                        </article>
                    ))}
                </div>
            )}

            <div className="mt-10">
                <Link
                    href="/projects"
                    className="font-medium text-blue-700 underline hover:text-blue-900"
                >
                    Back to All Projects
                </Link>
            </div>
        </main>
    );
}