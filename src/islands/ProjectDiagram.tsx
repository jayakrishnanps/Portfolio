import React from "react";

const Arrow = () => <span className="diagram-arrow" aria-hidden="true">→</span>;

export default function ProjectDiagram({ project }: { project: string }) {
  if (project === "Orbit AI") {
    return (
      <figure className="project-visual visual-orbit" aria-label="Orbit AI architecture: an Electron application connects Monaco editing, workspace files, Groq AI, and a PowerShell terminal through IPC.">
        <figcaption className="plate-caption"><span>Developer tools</span><span>Application architecture</span></figcaption>
        <div className="plate-heading">Orbit AI<span className="plate-punctuation">.</span></div>
        <div className="orbit-map diagram-content">
          <svg className="orbit-connections" viewBox="0 0 600 300" preserveAspectRatio="none" fill="none" aria-hidden="true">
            <g className="orbit-wide-connections">
              <path data-trace pathLength="1" d="M100 75 H180 Q195 75 195 90 V135 Q195 150 210 150 H300" />
              <path data-trace pathLength="1" d="M100 225 H180 Q195 225 195 210 V165 Q195 150 210 150 H300" />
              <path data-trace pathLength="1" d="M300 150 H390 Q405 150 405 135 V90 Q405 75 420 75 H500" />
              <path data-trace pathLength="1" d="M300 150 H390 Q405 150 405 165 V210 Q405 225 420 225 H500" />
            </g>
            <g className="orbit-compact-connections">
              <path data-trace pathLength="1" d="M150 36 V90 Q150 110 170 110 H280 Q300 110 300 130 V150" />
              <path data-trace pathLength="1" d="M450 36 V90 Q450 110 430 110 H320 Q300 110 300 130 V150" />
              <path data-trace pathLength="1" d="M300 150 V170 Q300 190 280 190 H170 Q150 190 150 210 V264" />
              <path data-trace pathLength="1" d="M300 150 V170 Q300 190 320 190 H430 Q450 190 450 210 V264" />
            </g>
          </svg>
          <div className="diagram-node orbit-node orbit-editor"><span>Monaco</span><small>Code editor</small></div>
          <div className="diagram-node orbit-node orbit-files"><span>Workspace</span><small>File system</small></div>
          <div className="orbit-core"><span>Electron</span><small>IPC bridge</small></div>
          <div className="diagram-node orbit-node orbit-assistant"><span>Groq</span><small>AI stream</small></div>
          <div className="diagram-node orbit-node orbit-terminal"><span>PowerShell</span><small>Terminal</small></div>
        </div>
        <div className="plate-footer"><span>React / TypeScript / Electron</span><span>Desktop application</span></div>
      </figure>
    );
  }

  if (project === "Ascent") {
    return (
      <figure className="project-visual visual-ascent" aria-label="Ascent task-completion workflow: complete a task, record progress, evaluate achievements, and schedule recurrence.">
        <figcaption className="plate-caption"><span>Android</span><span>Task workflow</span></figcaption>
        <div className="plate-heading">Ascent<span className="plate-punctuation">.</span></div>
        <div className="ascent-map diagram-content">
          <span className="diagram-node ascent-task">Complete task <span aria-hidden="true">✓</span></span>
          <span className="ascent-connector" aria-hidden="true">↓</span>
          <svg className="ascent-branches" viewBox="0 0 600 64" preserveAspectRatio="none" fill="none" aria-hidden="true"><path data-trace pathLength="1" d="M300 0 V28 M100 64 V28 H500 V64 M300 28 V64" /></svg>
          <div className="ascent-outcomes"><span className="diagram-node">XP & levels</span><span className="diagram-node">Achievements</span><span className="diagram-node">Recurrence</span></div>
        </div>
        <div className="plate-footer"><span>Kotlin / Compose / Room</span></div>
      </figure>
    );
  }

  if (project === "Athena") {
    return (
      <figure className="project-visual visual-athena" aria-label="Athena development status: Next.js interface and Django health-check API implemented; document ingestion and source-based AI answers planned.">
        <figcaption className="plate-caption"><span>Research workspace</span><span>In development</span></figcaption>
        <div className="plate-heading">Athena<span className="plate-punctuation">.</span></div>
        <div className="athena-map diagram-content">
          <div><p className="diagram-label">Implemented</p><span className="diagram-node">Next.js interface + Django scaffold</span></div>
          <div className="athena-planned"><p className="diagram-label">Planned</p><span className="diagram-node">Documents → source-based answers</span></div>
        </div>
        <div className="plate-footer"><span>Next.js / Django REST</span></div>
      </figure>
    );
  }

  if (project === "Tutorva") {
    return (
      <figure className="project-visual visual-learning" aria-label="Tutorva feature diagram: scheduling, video sessions, attendance, and document-based test generation.">
        <figcaption className="plate-caption"><span>Education</span><span>Feature diagram</span></figcaption>
        <div className="plate-heading">Tutorva<span className="plate-punctuation">.</span></div>
        <div className="learning-map diagram-content">
          <div className="diagram-lane"><p>Live learning</p><div className="diagram-track"><span className="diagram-node">Scheduling</span><Arrow /><span className="diagram-node node-highlight">Video session</span><Arrow /><span className="diagram-node">Attendance</span></div></div>
          <div className="diagram-lane"><p>Assessment generation</p><div className="diagram-track"><span className="diagram-node">Document</span><Arrow /><span className="diagram-node node-highlight">AI generation</span><Arrow /><span className="diagram-node">Test paper</span></div></div>
        </div>
        <div className="plate-footer"><span>Python / Django / AI</span></div>
      </figure>
    );
  }

  if (project === "Product Management System") {
    return (
      <figure className="project-visual visual-inventory" aria-label="Inventory feature diagram: product inventory and usage patterns inform product recommendations.">
        <figcaption className="plate-caption"><span>Operations</span><span>Feature diagram</span></figcaption>
        <div className="inventory-map diagram-content">
          <div className="inventory-inputs"><span className="diagram-node">Product inventory</span><span className="diagram-node">Usage patterns</span></div>
          <svg className="inventory-connectors" viewBox="0 0 80 140" fill="none" aria-hidden="true"><path d="M0 28 H28 V70 H78 M0 112 H28 V70" /><path d="m70 64 7 6-7 6" /></svg>
          <span className="inventory-mobile-arrow" aria-hidden="true">↓</span>
          <div className="inventory-output"><span className="diagram-label">Output</span><span>Product<br />recommendations</span></div>
        </div>
        <div className="plate-footer"><span>Next.js / Node.js / MongoDB</span></div>
      </figure>
    );
  }

  if (project !== "Hospital Management System") return null;

  return (
    <figure className="project-visual visual-clinical" aria-label="Clinical feature diagram: patient records connect to appointments, medications, and treatments.">
      <figcaption className="plate-caption"><span>Healthcare</span><span>Feature diagram</span></figcaption>
      <div className="clinical-map diagram-content">
        <svg className="clinical-connectors" viewBox="0 0 420 220" preserveAspectRatio="none" fill="none" aria-hidden="true"><path className="clinical-branch" d="M210 54 V165 M105 165 H315" /><path className="clinical-line" d="M210 40 V210" /><circle cx="210" cy="110" r="4" /></svg>
        <div className="clinical-root diagram-node">Patient record</div>
        <div className="clinical-leaves"><span className="diagram-node">Appointments</span><span className="diagram-node">Medications</span><span className="diagram-node">Treatments</span></div>
      </div>
      <div className="plate-footer"><span>Python / Django</span></div>
    </figure>
  );
}
