import React from "react";
import type { CollectionEntry } from "astro:content";
import ProjectDiagram from "./ProjectDiagram";

type Project = CollectionEntry<"projects">["data"];

function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  return (
    <article className={featured ? "project-card project-card-featured" : "project-card"} data-reveal>
      <ProjectDiagram project={project.title} />
      <div className="project-content">
        <div className="project-meta mono"><span>{project.category}</span><span>{project.year}</span></div>
        {project.status && <span className={project.status === "In development" ? "project-status status-development" : "project-status status-released"}>{project.status}</span>}
        <h3>{project.title}</h3>
        <p className="project-description">{project.description}</p>
        <div className="project-technologies">{project.tech.slice(0, 4).map((tech) => <span key={tech}>{tech}</span>)}</div>
        {(project.links?.website || project.links?.github || project.links?.demo) && (
          <div className="project-actions">
            {project.links?.website && <a className="text-link" href={project.links.website} target="_blank" rel="noopener noreferrer">Project website <span aria-hidden="true">↗</span></a>}
            {project.links?.demo && <a className="text-link" href={project.links.demo} target="_blank" rel="noopener noreferrer">Live demo <span aria-hidden="true">↗</span></a>}
            {project.links?.github && <a className="text-link" href={project.links.github} target="_blank" rel="noopener noreferrer">{new URL(project.links.github).pathname.split("/").filter(Boolean).length === 1 ? "GitHub profile" : "View source"} <span aria-hidden="true">↗</span></a>}
          </div>
        )}
        <details className="project-disclosure">
          <summary><span className="read-closed">View project details</span><span className="read-open">Hide project details</span><span className="disclosure-icon" aria-hidden="true">+</span></summary>
          <div className="project-details">
            <p className="eyebrow">{project.status === "In development" ? "Current implementation" : "Implementation"}</p>
            <p className="project-description">{project.longDescription || project.description}</p>
            {project.features && <><p className="eyebrow">{project.status === "In development" ? "Implemented" : "Features"}</p><ul className="project-features">{project.features.map((feature) => <li key={feature}>{feature}</li>)}</ul></>}
            {project.plannedFeatures && <div className="planned-features"><p className="eyebrow">Planned · not yet implemented</p><ul className="project-features">{project.plannedFeatures.map((feature) => <li key={feature}>{feature}</li>)}</ul></div>}
            <dl className="project-specs">
              {project.role && <div><dt>Role</dt><dd>{project.role}</dd></div>}
              <div><dt>Tech stack</dt><dd>{project.tech.join(" / ")}</dd></div>
            </dl>
            {project.links?.release && <a className="text-link" href={project.links.release} target="_blank" rel="noopener noreferrer">View release <span aria-hidden="true">↗</span></a>}
          </div>
        </details>
      </div>
    </article>
  );
}

export default function ProjectList({ projects }: { projects: Project[] }) {
  const visible = projects.slice(0, 3);
  const additional = projects.slice(3);
  return (
    <>
      <div className="project-grid">
        {visible.map((project, index) => <ProjectCard key={project.title} project={project} featured={index === 0} />)}
      </div>
      {additional.length > 0 && (
        <details className="more-projects">
          <summary aria-controls="additional-projects"><span className="show-more-label">Show more projects</span><span className="show-less-label">Show fewer projects</span><span className="more-count">{additional.length}</span><span className="disclosure-icon" aria-hidden="true">+</span></summary>
          <div className="project-grid additional-projects" id="additional-projects">
            {additional.map((project) => <ProjectCard key={project.title} project={project} />)}
          </div>
        </details>
      )}
    </>
  );
}
