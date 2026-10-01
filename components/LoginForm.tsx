"use client";

import { useActionState } from "react";

import { authenticate } from "@/app/lib/actions";

const initialState = "";

export default function LoginForm() {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    initialState
  );

  return (
    <form
      action={formAction}
      className="mx-auto w-full max-w-md space-y-6 rounded-xl bg-white p-8 shadow-sm"
    >
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Portfolio Login
        </h1>

        <p className="mt-2 text-sm text-slate-600">
          Sign in to manage your portfolio projects.
        </p>
      </div>

      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Email
        </label>

        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Password
        </label>

        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {errorMessage && (
        <p
          className="rounded-lg bg-red-50 p-3 text-sm text-red-700"
          aria-live="polite"
        >
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-lg bg-slate-900 px-4 py-3 font-medium text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isPending ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}