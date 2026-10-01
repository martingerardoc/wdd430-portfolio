import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },

  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;

      const isProtectedRoute =
        nextUrl.pathname === "/projects/new" ||
        /^\/projects\/[^/]+\/edit$/.test(nextUrl.pathname);

      if (isProtectedRoute) {
        return isLoggedIn;
      }

      if (isLoggedIn && nextUrl.pathname === "/login") {
        return Response.redirect(new URL("/projects", nextUrl));
      }

      return true;
    },
  },

  providers: [],
} satisfies NextAuthConfig;