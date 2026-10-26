import React from "react";
import type { CollectionEntry } from "astro:content";
import ProjectDiagram from "./ProjectDiagram";

type Project = CollectionEntry<"projects">["data"];

function ProjectCard({ project, number, featured = false, wide = false }: { project: Project; number: number; featured?: boolean; wide?: boolean }) {
  return (
    <article className={`project-card${featured ? " project-card-featured" : ""}${wide ? " project-card-wide" : ""}`} data-reveal>
      <ProjectDiagram project={project.title} />
      <div className="project-content">
        <div className="project-meta mono">
          <span><b className="project-number">{String(number).padStart(2, "0")}</b> {project.category}</span>
          <div className="project-meta-end">
            {project.status && <span className={project.status === "In development" ? "project-status status-development" : "project-status status-released"}>{project.status}</span>}
            <span>{project.year}</span>
          </div>
        </div>
        {featured && <p className="lead-story-label">The lead story</p>}
        <h3>{project.title}</h3>
        {featured && <p className="project-deck">An editor. A terminal.<br />A workspace of its own.</p>}
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
          <summary><span className="read-closed">Read the project notes</span><span className="read-open">Close the project notes</span><span className="disclosure-icon" aria-hidden="true">+</span></summary>
          <div className="project-details">
            <p className="eyebrow">{project.status === "In development" ? "Work so far" : "Behind the build"}</p>
            <p className="project-description">{project.longDescription || project.description}</p>
            {project.features && <><p className="eyebrow">{project.status === "In development" ? "What works today" : "What it does"}</p><ul className="project-features">{project.features.map((feature) => <li key={feature}>{feature}</li>)}</ul></>}
            {project.plannedFeatures && <div className="planned-features"><p className="eyebrow">Still on the drawing board</p><ul className="project-features">{project.plannedFeatures.map((feature) => <li key={feature}>{feature}</li>)}</ul></div>}
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
      <div className="project-grid primary-projects">
        {visible.map((project, index) => <ProjectCard key={project.title} project={project} number={index + 1} featured={index === 0} />)}
      </div>
      {additional.length > 0 && (
        <details className="more-projects">
          <summary aria-controls="additional-projects"><span className="show-more-label">From the archives</span><span className="show-less-label">Close the archives</span><span className="more-count">{additional.length} more projects</span><span className="disclosure-icon" aria-hidden="true">+</span></summary>
          <div className="project-grid additional-projects" id="additional-projects">
            {additional.map((project, index) => <ProjectCard key={project.title} project={project} number={index + 4} wide />)}
          </div>
        </details>
      )}
    </>
  );
}
