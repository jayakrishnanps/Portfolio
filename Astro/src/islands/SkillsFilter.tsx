import React, { useState } from 'react';
import type { Skill } from '../data/skills';
import { skillCategories, type SkillCategory } from '../data/skills';

interface Props {
  skills: Skill[];
}

export default function SkillsFilter({ skills }: Props) {
  const [active, setActive] = useState<SkillCategory>('All');

  const filtered = active === 'All' 
    ? skills 
    : skills.filter((s) => s.category === active);

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-8">
        {skillCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-5 py-1.5 rounded-full text-sm font-medium transition-all border ${
              active === cat
                ? 'bg-white text-black border-white'
                : 'bg-[var(--surface-2)] border-[var(--border)] hover:border-[#444444]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((skill) => (
          <div key={skill.name} className="skill-pill flex flex-col gap-2.5 py-4">
            <div className="flex justify-between items-baseline">
              <span className="font-semibold">{skill.name}</span>
              <span className="text-xs text-[var(--text-muted)] tabular-nums">{skill.level}%</span>
            </div>
            <div className="h-1.5 bg-[var(--surface-2)] rounded-full overflow-hidden">
              <div
                className="skill-bar h-full bg-white rounded-full"
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
