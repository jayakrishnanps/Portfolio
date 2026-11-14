import React from "react";

export default function ProjectDiagram({ project }: { project: string }) {
  if (project === "Orbit AI") {
    return (
      <figure className="project-visual" aria-label="Orbit AI interface preview">
        <div className="window-chrome">
          <div className="window-dots">
            <span className="window-dot dot-red"></span>
            <span className="window-dot dot-yellow"></span>
            <span className="window-dot dot-green"></span>
          </div>
          <span className="window-title">orbit-ai/src/stream.ts</span>
          <span className="window-badge">Electron Desktop</span>
        </div>
        <div className="preview-content">
          <div className="code-preview">
            <span className="code-comment">// IPC Bridge: Stream Groq completions to Monaco Editor</span><br />
            <span className="code-keyword">const</span> stream = <span className="code-keyword">await</span> window.<span className="code-fn">electronAPI</span>.<span className="code-fn">groqStream</span>(&#123;<br />
            &nbsp;&nbsp;model: <span className="code-str">"llama-3.3-70b"</span>,<br />
            &nbsp;&nbsp;context: editor.<span className="code-fn">getActiveFileText</span>()<br />
            &#125;);<br />
            stream.<span className="code-fn">on</span>(<span className="code-str">"delta"</span>, (chunk) =&gt; editor.<span className="code-fn">applyChanges</span>(chunk));
          </div>
          <div className="terminal-strip">
            <span style={{ color: "#38bdf8" }}>PS E:\workspace&gt;</span>
            <span>node-pty terminal connected (xterm.js) · Ready</span>
          </div>
        </div>
      </figure>
    );
  }

  if (project === "Ascent") {
    return (
      <figure className="project-visual" aria-label="Ascent app preview">
        <div className="window-chrome">
          <div className="window-dots">
            <span className="window-dot dot-red"></span>
            <span className="window-dot dot-yellow"></span>
            <span className="window-dot dot-green"></span>
          </div>
          <span className="window-title">Ascent / Task Progress</span>
          <span className="window-badge">Kotlin & Compose</span>
        </div>
        <div className="preview-content">
          <div className="mobile-task-card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "0.825rem", fontWeight: 600, color: "#f8fafc" }}>Level 14 Adventurer</span>
              <span style={{ fontSize: "0.75rem", fontFamily: "var(--mono)", color: "#34d399" }}>3,450 / 4,000 XP</span>
            </div>
            <div className="task-progress-bar">
              <div className="task-progress-fill"></div>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "0.8rem", color: "#94a3b8", paddingTop: "4px" }}>
              <span>✓ Daily Recurrence Complete</span>
              <span style={{ color: "#f59e0b", fontWeight: 600 }}>🔥 7-Day Streak</span>
            </div>
          </div>
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", fontSize: "0.725rem", fontFamily: "var(--mono)", color: "#64748b" }}>
            <span>Room DB Persistence</span> · <span>Jetpack Compose</span> · <span>Hilt DI</span>
          </div>
        </div>
      </figure>
    );
  }

  if (project === "Athena") {
    return (
      <figure className="project-visual" aria-label="Athena workspace preview">
        <div className="window-chrome">
          <div className="window-dots">
            <span className="window-dot dot-red"></span>
            <span className="window-dot dot-yellow"></span>
            <span className="window-dot dot-green"></span>
          </div>
          <span className="window-title">Athena Research / Source Index</span>
          <span className="window-badge">Next.js + Django</span>
        </div>
        <div className="preview-content">
          <div className="research-preview-grid">
            <div className="research-source-item">
              <span>📄 architecture-spec.pdf</span>
              <span style={{ color: "#34d399", fontSize: "0.725rem" }}>Indexed</span>
            </div>
            <div style={{ padding: "10px 12px", background: "rgba(15, 20, 30, 0.7)", borderRadius: "6px", border: "1px solid rgba(255, 255, 255, 0.05)" }}>
              <p style={{ fontSize: "0.775rem", color: "#60a5fa", margin: "0 0 4px" }}>Q: How are documents grounded?</p>
              <p style={{ fontSize: "0.775rem", color: "#cbd5e1", margin: 0, lineHeight: 1.5 }}>
                Answers are synthesized against source chunks using semantic retrieval with source references.
              </p>
            </div>
          </div>
        </div>
      </figure>
    );
  }

  if (project === "Tutorva") {
    return (
      <figure className="project-visual" aria-label="Tutorva platform preview">
        <div className="window-chrome">
          <div className="window-dots">
            <span className="window-dot dot-red"></span>
            <span className="window-dot dot-yellow"></span>
            <span className="window-dot dot-green"></span>
          </div>
          <span className="window-title">Tutorva / Session & Assessment</span>
          <span className="window-badge">Django Web</span>
        </div>
        <div className="preview-content">
          <div className="live-session-widget">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span className="session-live-badge">● WebRTC Live</span>
              <span style={{ fontSize: "0.75rem", color: "#94a3b8" }}>Attendance: 24/24 Verified</span>
            </div>
            <div style={{ padding: "8px 12px", background: "rgba(15, 20, 30, 0.6)", borderRadius: "6px", border: "1px solid rgba(255, 255, 255, 0.05)" }}>
              <p style={{ fontSize: "0.775rem", color: "#f8fafc", margin: "0 0 2px" }}>Auto-Generated Quiz</p>
              <p style={{ fontSize: "0.725rem", color: "#94a3b8", margin: 0 }}>
                10 MCQs generated from document upload with ML recommendation.
              </p>
            </div>
          </div>
        </div>
      </figure>
    );
  }

  if (project === "Product Management System") {
    return (
      <figure className="project-visual" aria-label="Product management preview">
        <div className="window-chrome">
          <div className="window-dots">
            <span className="window-dot dot-red"></span>
            <span className="window-dot dot-yellow"></span>
            <span className="window-dot dot-green"></span>
          </div>
          <span className="window-title">Inventory / Restock Intelligence</span>
          <span className="window-badge">Node + Mongo</span>
        </div>
        <div className="preview-content">
          <div style={{ padding: "14px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "8px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <span style={{ fontSize: "0.8rem", color: "#94a3b8" }}>Stock Health</span>
              <span style={{ fontSize: "0.8rem", color: "#34d399", fontWeight: 600 }}>98.4% Optimal</span>
            </div>
            <div style={{ fontSize: "0.8rem", color: "#cbd5e1", lineHeight: 1.5 }}>
              Restock recommendation generated based on 30-day velocity patterns.
            </div>
          </div>
        </div>
      </figure>
    );
  }

  if (project === "Hospital Management System") {
    return (
      <figure className="project-visual" aria-label="Hospital management preview">
        <div className="window-chrome">
          <div className="window-dots">
            <span className="window-dot dot-red"></span>
            <span className="window-dot dot-yellow"></span>
            <span className="window-dot dot-green"></span>
          </div>
          <span className="window-title">Clinical Ops / Patient Records</span>
          <span className="window-badge">Python & Django</span>
        </div>
        <div className="preview-content">
          <div style={{ padding: "14px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "8px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <span style={{ fontSize: "0.8rem", color: "#94a3b8" }}>Clinical Queue</span>
              <span style={{ fontSize: "0.75rem", color: "#38bdf8", fontWeight: 600 }}>18 Active Appointments</span>
            </div>
            <div style={{ fontSize: "0.8rem", color: "#cbd5e1", lineHeight: 1.5 }}>
              Patient admissions, medication schedules, and clinical staff updates synchronized.
            </div>
          </div>
        </div>
      </figure>
    );
  }

  return null;
}
