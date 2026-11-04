import { useEffect, useState } from 'react';
import { phrases, stats, tickerItems } from '../data.js';
import { ArrowUpRight } from './Icons.jsx';

const prefersReduce = () => typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;

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
  const [v, setV] = useState(() => (prefersReduce() ? end : 0));
  useEffect(() => {
    if (prefersReduce()) { setV(end); return; }
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
  return <>{v}<span className="suf">{suffix}</span></>;
}

export default function Hero() {
  return (
    <>
      <section className="hero" id="top">
        <div className="wrap">
          <div className="hero-meta">
            <span><i className="live" aria-hidden="true" />Employed full-time</span>
            <span>Kuala Lumpur, GMT+8</span>
            <span>AI Software Engineer</span>
          </div>
          <h1 className="name" aria-label="Abdul Azim Khan">
            <span className="line"><span>Abdul</span></span>
            <span className="line"><span>Azim Khan</span></span>
          </h1>
          <div className="hero-foot">
            <p className="lede">I build <strong>AI chatbots, workflow automation and full-stack products</strong>. Recent work ranges from a WhatsApp loan-application bot running on n8n to YOLO models that find fruit bunches in palm estates.</p>
            <div className="hero-side">
              <p className="role"><Typewriter /></p>
              <div className="cta">
                <a className="btn btn-primary" href="#projects">View projects <ArrowUpRight /></a>
                <a className="btn btn-ghost" href="#contact">Get in touch</a>
              </div>
            </div>
          </div>
          <dl className="stats">
            {stats.map(([label, end, suffix]) => (
              <div key={label}><dt>{label}</dt><dd><CountUp end={end} suffix={suffix} /></dd></div>
            ))}
          </dl>
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
