import React, { useState } from "react";
import { contact } from "../data/contact";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [draftOpened, setDraftOpened] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const messageField = event.currentTarget.elements.namedItem(
      "message"
    ) as HTMLTextAreaElement;

    if (form.message.trim().length < 10) {
      messageField.setCustomValidity("Please enter at least 10 characters.");
      messageField.reportValidity();
      return;
    }

    const subject = `Engineering Inquiry from ${form.name.trim()}`;
    const body = `${form.message.trim()}\n\n---\nFrom: ${form.name.trim()}\nEmail: ${form.email.trim()}`;
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    setDraftOpened(true);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <div className="form-row">
        <div className="form-field">
          <label htmlFor="contact-name">Your Name</label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Sarah Jenkins"
            required
            maxLength={100}
            value={form.name}
            onChange={(e) => {
              setForm({ ...form, name: e.target.value });
              setDraftOpened(false);
            }}
          />
        </div>
        <div className="form-field">
          <label htmlFor="contact-email">Email Address</label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="sarah@example.com"
            required
            maxLength={254}
            value={form.email}
            onChange={(e) => {
              setForm({ ...form, email: e.target.value });
              setDraftOpened(false);
            }}
          />
        </div>
      </div>

      <div className="form-field">
        <label htmlFor="contact-message">Message</label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          placeholder="Hi Jayakrishnan, we have an open role / project and would love to chat about..."
          required
          minLength={10}
          maxLength={3000}
          value={form.message}
          onChange={(e) => {
            e.currentTarget.setCustomValidity("");
            setForm({ ...form, message: e.target.value });
            setDraftOpened(false);
          }}
        />
      </div>

      <div className="form-actions">
        <button type="submit" className="send-button">
          Open Email Client
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <line x1="7" y1="17" x2="17" y2="7"></line>
            <polyline points="7 7 17 7 17 17"></polyline>
          </svg>
        </button>

        <button
          type="button"
          onClick={copyEmail}
          className="btn-secondary"
          style={{ padding: "10px 16px", fontSize: "0.85rem" }}
        >
          {copied ? "✓ Copied Email!" : "Copy Email Address"}
        </button>
      </div>

      {draftOpened && (
        <div className="form-feedback" role="status">
          <strong>Draft created!</strong> If your email client did not
          automatically launch, feel free to email directly at{" "}
          <a href={`mailto:${contact.email}`}>{contact.email}</a>.
        </div>
      )}
    </form>
  );
}
