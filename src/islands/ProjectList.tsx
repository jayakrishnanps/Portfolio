import React from "react";
import type { CollectionEntry } from "astro:content";
import ProjectDiagram from "./ProjectDiagram";

type Project = CollectionEntry<"projects">["data"];

function ProjectCard({
  project,
  featured = false,
  wide = false,
}: {
  project: Project;
  featured?: boolean;
  wide?: boolean;
}) {
  return (
    <article
      className={`project-card${featured ? " project-card-featured" : ""}${wide ? " project-card-wide" : ""}`}
      data-reveal
    >
      <ProjectDiagram project={project.title} />

      <div className="project-content">
        <div className="project-header-meta">
          <span className="project-category-tag">{project.category}</span>
          <div className="project-meta-right">
            {project.status && (
              <span
                className={`project-status ${
                  project.status === "In development"
                    ? "status-development"
                    : "status-released"
                }`}
              >
                {project.status}
              </span>
            )}
            {project.year && <span className="project-year">{project.year}</span>}
          </div>
        </div>

        <h3 className="project-title">{project.title}</h3>
        <p className="project-description">{project.description}</p>

        <div className="project-technologies">
          {project.tech.map((tech) => (
            <span key={tech} className="tech-tag">
              {tech}
            </span>
          ))}
        </div>

        {(project.links?.website ||
          project.links?.github ||
          project.links?.demo ||
          project.links?.release) && (
          <div className="project-actions">
            {project.links?.website && (
              <a
                className="project-btn primary"
                href={project.links.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                Website ↗
              </a>
            )}
            {project.links?.demo && (
              <a
                className="project-btn primary"
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
              >
                Live Demo ↗
              </a>
            )}
            {project.links?.release && (
              <a
                className="project-btn"
                href={project.links.release}
                target="_blank"
                rel="noopener noreferrer"
              >
                Release Notes ↗
              </a>
            )}
            {project.links?.github && (
              <a
                className="project-btn"
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                Source Code ↗
              </a>
            )}
          </div>
        )}

        <details className="project-disclosure">
          <summary>
            <span className="label-closed">Technical Details & Notes</span>
            <span className="label-open">Hide Details</span>
            <span className="disclosure-arrow" aria-hidden="true">+</span>
          </summary>
          <div className="project-details-body">
            <div>
              <span className="details-subtitle">Architecture & Approach</span>
              <p className="details-text">
                {project.longDescription || project.description}
              </p>
            </div>

            {project.features && project.features.length > 0 && (
              <div>
                <span className="details-subtitle">Key Highlights</span>
                <ul className="feature-list">
                  {project.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}

            {project.plannedFeatures && project.plannedFeatures.length > 0 && (
              <div>
                <span className="details-subtitle">Roadmap & Next Steps</span>
                <ul className="feature-list planned-list">
                  {project.plannedFeatures.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="specs-grid">
              {project.role && (
                <div className="spec-item">
                  <span className="spec-key">Role</span>
                  <span className="spec-val">{project.role}</span>
                </div>
              )}
              <div className="spec-item">
                <span className="spec-key">Core Stack</span>
                <span className="spec-val">{project.tech.join(" · ")}</span>
              </div>
            </div>
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
        {visible.map((project, index) => (
          <ProjectCard
            key={project.title}
            project={project}
            featured={index === 0}
          />
        ))}
      </div>

      {additional.length > 0 && (
        <details className="more-projects-wrapper">
          <summary className="more-projects-toggle">
            <span>Archive & Additional Projects ({additional.length})</span>
            <span className="disclosure-arrow" aria-hidden="true">↓</span>
          </summary>
          <div className="more-projects-content">
            {additional.map((project) => (
              <ProjectCard key={project.title} project={project} wide />
            ))}
          </div>
        </details>
      )}
    </>
  );
}
