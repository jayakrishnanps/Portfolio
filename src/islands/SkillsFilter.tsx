import React, { useState } from "react";
import { skillCategories, type Skill, type SkillCategory } from "../data/skills";

export default function SkillsFilter({ skills }: { skills: Skill[] }) {
  const [active, setActive] = useState<SkillCategory>("All");
  const filtered = active === "All" ? skills : skills.filter((skill) => skill.category === active);
  return (
    <div className="toolkit" data-reveal>
      <div className="skill-index-heading"><span className="mono">Working knowledge</span><span className="mono">Index 01—{String(skills.length).padStart(2, "0")}</span></div>
      <div className="skill-filters" role="group" aria-label="Filter skills by category">
        {skillCategories.map((category) => (
          <button type="button" key={category} aria-pressed={active === category} aria-controls="skill-list" onClick={() => setActive(category)} className={active === category ? "filter-button is-active" : "filter-button"}>
            {category}<span>{category === "All" ? skills.length : skills.filter((skill) => skill.category === category).length}</span>
          </button>
        ))}
      </div>
      <p className="sr-only" role="status">{filtered.length} {active === "All" ? "" : active.toLowerCase() + " "}skills shown</p>
      <ul className="skill-list" id="skill-list" key={active}>
        {filtered.map((skill) => (
          <li key={skill.name} className="skill-item"><span className="skill-index" aria-hidden="true">{String(skills.indexOf(skill) + 1).padStart(2, "0")}</span><span className="skill-entry"><span className="skill-name">{skill.name}</span><span className="skill-category mono">{skill.category}</span></span></li>
        ))}
      </ul>
      <div className="skill-index-footer"><span className="mono">{String(filtered.length).padStart(2, "0")} entries on file</span><span aria-hidden="true">§</span></div>
    </div>
  );
}
