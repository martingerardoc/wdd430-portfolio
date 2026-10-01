'use client';

import Link from 'next/link';
import { useActionState } from 'react';

import {
  updateProject,
  type State,
} from '@/app/lib/actions';

import type { Project } from '@/lib/projects-db';

const initialState: State = {
  message: null,
  errors: {},
};

export default function EditProjectForm({
  project,
}: {
  project: Project;
}) {
  const updateProjectWithId = updateProject.bind(
    null,
    project.id.toString()
  );

  const [state, formAction] = useActionState(
    updateProjectWithId,
    initialState
  );

  return (
    <form
      action={formAction}
      className="space-y-6 rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200"
    >
      <div>
        <label
          htmlFor="title"
          className="mb-2 block font-medium text-slate-900"
        >
          Title
        </label>

        <input
          id="title"
          name="title"
          type="text"
          defaultValue={project.title}
          aria-describedby="title-error"
          className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
        />

        {state.errors?.title && (
          <p
            id="title-error"
            className="mt-2 text-sm text-red-600"
          >
            {state.errors.title[0]}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="description"
          className="mb-2 block font-medium text-slate-900"
        >
          Description
        </label>

        <textarea
          id="description"
          name="description"
          rows={5}
          defaultValue={project.description}
          aria-describedby="description-error"
          className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
        />

        {state.errors?.description && (
          <p
            id="description-error"
            className="mt-2 text-sm text-red-600"
          >
            {state.errors.description[0]}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="type"
          className="mb-2 block font-medium text-slate-900"
        >
          Project Type
        </label>

        <select
          id="type"
          name="type"
          defaultValue={project.type}
          aria-describedby="type-error"
          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select a type</option>
          <option value="school">School</option>
          <option value="opensource">Open Source</option>
        </select>

        {state.errors?.type && (
          <p
            id="type-error"
            className="mt-2 text-sm text-red-600"
          >
            {state.errors.type[0]}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="technologies"
          className="mb-2 block font-medium text-slate-900"
        >
          Technologies
        </label>

        <input
          id="technologies"
          name="technologies"
          type="text"
          defaultValue={project.technologies.join(', ')}
          aria-describedby="technologies-error technologies-help"
          className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
        />

        <p
          id="technologies-help"
          className="mt-2 text-sm text-slate-500"
        >
          Enter technologies separated by commas.
        </p>

        {state.errors?.technologies && (
          <p
            id="technologies-error"
            className="mt-2 text-sm text-red-600"
          >
            {state.errors.technologies[0]}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="link"
          className="mb-2 block font-medium text-slate-900"
        >
          Project URL
        </label>

        <input
          id="link"
          name="link"
          type="url"
          defaultValue={project.link ?? ''}
          placeholder="https://example.com"
          aria-describedby="link-error"
          className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
        />

        {state.errors?.link && (
          <p
            id="link-error"
            className="mt-2 text-sm text-red-600"
          >
            {state.errors.link[0]}
          </p>
        )}
      </div>

      {state.message && (
        <p
          aria-live="polite"
          className="rounded-lg bg-red-50 p-4 text-sm text-red-700"
        >
          {state.message}
        </p>
      )}

      <div className="flex gap-4">
        <button
          type="submit"
          className="rounded-lg bg-slate-900 px-5 py-3 font-medium text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
        >
          Save Changes
        </button>

        <Link
          href="/projects"
          className="rounded-lg border border-slate-300 px-5 py-3 font-medium text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
