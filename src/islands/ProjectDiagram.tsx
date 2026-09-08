import React from "react";

const Arrow = () => <span className="diagram-arrow" aria-hidden="true">→</span>;

export default function ProjectDiagram({ project }: { project: string }) {
  if (project === "Tutorva") {
    return (
      <figure className="project-visual visual-learning" aria-label="Tutorva feature diagram: scheduling, video sessions, attendance, and document-based test generation.">
        <figcaption className="plate-caption"><span>01 / Education</span><span>Feature diagram</span></figcaption>
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
        <figcaption className="plate-caption"><span>02 / Operations</span><span>Feature diagram</span></figcaption>
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

  return (
    <figure className="project-visual visual-clinical" aria-label="Clinical feature diagram: patient records connect to appointments, medications, and treatments.">
      <figcaption className="plate-caption"><span>03 / Healthcare</span><span>Feature diagram</span></figcaption>
      <div className="clinical-map diagram-content">
        <svg className="clinical-connectors" viewBox="0 0 420 220" preserveAspectRatio="none" fill="none" aria-hidden="true"><path className="clinical-branch" d="M210 54 V165 M105 165 H315" /><path className="clinical-line" d="M210 40 V210" /><circle cx="210" cy="110" r="4" /></svg>
        <div className="clinical-root diagram-node">Patient record</div>
        <div className="clinical-leaves"><span className="diagram-node">Appointments</span><span className="diagram-node">Medications</span><span className="diagram-node">Treatments</span></div>
      </div>
      <div className="plate-footer"><span>Python / Django</span><span aria-hidden="true">↗</span></div>
    </figure>
  );
}
