import React, { useState } from "react";
import type { Skill } from "../data/skills";
import { skillCategories, type SkillCategory } from "../data/skills";

interface Props {
  skills: Skill[];
}

export default function SkillsFilter({ skills }: Props) {
  const [active, setActive] = useState<SkillCategory>("All");

  const filtered =
    active === "All" ? skills : skills.filter((s) => s.category === active);

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-8">
        {skillCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-5 py-1.5 rounded-full text-sm font-medium transition-all border ${
              active === cat
                ? "bg-[var(--accent)] text-white border-[var(--accent)] shadow-[3px_3px_0px_#00C853]"
                : "bg-[var(--surface-2)] border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--accent)] hover:text-[var(--text)]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((skill) => (
          <div key={skill.name} className="skill-pill group flex flex-col gap-2.5 py-4">
            <div className="flex justify-between items-baseline mb-2">
              <span className="font-extrabold tracking-widest uppercase">{skill.name}</span>
              <span className="text-xs font-bold tabular-nums text-[var(--green)]">{skill.level}%</span>
            </div>
            <div className="h-3 overflow-hidden w-full relative bg-[var(--surface-2)] border border-[var(--border)] group-hover:border-[var(--accent)] transition-colors rounded-full">
              <div
                className="h-full bg-[var(--accent)] transition-colors rounded-full"
                data-level={skill.level}
                style={{ width: `${skill.level}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
