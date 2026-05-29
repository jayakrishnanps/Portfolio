import React, { useState } from 'react';

interface Project {
  title: string;
  subtitle?: string;
  description: string;
  longDescription?: string;
  tech: string[];
  features?: string[];
  links?: { github?: string; demo?: string };
}

interface Props {
  projects: Project[];
}

export default function ProjectList({ projects }: Props) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Project | null>(null);

  const openProject = (project: Project) => {
    setSelected(project);
    setOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const close = () => {
    setOpen(false);
    setSelected(null);
    document.body.style.overflow = '';
  };

  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <article
            key={index}
            className="project-card group cursor-pointer"
            onClick={() => openProject(project)}
          >
            <div className="flex-1">
              <h3 className="font-semibold text-2xl tracking-tight mb-2 group-hover:text-[var(--accent)] transition-colors">
                {project.title}
              </h3>
              <p className="text-[var(--text-muted)] text-[15px] mb-5 line-clamp-3">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.slice(0, 4).map((tech) => (
                  <span key={tech} className="tech-tag">{tech}</span>
                ))}
              </div>
            </div>
            <div className="text-sm font-medium text-[var(--accent)] group-hover:underline mt-auto">
              View details →
            </div>
          </article>
        ))}
      </div>

      {open && selected && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 p-4"
          onClick={close}
        >
          <div
            className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl max-w-3xl w-full max-h-[92dvh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 flex justify-between items-start bg-[var(--surface)] border-b border-[var(--border)] px-8 py-6">
              <div>
                <h3 className="text-3xl font-bold tracking-tight">{selected.title}</h3>
                {selected.subtitle && <p className="text-[var(--text-muted)]">{selected.subtitle}</p>}
              </div>
              <button onClick={close} className="text-4xl leading-none text-[var(--text-muted)] hover:text-white">×</button>
            </div>

            <div className="p-8 space-y-8">
              <p className="text-lg text-[var(--text)]">{selected.longDescription || selected.description}</p>

              <div>
                <div className="uppercase text-xs tracking-widest text-[var(--text-muted)] mb-3">Tech Stack</div>
                <div className="flex flex-wrap gap-2">
                  {selected.tech.map((t) => (
                    <span key={t} className="skill-pill text-xs py-1 px-4">{t}</span>
                  ))}
                </div>
              </div>

              {selected.features && (
                <div>
                  <div className="uppercase text-xs tracking-widest text-[var(--text-muted)] mb-3">Key Features</div>
                  <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-1 list-disc pl-5 text-[15px]">
                    {selected.features.map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="sticky bottom-0 bg-[var(--surface)] border-t border-[var(--border)] p-6 flex gap-3 flex-wrap">
              {selected.links?.github && (
                <a href={selected.links.github} target="_blank" rel="noopener" className="btn btn-secondary">
                  View Code
                </a>
              )}
              {selected.links?.demo && (
                <a href={selected.links.demo} target="_blank" rel="noopener" className="btn btn-primary">
                  Live Demo
                </a>
              )}
              <button onClick={close} className="btn btn-secondary ml-auto">Close</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
