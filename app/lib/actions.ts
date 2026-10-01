'use server';

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { AuthError } from "next-auth";
import { auth, signIn, signOut } from "@/auth";


const ProjectFormSchema = z.object({
    title: z
        .string()
        .min(3, 'Title must be at least 3 characters.'),

    description: z
        .string()
        .min(20, 'Description must be at least 20 characters.'),

    type: z
        .string()
        .min(1, 'Please select a project type.'),

    technologies: z
        .string()
        .min(2, 'Add at least one technology.'),

    link: z
        .string()
        .url('Please enter a valid URL.')
        .or(z.literal('')),
});

const currentYear = new Date().getFullYear();

const CreateProjectSchema = ProjectFormSchema.extend({
    yearCompleted: z.coerce
        .number()
        .int('Year must be a whole number.')
        .gte(2000, 'Year must be 2000 or later.')
        .lte(
            currentYear,
            `Year cannot be greater than ${currentYear}.`
        ),
});

async function requireOwnerSession() {
    const session = await auth();

    if (!session?.user?.email) {
        redirect("/login");
    }

    return session;
}

export async function authenticate(
    prevState: string | undefined,
    formData: FormData
) {
    try {
        await signIn("credentials", {
            email: formData.get("email"),
            password: formData.get("password"),
            redirectTo: "/projects",
        });
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return "Invalid email or password.";
                default:
                    return "Something went wrong.";
            }
        }

        throw error;
    }
}

export async function logout() {
  await signOut({
    redirectTo: "/projects",
  });
}

export type State = {
    errors?: {
        title?: string[];
        description?: string[];
        type?: string[];
        technologies?: string[];
        link?: string[];
        yearCompleted?: string[];
    };
    message?: string | null;
};

export async function createProject(
    prevState: State,
    formData: FormData
): Promise<State> {
    await requireOwnerSession();
    const validatedFields = CreateProjectSchema.safeParse({
        title: formData.get('title'),
        description: formData.get('description'),
        type: formData.get('type'),
        technologies: formData.get('technologies'),
        link: formData.get('link'),
        yearCompleted: formData.get('yearCompleted'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing or invalid fields. Failed to create project.',
        };
    }

    const {
        title,
        description,
        type,
        technologies,
        link,
        yearCompleted,
    } = validatedFields.data;

    try {
        await sql`
      INSERT INTO projects (
        title,
        description,
        type,
        technologies,
        link,
        year_completed
      )
      VALUES (
        ${title},
        ${description},
        ${type},
        string_to_array(${technologies}, ','),
        ${link || null},
        ${yearCompleted}
      )
    `;
    } catch (error) {
        console.error('Database Error:', error);

        return {
            message: 'Database Error: Failed to create project.',
        };
    }

    revalidatePath('/projects');
    redirect('/projects');
}

export async function updateProject(
    id: string,
    prevState: State,
    formData: FormData
): Promise<State> {
    await requireOwnerSession();
    
    const validatedFields = ProjectFormSchema.safeParse({
        title: formData.get('title'),
        description: formData.get('description'),
        type: formData.get('type'),
        technologies: formData.get('technologies'),
        link: formData.get('link'),
        yearCompleted: formData.get('yearCompleted'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing or invalid fields. Failed to update project.',
        };
    }

    const {
        title,
        description,
        type,
        technologies,
        link,
    } = validatedFields.data;

    try {
        await sql`
      UPDATE projects
      SET
        title = ${title},
        description = ${description},
        type = ${type},
        technologies = string_to_array(${technologies}, ','),
        link = ${link || null},
      WHERE id = ${id}
    `;
    } catch (error) {
        console.error('Database Error:', error);

        return {
            message: 'Database Error: Failed to update project.',
        };
    }

    revalidatePath('/projects');
    revalidatePath(`/projects/${id}`);
    redirect('/projects');
}

export async function deleteProject(id: string): Promise<void> {
    await requireOwnerSession();
    try {
        await sql`
      DELETE FROM projects
      WHERE id = ${id}
    `;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Database Error: Failed to delete project.');
    }

    revalidatePath('/projects');
}