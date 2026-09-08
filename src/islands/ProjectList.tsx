import React from "react";
import ProjectDiagram from "./ProjectDiagram";

interface Project {
  title: string;
  description: string;
  longDescription?: string;
  tech: string[];
  features?: string[];
  role?: string;
  year?: string;
  category?: string;
  links?: { github?: string; demo?: string };
}

const domains: Record<string, string> = {
  Tutorva: "Education & AI",
  "Product Management System": "Inventory management",
  "Hospital Management System": "Clinical operations",
};

export default function ProjectList({ projects }: { projects: Project[] }) {
  return (
    <div className="project-grid">
      {projects.map((project, index) => (
        <article className={index === 0 ? "project-card project-card-featured" : "project-card"} key={project.title} data-reveal>
          <ProjectDiagram project={project.title} />
          <div className="project-content">
            <div className="project-meta mono"><span>{String(index + 1).padStart(2, "0")} / {domains[project.title] || project.category}</span><span>{project.year}</span></div>
            <h3>{project.title}</h3>
            <p className="project-description">{project.description}</p>
            <div className="project-technologies">{project.tech.slice(0, 4).map((tech) => <span key={tech}>{tech}</span>)}</div>
            <details className="project-disclosure">
              <summary><span className="read-closed">View project details</span><span className="read-open">Hide project details</span><span className="disclosure-icon" aria-hidden="true">+</span></summary>
              <div className="project-details">
                <p className="eyebrow">Implementation</p>
                <p className="project-description">{project.longDescription || project.description}</p>
                {project.features && <><p className="eyebrow">Features</p><ul className="project-features">{project.features.map((feature) => <li key={feature}>{feature}</li>)}</ul></>}
                <dl className="project-specs">
                  {project.role && <div><dt>Role</dt><dd>{project.role}</dd></div>}
                  <div><dt>Tech stack</dt><dd>{project.tech.join(" / ")}</dd></div>
                </dl>
                <div className="project-links">
                  {project.links?.github && <a className="text-link" href={project.links.github} target="_blank" rel="noopener noreferrer">{new URL(project.links.github).pathname.split("/").filter(Boolean).length === 1 ? "GitHub profile" : "View source"} <span aria-hidden="true">↗</span></a>}
                  {project.links?.demo && <a className="text-link" href={project.links.demo} target="_blank" rel="noopener noreferrer">Live demo <span aria-hidden="true">↗</span></a>}
                </div>
              </div>
            </details>
          </div>
        </article>
      ))}
    </div>
  );
}
