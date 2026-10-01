import { sql } from "@vercel/postgres";

export type AuthUser = {
  id: number;
  name: string;
  email: string;
  passwordHash: string;
};

export async function getUserByEmail(
  email: string
): Promise<AuthUser | null> {
  const result = await sql`
    SELECT
      id,
      name,
      email,
      password_hash AS "passwordHash"
    FROM users
    WHERE email = ${email}
    LIMIT 1
  `;

  if (result.rows.length === 0) {
    return null;
  }

  return result.rows[0] as AuthUser;
}