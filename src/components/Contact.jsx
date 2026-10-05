import { useState } from 'react';
import { EMAIL, GITHUB, LINKEDIN } from '../data.js';
import { GithubIcon, LinkedinIcon, MailIcon, PinIcon, SendIcon } from './Icons.jsx';

const checks = {
  name: v => v.length >= 2 || 'Enter your name.',
  email: v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) || 'Enter a valid email address, like jane@company.com.',
  mobile: v => v.length >= 10 || 'Enter your whatsapp mobile number',
  subject: v => v.length >= 3 || 'Add a short subject.',
  message: v => v.length >= 10 || 'Write at least a sentence (10 characters).',
};
const empty = { name: '', email: '', subject: '', message: '' };

function CopyEmail() {
  const [label, setLabel] = useState('Copy');
  const done = msg => { setLabel(msg); setTimeout(() => setLabel('Copy'), 1800); };
  const selectIt = () => {
    const range = document.createRange();
    range.selectNodeContents(document.getElementById('emailText'));
    const sel = getSelection(); sel.removeAllRanges(); sel.addRange(range);
    done('Selected');
  };
  const copy = () => {
    try { navigator.clipboard.writeText(EMAIL).then(() => done('Copied'), selectIt); }
    catch { selectIt(); }
  };
  return <button type="button" className="ch-action" onClick={copy}>{label}</button>;
}

function ContactForm() {
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ kind: '', text: '' });
  const [sending, setSending] = useState(false);

  const onChange = e => {
    const { name, value } = e.target;
    setValues(v => ({ ...v, [name]: value }));
    if (errors[name]) {
      const res = checks[name](value.trim());
      setErrors(er => ({ ...er, [name]: res === true ? '' : res }));
    }
  };

  const onSubmit = async e => {
    e.preventDefault();
    setStatus({ kind: '', text: '' });
    const data = {}, next = {};
    let firstBad = null;
    for (const k of Object.keys(checks)) {
      const v = values[k].trim();
      const res = checks[k](v);
      next[k] = res === true ? '' : res;
      if (res !== true && !firstBad) firstBad = k;
      data[k] = v;
    }
    setErrors(next);
    if (firstBad) { document.getElementById(`cf-${firstBad}`).focus(); return; }

    setSending(true);
    try {
    const res = await fetch('/api/resend', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: data.name, email: data.email, subject: data.subject, message: data.message }),
    });
    const json = await res.json().catch(() => ({}));
    if (res.ok && json.success) {
            setStatus({ kind: 'ok', text: `Message sent. I'll reply to ${data.email}.` });
    } else {
      throw new Error(json.message || 'Request failed');
    }
    } catch {
      setStatus({ kind: 'bad', text: `The message couldn't be sent from this page. Email me directly at ${EMAIL} and I'll get back to you.` });
    } finally {
      setSending(false);
    }
  };

  const field = (id, label, props, Tag = 'input') => (
    <div className="field">
      <label htmlFor={`cf-${id}`}>{label}</label>
      <Tag
        id={`cf-${id}`} name={id} value={values[id]} onChange={onChange}
        aria-invalid={errors[id] ? 'true' : 'false'} aria-describedby={`cf-${id}-err`} {...props}
      />
      <p className="err" id={`cf-${id}-err`}>{errors[id] || ''}</p>
    </div>
  );

  return (
    <form className="panel corners form rv" id="contactForm" noValidate style={{ '--i': '2' }} onSubmit={onSubmit}>
      <div className="form-head"><span>Transmission</span><span>To: {EMAIL}</span></div>
      <div className="row2">
        {field('name', 'Your name', { type: 'text', autoComplete: 'name', placeholder: 'Jane Tan' })}
        {field('email', 'Email address', { type: 'email', autoComplete: 'email', placeholder: 'jane@company.com' })}
        {field('email', 'Mobile', { type: 'mobile', placeholder: '+60123456789' })}
      </div>
      {field('subject', 'Subject', { type: 'text', placeholder: 'Job opportunity, collaboration, automation project' })}
      {field('message', 'Message', { placeholder: "Tell me what you're building." }, 'textarea')}
      <div className="form-foot">
        <p className={`form-status${status.kind ? ' ' + status.kind : ''}`} role="status" aria-live="polite">{status.text}</p>
        <button className="btn btn-primary magnet" type="submit" disabled={sending}>
          {sending && <span className="spinner" />}
          <span>{sending ? 'Sending' : 'Send message'}</span>
          <SendIcon />
        </button>
      </div>
    </form>
  );
}

export default function Contact() {
  return (
    <section className="section" id="contact">
      <div className="wrap">
        <div className="sec-head rv">
          <div>
            <p className="kicker">Contact</p>
            <h2>Let's build <em>something</em></h2>
          </div>
        </div>
        <div className="contact-grid">
          <div className="contact-copy rv" style={{ '--i': '1' }}>
            <p>Hiring, planning an automation project, or want to talk shop about n8n and computer vision? Send a message or reach me on any of these.</p>
            <div className="channels">
              <div className="panel channel tilt">
                <span className="ch-icon"><MailIcon /></span>
                <span><span className="ch-label">Email</span><span className="ch-value" id="emailText">{EMAIL}</span></span>
                <CopyEmail />
              </div>
              <a className="panel channel tilt" href={LINKEDIN} target="_blank" rel="noopener noreferrer">
                <span className="ch-icon"><LinkedinIcon /></span>
                <span><span className="ch-label">LinkedIn</span><span className="ch-value">abdulazimkhan01</span></span>
                <span className="ch-action">Open ↗</span>
              </a>
              <a className="panel channel tilt" href={GITHUB} target="_blank" rel="noopener noreferrer">
                <span className="ch-icon"><GithubIcon /></span>
                <span><span className="ch-label">GitHub</span><span className="ch-value">abdulazimkhan26</span></span>
                <span className="ch-action">Open ↗</span>
              </a>
              <div className="panel channel tilt">
                <span className="ch-icon"><PinIcon /></span>
                <span><span className="ch-label">Location</span><span className="ch-value">Kuala Lumpur, Malaysia (GMT+8)</span></span>
              </div>
            </div>
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
