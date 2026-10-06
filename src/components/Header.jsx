import { useEffect, useState } from 'react';
import { navLinks, GITHUB } from '../data.js';
import { GithubIcon } from './Icons.jsx';

const fmt = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Kuala_Lumpur', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });

function Clock() {
  const [now, setNow] = useState(() => fmt.format(new Date()));
  useEffect(() => {
    const id = setInterval(() => setNow(fmt.format(new Date())), 1000);
    return () => clearInterval(id);
  }, []);
  return <span className="clock" aria-label="Local time in Kuala Lumpur">KL <b>{now}</b> MYT</span>;
}

function useActiveSection() {
  const [cur, setCur] = useState('');
  useEffect(() => {
    const secs = [...document.querySelectorAll('main section[id]')];
    const update = () => {
      let c = '';
      for (const s of secs) if (s.getBoundingClientRect().top < innerHeight * 0.4) c = s.id;
      setCur(c);
    };
    update();
    addEventListener('scroll', update, { passive: true });
    addEventListener('resize', update);
    return () => { removeEventListener('scroll', update); removeEventListener('resize', update); };
  }, []);
  return cur;
}

export default function Header() {
  const cur = useActiveSection();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') setOpen(false); };
    addEventListener('keydown', onKey);
    return () => removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <header className="hud">
        <a className="brand" href="#top" aria-label="Abdul Azim Khan, back to top">

        </a>
        <nav className="nav" aria-label="Sections">
          <img src="/assets/logo.jpeg" alt="AAKSTACK" className="nav-logo" />
          {navLinks.map(([id, label]) => (
            <a key={id} href={`#${id}`} className={cur === id ? 'on' : undefined}>
              {label}
            </a>
          ))}
        </nav>
        <div className="hud-right">
          <Clock />
          <a className="btn btn-ghost magnet" href={GITHUB} target="_blank" rel="noopener noreferrer" style={{ padding: '11px 14px' }} aria-label="GitHub profile">
            <GithubIcon />
          </a>
          <button
            className="menu-btn" id="menuBtn" aria-expanded={open} aria-controls="mnav"
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
