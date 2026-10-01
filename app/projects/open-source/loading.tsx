export default function Loading() {
  return (
    <main className="mx-auto max-w-6xl animate-pulse px-6 py-12">
      <div className="mb-10 space-y-3">
        <div className="h-10 w-2/3 rounded bg-slate-200" />
        <div className="h-4 w-1/2 rounded bg-slate-200" />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div className="h-7 w-3/4 rounded bg-slate-200" />
          <div className="mt-4 h-4 w-full rounded bg-slate-200" />
          <div className="mt-2 h-4 w-5/6 rounded bg-slate-200" />
          <div className="mt-6 h-4 w-1/4 rounded bg-slate-200" />
          <div className="mt-4 h-6 w-1/3 rounded bg-slate-200" />
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div className="h-7 w-3/4 rounded bg-slate-200" />
          <div className="mt-4 h-4 w-full rounded bg-slate-200" />
          <div className="mt-2 h-4 w-5/6 rounded bg-slate-200" />
          <div className="mt-6 h-4 w-1/4 rounded bg-slate-200" />
          <div className="mt-4 h-6 w-1/3 rounded bg-slate-200" />
        </div>
      </div>
    </main>
  );
}