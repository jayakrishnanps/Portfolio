import React, { useState } from 'react';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = 'Valid email required';
    if (form.message.trim().length < 12) newErrors.message = 'Message must be at least 12 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('sending');
    await new Promise((r) => setTimeout(r, 700));

    setStatus('success');
    setForm({ name: '', email: '', message: '' });
    setTimeout(() => setStatus('idle'), 4200);
  };

  if (status === 'success') {
    return (
      <div className="card text-center py-10 border-[var(--accent)]/30">
        <div className="text-4xl mb-4">✓</div>
        <h3 className="text-xl font-semibold mb-2">Message received.</h3>
        <p className="text-[var(--text-muted)]">Thank you. I'll reply within 48 hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <input 
            type="text" 
            placeholder="Your name" 
            value={form.name} 
            onChange={e => setForm({ ...form, name: e.target.value })} 
            className="form-input" 
          />
          {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
        </div>
        <div>
          <input 
            type="email" 
            placeholder="Email address" 
            value={form.email} 
            onChange={e => setForm({ ...form, email: e.target.value })} 
            className="form-input" 
          />
          {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
        </div>
      </div>

      <div>
        <textarea 
          placeholder="Your message..." 
          rows={6} 
          value={form.message} 
          onChange={e => setForm({ ...form, message: e.target.value })} 
          className="form-input resize-y" 
        />
        {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
      </div>

      <button 
        type="submit" 
        disabled={status === 'sending'} 
        className="btn btn-primary px-10 disabled:opacity-70"
      >
        {status === 'sending' ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}
