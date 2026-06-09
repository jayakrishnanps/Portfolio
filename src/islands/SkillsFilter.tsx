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
                ? "bg-white text-black border-white"
                : "bg-[var(--surface-2)] border-[var(--border)] hover:border-[#444444]"
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
              <span className="text-xs font-bold tabular-nums opacity-70">{skill.level}%</span>
            </div>
            <div className="h-3 overflow-hidden w-full relative bg-[#222] border border-[#444] group-hover:bg-[#e5e5e5] group-hover:border-[#ccc] transition-colors">
              <div
                className="h-full bg-white group-hover:bg-black transition-colors"
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
