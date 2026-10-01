import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Me | Martin Céspedes",
  description:
    "Learn more about Martin Céspedes, a junior full-stack developer and software development student.",
};

export default function About() {
  return (
    <>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <section>
          <h1 className="text-4xl font-bold text-slate-900 mb-6">
            About Me
          </h1>

          <div className="space-y-4 text-slate-600">
            <p>
              I am a developer with a background in Systems
              Analysis and Electronics Technology. I am currently
              completing my Bachelors Degree in Software Development
              at BYU-Idaho.
            </p>

            <p>
              My experience and studies have allowed me to work with
              frontend and backend technologies, including React,
              JavaScript, Node.js, Express, C#, Laravel,
              PostgreSQL, and MySQL.
            </p>

            <p>
              I enjoy building web applications and continuously
              improving my programming skills by working on practical
              projects and learning modern development technologies.
            </p>
          </div>
        </section>
      </main>

    </>
  );
}