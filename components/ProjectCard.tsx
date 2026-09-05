interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  link?: string;
}

export default function ProjectCard({
  title,
  description,
  technologies,
  link,
}: ProjectCardProps) {
  return (
    <article className="p-6 border border-slate-200 rounded-lg shadow-sm bg-white hover:shadow-md transition">
      <h3 className="text-xl font-bold mb-3 text-slate-900">
        {title}
      </h3>

      <p className="text-slate-600 mb-4">
        {description}
      </p>

      <div className="mb-4">
        <p className="text-sm font-semibold text-slate-800 mb-2">
          Technologies
        </p>

        <div className="flex flex-wrap gap-2">
          {technologies.map((technology) => (
            <span
              key={technology}
              className="px-2 py-1 bg-slate-100 text-slate-700 text-sm rounded"
            >
              {technology}
            </span>
          ))}
        </div>
      </div>

      {link && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-blue-600 font-medium hover:underline"
        >
          View Project →
        </a>
      )}
    </article>
  );
}