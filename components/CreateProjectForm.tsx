'use client';

import Link from 'next/link';
import { useActionState } from 'react';
import { createProject, type State } from '@/app/lib/actions';

const initialState: State = {
  message: null,
  errors: {},
};

export default function CreateProjectForm() {
  const [state, formAction] = useActionState(
    createProject,
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
          className="block text-sm font-medium text-slate-700"
        >
          Title
        </label>

        <input
          id="title"
          name="title"
          type="text"
          aria-describedby="title-error"
          className="mt-2 block w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div
          id="title-error"
          aria-live="polite"
          className="mt-2 text-sm text-red-600"
        >
          {state.errors?.title?.map((error) => (
            <p key={error}>{error}</p>
          ))}
        </div>
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-slate-700"
        >
          Description
        </label>

        <textarea
          id="description"
          name="description"
          rows={5}
          aria-describedby="description-error"
          className="mt-2 block w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div
          id="description-error"
          aria-live="polite"
          className="mt-2 text-sm text-red-600"
        >
          {state.errors?.description?.map((error) => (
            <p key={error}>{error}</p>
          ))}
        </div>
      </div>

      <div>
        <label
          htmlFor="type"
          className="block text-sm font-medium text-slate-700"
        >
          Project Type
        </label>

        <select
          id="type"
          name="type"
          aria-describedby="type-error"
          defaultValue=""
          className="mt-2 block w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="" disabled>
            Select a type
          </option>
          <option value="school">School</option>
          <option value="opensource">Open Source</option>
        </select>

        <div
          id="type-error"
          aria-live="polite"
          className="mt-2 text-sm text-red-600"
        >
          {state.errors?.type?.map((error) => (
            <p key={error}>{error}</p>
          ))}
        </div>
      </div>

      <div>
        <label
          htmlFor="technologies"
          className="block text-sm font-medium text-slate-700"
        >
          Technologies
        </label>

        <input
          id="technologies"
          name="technologies"
          type="text"
          placeholder="React, Next.js, PostgreSQL"
          aria-describedby="technologies-error"
          className="mt-2 block w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <p className="mt-1 text-sm text-slate-500">
          Separate technologies with commas.
        </p>

        <div
          id="technologies-error"
          aria-live="polite"
          className="mt-2 text-sm text-red-600"
        >
          {state.errors?.technologies?.map((error) => (
            <p key={error}>{error}</p>
          ))}
        </div>
      </div>

      <div>
        <label
          htmlFor="link"
          className="block text-sm font-medium text-slate-700"
        >
          Project URL
        </label>

        <input
          id="link"
          name="link"
          type="url"
          placeholder="https://example.com"
          aria-describedby="link-error"
          className="mt-2 block w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div
          id="link-error"
          aria-live="polite"
          className="mt-2 text-sm text-red-600"
        >
          {state.errors?.link?.map((error) => (
            <p key={error}>{error}</p>
          ))}
        </div>
      </div>

      {state.message && (
        <p
          aria-live="polite"
          className="rounded-lg bg-red-50 p-4 text-sm text-red-700"
        >
          {state.message}
        </p>
      )}
      <div>
        <label
          htmlFor="yearCompleted"
          className="block text-sm font-medium text-slate-700"
        >
          Year Completed
        </label>

        <input
          id="yearCompleted"
          name="yearCompleted"
          type="number"
          min="2000"
          max={new Date().getFullYear()}
          required
          aria-describedby="yearCompleted-error"
          className="mt-2 block w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div
          id="yearCompleted-error"
          aria-live="polite"
          className="mt-2 text-sm text-red-600"
        >
          {state.errors?.yearCompleted?.map((error) => (
            <p key={error}>{error}</p>
          ))}
        </div>
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          className="rounded-lg bg-slate-900 px-5 py-3 font-medium text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
        >
          Create Project
        </button>

        <Link
          href="/projects"
          className="rounded-lg border border-slate-300 px-5 py-3 font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}