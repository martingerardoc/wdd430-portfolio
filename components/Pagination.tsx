'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

function createPageURL(
  pathname: string,
  pageNumber: number,
  searchParamsString: string
) {
  const params = new URLSearchParams(searchParamsString);

  params.set('page', pageNumber.toString());

  return `${pathname}?${params.toString()}`;
}

export default function Pagination({
  totalPages,
}: {
  totalPages: number;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get('page')) || 1;

  if (totalPages <= 1) {
    return null;
  }

  const previousPage = Math.max(currentPage - 1, 1);
  const nextPage = Math.min(currentPage + 1, totalPages);

  const searchParamsString = searchParams.toString();

  return (
    <nav
      className="mt-10 flex items-center justify-center gap-4"
      aria-label="Pagination"
    >
      {currentPage > 1 ? (
        <Link
          href={createPageURL(
            pathname,
            previousPage,
            searchParamsString
          )}
          className="rounded-lg border border-slate-300 px-4 py-2 font-medium hover:bg-slate-100"
        >
          Previous
        </Link>
      ) : (
        <span className="rounded-lg border border-slate-200 px-4 py-2 text-slate-400">
          Previous
        </span>
      )}

      <span className="text-sm text-slate-600">
        Page {currentPage} of {totalPages}
      </span>

      {currentPage < totalPages ? (
        <Link
          href={createPageURL(
            pathname,
            nextPage,
            searchParamsString
          )}
          className="rounded-lg border border-slate-300 px-4 py-2 font-medium hover:bg-slate-100"
        >
          Next
        </Link>
      ) : (
        <span className="rounded-lg border border-slate-200 px-4 py-2 text-slate-400">
          Next
        </span>
      )}
    </nav>
  );
}