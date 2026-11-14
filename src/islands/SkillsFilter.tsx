import React, { useState } from "react";
import { skillCategories, type Skill, type SkillCategory } from "../data/skills";

export default function SkillsFilter({ skills }: { skills: Skill[] }) {
  const [active, setActive] = useState<SkillCategory>("All");
  const filtered =
    active === "All"
      ? skills
      : skills.filter((skill) => skill.category === active);

  return (
    <div className="skills-wrapper" data-reveal>
      <div
        className="skill-filters"
        role="group"
        aria-label="Filter skills by technical domain"
      >
        {skillCategories.map((category) => {
          const count =
            category === "All"
              ? skills.length
              : skills.filter((s) => s.category === category).length;
          return (
            <button
              type="button"
              key={category}
              aria-pressed={active === category}
              onClick={() => setActive(category)}
              className={
                active === category ? "filter-button is-active" : "filter-button"
              }
            >
              <span>{count}</span>
              {category}
            </button>
          );
        })}
      </div>

      <p className="sr-only" role="status">
        {filtered.length} {active === "All" ? "" : active.toLowerCase() + " "}
        skills displayed
      </p>

      <ul className="skill-grid" key={active}>
        {filtered.map((skill) => (
          <li
            key={skill.name}
            className={`skill-card${skill.highlight ? " is-highlight" : ""}`}
          >
            <div className="skill-info">
              <span className="skill-name">{skill.name}</span>
              <span className="skill-category-badge">{skill.category}</span>
            </div>
            <span className="skill-indicator" aria-hidden="true"></span>
          </li>
        ))}
      </ul>
    </div>
  );
}
