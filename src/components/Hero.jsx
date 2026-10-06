import { useEffect, useState } from 'react';
import { phrases, stats, tickerItems } from '../data.js';
import { ArrowUpRight } from './Icons.jsx';

const prefersReduce = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

function Typewriter() {
  const [text, setText] = useState(phrases[0]);
  useEffect(() => {
    if (prefersReduce()) return;
    let p = 0, c = phrases[0].length, del = true, timer;
    const tick = () => {
      if (del) {
        c--; setText(phrases[p].slice(0, c));
        if (c === 0) { del = false; p = (p + 1) % phrases.length; }
        timer = setTimeout(tick, 38);
      } else {
        c++; setText(phrases[p].slice(0, c));
        if (c === phrases[p].length) { del = true; timer = setTimeout(tick, 2200); return; }
        timer = setTimeout(tick, 75);
      }
    };
    timer = setTimeout(tick, 2600);
    return () => clearTimeout(timer);
  }, []);
  return <span id="type">{text}</span>;
}

function CountUp({ end, suffix }) {
  const [v, setV] = useState(end);
  useEffect(() => {
    if (prefersReduce()) return;
    let raf;
    const t0 = performance.now(), dur = 1500;
    const step = now => {
      const k = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - k, 3);
      setV(Math.round(end * e));
      if (k < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [end]);
  return <>{v}{suffix}</>;
}

function Ufo() {
  return (
    <div className="ufo" id="ufo" aria-hidden="true">
      <div className="beam" />
      <svg viewBox="0 0 120 70">
        <defs>
          <linearGradient id="hull" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#d7defa" /><stop offset="1" stopColor="#3f4c94" /></linearGradient>
          <radialGradient id="dome" cx=".42" cy=".38" r=".7"><stop offset="0" stopColor="#ecfeff" stopOpacity=".95" /><stop offset=".55" stopColor="#22d3ee" stopOpacity=".6" /><stop offset="1" stopColor="#0e7490" stopOpacity=".35" /></radialGradient>
        </defs>
        <path d="M37 31 Q60 2 83 31 Z" fill="url(#dome)" />
        <ellipse cx="60" cy="35" rx="57" ry="11.5" fill="url(#hull)" />
        <ellipse cx="60" cy="31.5" rx="42" ry="4.5" fill="#eef2ff" opacity=".35" />
        <g className="ufo-lights">
          <circle cx="20" cy="37" r="2.6" fill="#67e8f9" />
          <circle cx="40" cy="41" r="2.6" fill="#ec4899" />
          <circle cx="60" cy="42.5" r="2.6" fill="#a78bfa" />
          <circle cx="80" cy="41" r="2.6" fill="#ec4899" />
          <circle cx="100" cy="37" r="2.6" fill="#67e8f9" />
        </g>
        <ellipse cx="60" cy="46" rx="15" ry="3.4" fill="#67e8f9" opacity=".75" />
      </svg>
    </div>
  );
}

export default function Hero() {
  return (
    <>
      <section className="hero" id="top">
        <div className="horizon" aria-hidden="true" />
        <Ufo />
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <p className="eyebrow depth" style={{ '--d': '6' }}><span className="pulse" aria-hidden="true" />Available for hire · Kuala Lumpur</p>
            <h1 className="name depth" style={{ '--d': '14' }}><span>Abdul Azim</span><span className="grad">Khan</span></h1>
            <p className="role depth" style={{ '--d': '9' }}>
              <span className="prompt" aria-hidden="true">{'>'}</span>
              <Typewriter />
              <span className="caret" aria-hidden="true" />
            </p>
            <p className="lede">I build <strong>AI chatbots, workflow automation and full-stack products</strong>. Recent work ranges from a WhatsApp loan-application bot running on n8n to YOLO models that find fruit bunches in palm estates.</p>
            <div className="cta">
              <a className="btn btn-primary magnet" href="#projects">View projects <ArrowUpRight /></a>
              <a className="btn btn-ghost magnet" href="#contact">Get in touch</a>
            </div>
            <dl className="stats">
              {stats.map(([label, end, suffix]) => (
                <div key={label}><dt>{label}</dt><dd><CountUp end={end} suffix={suffix} /></dd></div>
              ))}
            </dl>
          </div>

          <div className="orb-stage" aria-hidden="true">
            <div className="orb">
              <div className="ring ring-b" />
              <div className="ring ring-a" />
              <div className="planet"><span>AAK</span></div>
              <div className="ring ring-c" />
            </div>
            <div className="tag tag-1 depth" style={{ '--d': '-18' }}>Lat <b>3°09'30.61"N</b></div>
            <div className="tag tag-2 depth" style={{ '--d': '-26' }}>Lon <b>101°42'42.18"E E</b></div>
            <div className="tag tag-3 depth" style={{ '--d': '-12' }}>Status <b>Shipping</b></div>
          </div>
        </div>
      </section>

      <div className="ticker" aria-hidden="true">
        <div className="ticker-track">
          {[0, 1].flatMap(copy => tickerItems.map(t => <span key={`${copy}-${t}`}>{t}</span>))}
        </div>
      </div>
    </>
  );
}
