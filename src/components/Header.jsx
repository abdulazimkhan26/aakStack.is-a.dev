import { useEffect, useRef, useState } from 'react';
import { navLinks, GITHUB } from '../data.js';
import { GithubIcon } from './Icons.jsx';
import logo from '../../assets/logo.jpeg';

const fmt = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Kuala_Lumpur', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });

function Clock() {
  const [now, setNow] = useState(() => fmt.format(new Date()));
  useEffect(() => {
    const id = setInterval(() => setNow(fmt.format(new Date())), 1000);
    return () => clearInterval(id);
  }, []);
  return <span className="clock" role="timer" aria-label="Local time in Kuala Lumpur">KL <b>{now}</b> MYT</span>;
}

function useActiveSection() {
  const [cur, setCur] = useState('');
  useEffect(() => {
    const secs = [...document.querySelectorAll('main section[id]')];
    let raf = 0;
    const compute = () => {
      raf = 0;
      let c = '';
      for (const s of secs) if (s.getBoundingClientRect().top < innerHeight * 0.4) c = s.id;
      setCur(c);
    };
    const update = () => { if (!raf) raf = requestAnimationFrame(compute); };
    compute();
    addEventListener('scroll', update, { passive: true });
    addEventListener('resize', update);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener('scroll', update);
      removeEventListener('resize', update);
    };
  }, []);
  return cur;
}

export default function Header() {
  const cur = useActiveSection();
  const [open, setOpen] = useState(false);
  const btn = useRef(null);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = e => {
      if (e.key !== 'Escape') return;
      setOpen(false);
      btn.current?.focus();
    };
    addEventListener('keydown', onKey);
    return () => removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <header className="hud">
        <a className="brand" href="#top" aria-label="Abdul Azim Khan, back to top">
          <img src={logo} alt="AAKSTACK" className="nav-logo" width="40" height="40" />
        </a>
        <nav className="nav" aria-label="Sections">
          {navLinks.map(([id, label]) => (
            <a key={id} href={`#${id}`} className={cur === id ? 'on' : undefined}>
              {label}
            </a>
          ))}
        </nav>
        <div className="hud-right">
          <Clock />
          <a className="btn btn-ghost btn-icon" href={GITHUB} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile">
            <GithubIcon />
          </a>
          <button
            ref={btn} className="menu-btn" id="menuBtn" aria-expanded={open} aria-controls="mnav"
            aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(o => !o)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
              <path d={open ? 'M6 6l12 12M18 6 6 18' : 'M4 7h16M4 12h16M4 17h10'} />
            </svg>
          </button>
        </div>
        <div className="progress" aria-hidden="true" />
      </header>

      <nav className="mnav" id="mnav" aria-label="Sections" hidden={!open} onClick={e => { if (e.target.closest('a')) setOpen(false); }}>
        {navLinks.map(([id, label]) => (
          <a key={id} href={`#${id}`} className={cur === id ? 'on' : undefined}>{label}</a>
        ))}
      </nav>
    </>
  );
}
