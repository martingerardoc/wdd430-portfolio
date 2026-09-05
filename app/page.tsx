import ProjectList from "@/components/ProjectList";

const projects = [
  {
    title: "Store Catalog",
    description:
      "A responsive e-commerce application developed with React. The application allows users to browse products, navigate through categories, view product information, and interact with a modern user interface.",
    technologies: [
      "React",
      "Vite",
      "Tailwind CSS",
      "React Router",
      "REST API",
    ],
    link: "https://store-catalog-omega.vercel.app/",
  },
  {
    title: "CSE 340 Full-Stack Application",
    description:
      "A full-stack web application developed as part of my CSE 340 coursework. The project demonstrates server-side development, database integration, routing, and dynamic web application functionality.",
    technologies: [
      "Node.js",
      "Express",
      "PostgreSQL",
      "JavaScript",
      "REST API",
    ],
    link: "https://cse340-course-j8kw.onrender.com/",
  },
];

export default function Home() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      {/* Hero Section */}
      <section className="text-center py-16">
        <p className="text-blue-600 font-semibold mb-3">
          SOFTWARE DEVELOPER
        </p>

        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Hi, I'm Martin Céspedes
        </h1>

        <p className="max-w-2xl mx-auto text-lg text-slate-600">
          I am a software developer passionate about building
          modern web applications and continuously improving my
          skills in frontend and backend development.
        </p>
      </section>

      {/* Projects Section */}
      <section>
        <h2 className="text-3xl font-bold mb-2">
          My Projects
        </h2>

        <p className="text-slate-600 mb-8">
          Here are some of the projects I have developed during
          my studies and software development journey.
        </p>

        <ProjectList projects={projects} />
      </section>
    </main>
  );
}