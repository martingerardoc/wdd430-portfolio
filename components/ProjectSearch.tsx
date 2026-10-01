'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function ProjectSearch() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set('page', '1');

    if (term.trim()) {
      params.set('query', term.trim());
    } else {
      params.delete('query');
    }

    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <label className="block">
      <span className="sr-only">Search projects</span>

      <input
        type="search"
        placeholder="Search projects..."
        defaultValue={searchParams.get('query') ?? ''}
        onChange={(event) => handleSearch(event.target.value)}
        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
      />
    </label>
  );
}