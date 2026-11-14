import React, { useState } from "react";
import { contact } from "../data/contact";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [draftOpened, setDraftOpened] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const messageField = event.currentTarget.elements.namedItem('message') as HTMLTextAreaElement;
    messageField.setCustomValidity(form.message.trim().length < 12 ? 'Enter at least 12 characters.' : '');
    if (!event.currentTarget.reportValidity()) return;
    const subject = `Portfolio inquiry from ${form.name.trim()}`;
    const body = `${form.message.trim()}\n\nFrom: ${form.name.trim()}\nReply to: ${form.email.trim()}`;
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setDraftOpened(true);
  };

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <div className="form-row">
        <div className="form-field"><label htmlFor="contact-name">Name</label><input id="contact-name" name="name" type="text" autoComplete="name" placeholder="Full name" required pattern={".*\\S.*"} title="Enter your name." maxLength={100} value={form.name} onChange={(event) => { setForm({ ...form, name: event.target.value }); setDraftOpened(false); }} /></div>
        <div className="form-field"><label htmlFor="contact-email">Email address</label><input id="contact-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required maxLength={254} value={form.email} onChange={(event) => { setForm({ ...form, email: event.target.value }); setDraftOpened(false); }} /></div>
      </div>
      <div className="form-field"><label htmlFor="contact-message">Message</label><textarea id="contact-message" name="message" rows={4} placeholder="Role or project scope, requirements, and timeline" required minLength={12} maxLength={3000} value={form.message} onChange={(event) => { event.currentTarget.setCustomValidity(''); setForm({ ...form, message: event.target.value }); setDraftOpened(false); }} /></div>
      <div className="form-actions"><button type="submit" className="send-button">Open email draft <span aria-hidden="true">↗</span></button><span>Review and send in your email app.</span></div>
      {draftOpened && <p className="form-feedback" role="status">Complete sending in your email app. If it did not open, email <a href={`mailto:${contact.email}`}>{contact.email}</a> directly. Your message remains in this form.</p>}
    </form>
  );
}
