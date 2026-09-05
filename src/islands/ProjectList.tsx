import React from "react";

interface Project {
  title: string;
  subtitle?: string;
  description: string;
  longDescription?: string;
  tech: string[];
  features?: string[];
  role?: string;
  year?: string;
  category?: string;
  links?: { github?: string; demo?: string };
}
interface Props { projects: Project[]; }

const domains: Record<string, string> = {
  Tutorva: "Education",
  "Product Management System": "Inventory management",
  "Hospital Management System": "Healthcare",
};

export default function ProjectList({ projects }: Props) {
  return (
    <div className="project-index">
      {projects.map((project, index) => (
        <details className="project-entry" key={project.title}>
          <summary className="project-summary">
            <span className="project-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            <div className="project-title-block">
              <span className="project-domain mono">{domains[project.title] || project.category}</span>
              <h3>{project.title}</h3>
              <span className="project-year mono">{project.year}</span>
            </div>
            <div className="project-intro">
              <p>{project.description}</p>
              <div className="project-technologies">{project.tech.slice(0, 3).map((tech) => <span key={tech}>{tech}</span>)}</div>
              <span className="project-read"><span className="read-closed">View details</span><span className="read-open">Hide details</span> <span aria-hidden="true">↗</span></span>
            </div>
            <span className="project-toggle" aria-hidden="true"><span className="read-closed">+</span><span className="read-open">−</span></span>
          </summary>
          <div className="project-details">
            <div className="project-story">
              <p className="eyebrow">Implementation</p>
              <p>{project.longDescription || project.description}</p>
              <dl className="project-specs">
                {project.role && <div><dt>Role</dt><dd>{project.role}</dd></div>}
              </dl>
              <div className="project-links">
                {project.links?.github && <a className="text-link strong-link" href={project.links.github} target="_blank" rel="noopener noreferrer">{new URL(project.links.github).pathname.split("/").filter(Boolean).length === 1 ? "GitHub profile" : "View source"} <span aria-hidden="true">↗</span></a>}
                {project.links?.demo && <a className="text-link strong-link" href={project.links.demo} target="_blank" rel="noopener noreferrer">Live demo <span aria-hidden="true">↗</span></a>}
              </div>
            </div>
            <div className="project-feature-list">
              {project.features && <><p className="eyebrow">Features</p><ul>{project.features.map((feature) => <li key={feature}>{feature}</li>)}</ul></>}
              <p className="eyebrow">Tech stack</p>
              <div className="tech-tags">{project.tech.map((tech) => <span className="tech-tag" key={tech}>{tech}</span>)}</div>
            </div>
          </div>
        </details>
      ))}
    </div>
  );
}
