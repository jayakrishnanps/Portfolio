import React from "react";

const Arrow = () => <span className="diagram-arrow" aria-hidden="true">→</span>;

export default function ProjectDiagram({ project }: { project: string }) {
  if (project === "Orbit AI") {
    return (
      <figure className="project-visual visual-learning visual-orbit" aria-label="Orbit AI architecture: workspace editing with Monaco, streaming Groq assistance, and a native terminal.">
        <figcaption className="plate-caption"><span>Developer tools</span><span>Desktop editor</span></figcaption>
        <div className="plate-heading">Orbit AI<span className="plate-punctuation">.</span></div>
        <div className="learning-map diagram-content">
          <div className="diagram-lane"><p>Editing workflow</p><div className="diagram-track"><span className="diagram-node">Workspace</span><Arrow /><span className="diagram-node node-highlight">Monaco editor</span><Arrow /><span className="diagram-node">File updates</span></div></div>
          <div className="diagram-lane"><p>AI assistance</p><div className="diagram-track"><span className="diagram-node">Code context</span><Arrow /><span className="diagram-node node-highlight">Groq stream</span><Arrow /><span className="diagram-node">Code changes</span></div></div>
        </div>
        <div className="plate-footer"><span>Electron / React / TypeScript</span><span aria-hidden="true">↗</span></div>
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
          <div className="ascent-outcomes"><span className="diagram-node">XP & levels</span><span className="diagram-node">Achievements</span><span className="diagram-node">Recurrence</span></div>
        </div>
        <div className="plate-footer"><span>Kotlin / Compose / Room</span><span aria-hidden="true">↗</span></div>
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
        <div className="plate-footer"><span>Next.js / Django REST</span><span aria-hidden="true">↗</span></div>
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
        <div className="plate-footer"><span>Python / Django / AI</span><span aria-hidden="true">↗</span></div>
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
          <div className="inventory-output"><span className="diagram-label">Output</span><span>Product<br />recommendations</span><span className="output-mark" aria-hidden="true">↗</span></div>
        </div>
        <div className="plate-footer"><span>Next.js / Node.js / MongoDB</span><span aria-hidden="true">↗</span></div>
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
      <div className="plate-footer"><span>Python / Django</span><span aria-hidden="true">↗</span></div>
    </figure>
  );
}
