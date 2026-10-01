import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { getProjectById } from '@/lib/projects-db';

type Props = {
    params: Promise<{ id: string }>;
};

export async function generateMetadata({
    params,
}: Props): Promise<Metadata> {
    const { id } = await params;

    const projectId = Number.parseInt(id, 10);

    if (!Number.isInteger(projectId) || projectId <= 0) {
        return {
            title: 'Project Not Found',
            description:
                'The requested portfolio project could not be found.',
        };
    }

    const project = await getProjectById(projectId);

    if (!project) {
        return {
            title: 'Project Not Found',
            description:
                'The requested portfolio project could not be found.',
        };
    }

    return {
        title: project.title,
        description: project.description,
        openGraph: {
            title: project.title,
            description: project.description,
            type: 'website',
        },
    };
}

export default async function ProjectPage({ params }: Props) {
    const { id } = await params;

    const projectId = Number.parseInt(id, 10);

    if (!Number.isInteger(projectId) || projectId <= 0) {
        notFound();
    }

    const project = await getProjectById(projectId);

    if (!project) {
        notFound();
    }

    return (
        <main className="mx-auto max-w-4xl px-6 py-12">
            <div className="mb-8">
                <Link
                    href="/projects"
                    className="text-sm font-medium text-blue-700 underline hover:text-blue-900"
                >
                    ← Back to Projects
                </Link>
            </div>

            <article className="rounded-xl bg-white p-8 shadow-sm">
                <p className="text-sm font-medium uppercase tracking-wide text-blue-700">
                    {project.type}
                </p>

                <h1 className="mt-2 text-4xl font-bold text-slate-900">
                    {project.title}
                </h1>

                <p className="mt-6 text-lg leading-8 text-slate-600">
                    {project.description}
                </p>

                <div className="mt-8">
                    <h2 className="text-xl font-semibold text-slate-900">
                        Technologies
                    </h2>

                    <div className="mt-3 flex flex-wrap gap-2">
                        {project.technologies?.map(
                            (technology: string) => (
                                <span
                                    key={technology}
                                    className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700"
                                >
                                    {technology}
                                </span>
                            )
                        )}
                    </div>
                </div>

                {project.year_completed && (
                    <p className="mt-6 text-sm text-slate-600">
                        Completed: {project.year_completed}
                    </p>
                )}

                {project.link && (
                    <div className="mt-8">
                        <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block rounded-lg bg-slate-900 px-5 py-3 font-medium text-white transition hover:bg-slate-700"
                        >
                            View Project
                        </a>
                    </div>
                )}
            </article>
        </main>
    );
}