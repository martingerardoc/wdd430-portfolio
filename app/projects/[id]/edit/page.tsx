import Link from 'next/link';
import { notFound } from 'next/navigation';

import EditProjectForm from '@/components/EditProjectForm';
import { getProjectById } from '@/lib/projects-db';

export default async function EditProjectPage(props: {
    params: Promise<{ id: string }>;
}) {
    const params = await props.params;

    const id = Number.parseInt(params.id, 10);

    if (!Number.isInteger(id) || id <= 0) {
        notFound();
    }

    const project = await getProjectById(id);

    if (!project) {
        notFound();
    }

    return (
        <main className="mx-auto max-w-3xl px-6 py-12">
            <div className="mb-8">
                <Link
                    href="/projects"
                    className="text-sm font-medium text-blue-700 underline hover:text-blue-900"
                >
                    ← Back to Projects
                </Link>

                <h1 className="mt-4 text-4xl font-bold">
                    Edit Project
                </h1>

                <p className="mt-2 text-slate-600">
                    Update the information for this project.
                </p>
            </div>

            <EditProjectForm project={project} />
        </main>
    );
}