
export default function Loading() {
    return (
        <main className="mx-auto max-w-6xl px-6 py-12">
            <div className="mb-10">
                <div className="h-10 w-64 animate-pulse rounded-lg bg-slate-200" />

                <div className="mt-3 h-5 w-96 max-w-full animate-pulse rounded bg-slate-200" />
            </div>

            <div className="mb-8 h-12 max-w-xl animate-pulse rounded-lg bg-slate-200" />

            <div className="grid gap-6 md:grid-cols-2">
                {[1, 2, 3].map((item) => (
                    <div
                        key={item}
                        className="h-64 animate-pulse rounded-xl bg-slate-200"
                    />
                ))}
            </div>
        </main>
    );
}