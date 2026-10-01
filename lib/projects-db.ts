import { sql } from '@vercel/postgres';

export interface Project {
  id: number;
  title: string;
  description: string;
  type: 'opensource' | 'school';
  technologies: string[];
  link?: string;
  year_completed?: number;
}

export const ITEMS_PER_PAGE = 3;

export async function getProjects(type?: string | null): Promise<Project[]> {
  if (type) {
    const { rows } = await sql<Project>`
      SELECT * FROM projects WHERE type = ${type} ORDER BY id DESC
    `;

    return rows;
  }

  const { rows } = await sql<Project>`
    SELECT * FROM projects ORDER BY id
  `;

  return rows;
}

export async function getProjectById(id: number): Promise<Project | null> {
  const { rows } = await sql<Project>`
    SELECT * FROM projects WHERE id = ${id}
  `;

  return rows[0] ?? null;
}
export async function fetchFilteredProjects(
  query: string,
  currentPage: number
): Promise<Project[]> {
  const safeQuery = query.trim().slice(0, 100);

  const page =
    Number.isInteger(currentPage) && currentPage > 0
      ? currentPage
      : 1;

  const offset = (page - 1) * ITEMS_PER_PAGE;

  // No search term: return all projects with pagination.
  if (!safeQuery) {
    const { rows } = await sql<Project>`
      SELECT *
      FROM projects
      ORDER BY id DESC
      LIMIT ${ITEMS_PER_PAGE}
      OFFSET ${offset}
    `;

    return rows;
  }

  const searchTerm = `%${safeQuery}%`;

  // Search title, description, or technologies.
  const { rows } = await sql<Project>`
    SELECT *
    FROM projects
    WHERE
      title ILIKE ${searchTerm}
      OR description ILIKE ${searchTerm}
      OR EXISTS (
        SELECT 1
        FROM unnest(technologies) AS technology
        WHERE technology ILIKE ${searchTerm}
      )
    ORDER BY id DESC
    LIMIT ${ITEMS_PER_PAGE}
    OFFSET ${offset}
  `;

  return rows;
}

export async function fetchProjectsPages(
  query: string
): Promise<number> {
  const safeQuery = query.trim().slice(0, 100);

  // No search term: count all projects.
  if (!safeQuery) {
    const { rows } = await sql<{ count: number }>`
      SELECT COUNT(*)::int AS count
      FROM projects
    `;

    return Math.ceil(rows[0].count / ITEMS_PER_PAGE);
  }

  const searchTerm = `%${safeQuery}%`;

  const { rows } = await sql<{ count: number }>`
    SELECT COUNT(*)::int AS count
    FROM projects
    WHERE
      title ILIKE ${searchTerm}
      OR description ILIKE ${searchTerm}
      OR EXISTS (
        SELECT 1
        FROM unnest(technologies) AS technology
        WHERE technology ILIKE ${searchTerm}
      )
  `;

  return Math.ceil(rows[0].count / ITEMS_PER_PAGE);
}