import Link from 'next/link';
import CreateProjectForm from '@/components/CreateProjectForm';

export default function NewProjectPage() {
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
          Add Project
        </h1>

        <p className="mt-2 text-slate-600">
          Add a new project to your portfolio.
        </p>
      </div>

      <CreateProjectForm />
    </main>
  );
}