import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore web development and software projects created by Martin Céspedes.",
};
import Link from 'next/link';
import { z } from 'zod';

import ProjectSearch from '@/components/ProjectSearch';
import Pagination from '@/components/Pagination';

import { deleteProject } from '@/app/lib/actions';
import {
  fetchFilteredProjects,
  fetchProjectsPages,
} from '@/lib/projects-db';

export const dynamic = 'force-dynamic';

const SearchParamsSchema = z.object({
  query: z.string().trim().max(100).default(''),
  page: z.coerce.number().int().positive().default(1),
});

export default async function ProjectsPage(props: {
  searchParams?: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
}) {
  const searchParams = await props.searchParams;

  const rawQuery =
    typeof searchParams?.query === 'string'
      ? searchParams.query
      : '';

  const rawPage =
    typeof searchParams?.page === 'string'
      ? searchParams.page
      : '1';

  const parsedParams = SearchParamsSchema.safeParse({
    query: rawQuery,
    page: rawPage,
  });

  const query = parsedParams.success
    ? parsedParams.data.query
    : '';

  const currentPage = parsedParams.success
    ? parsedParams.data.page
    : 1;

  const totalPages = await fetchProjectsPages(query);

  const safePage =
    totalPages > 0
      ? Math.min(currentPage, totalPages)
      : 1;

  const projects = await fetchFilteredProjects(
    query,
    safePage
  );

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">Projects</h1>

          <p className="mt-2 text-slate-600">
            A collection of my software development projects.
          </p>
        </div>

        <Link
          href="/projects/new"
          className="rounded-lg bg-slate-900 px-5 py-3 font-medium text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
        >
          Add Project
        </Link>
      </div>

      <div className="mb-8 max-w-xl">
        <ProjectSearch />
      </div>

      {projects.length === 0 ? (
        <p className="rounded-lg bg-white p-6 text-slate-600 shadow">
          No projects found.
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

              <div className="mt-6 flex flex-wrap gap-4">
                <Link
                  href={`/projects/${project.id}`}
                  className="font-medium text-blue-700 underline hover:text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  View Project
                </Link>

                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-blue-700 underline hover:text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Visit Project
                  </a>
                )}

                <Link
                  href={`/projects/${project.id}/edit`}
                  className="font-medium text-blue-700 underline hover:text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Edit
                </Link>

                <form
                  action={deleteProject.bind(
                    null,
                    project.id.toString()
                  )}
                >
                  <button
                    type="submit"
                    className="font-medium text-red-700 underline hover:text-red-900 focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    Delete
                  </button>
                </form>
              </div>
            </article>
          ))}
        </div>
      )}

      <Pagination totalPages={totalPages} />
    </main>
  );
}