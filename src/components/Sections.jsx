import { Fragment } from 'react';
import { alsoOnGithub, bars, crewFile, GITHUB, projects, stacks, timeline } from '../data.js';
import { ArrowUpRight } from './Icons.jsx';

const SecHead = ({ kicker, children, note }) => (
  <div className="sec-head rv">
    <div>
      <p className="kicker">{kicker}</p>
      <h2>{children}</h2>
    </div>
    {note && <p className="sec-note">{note}</p>}
  </div>
);

export function About() {
  return (
    <section className="section" id="about">
      <div className="wrap">
        <SecHead kicker="About">Where machine learning <em>meets product</em></SecHead>
        <div className="about-grid">
          <div className="about-copy rv" style={{ '--i': '1' }}>
            <p>I'm an AI software engineer at Rakyat Fintech. I build the chatbots that talk to customers on WhatsApp, the n8n pipelines that move their data, and the web apps bankers use to act on it.</p>
            <p>Before that I worked at <mark>HSS Propick Technologies</mark> on an HRMS and a <mark>YOLOv8L fresh-fruit-bunch detector</mark> for palm estates. At <mark>Probyte Solutions</mark> I built HRMS, visitor management and payroll systems in C#/ASP.NET, PostgreSQL and Python.</p>
            <p>My final-year project detected potholes with YOLO and Detectron2 at <mark>87% accuracy</mark>. I've shipped in Java, C#, Python, TypeScript, Rust and Dart, and I pick whichever one fits the problem.</p>
          </div>
          <aside className="panel corners log tilt rv" style={{ '--i': '2' }} aria-label="Quick facts">
            <div className="log-head"><span>Crew file</span><span>AAK-01</span></div>
            <dl>
              {crewFile.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
              <div><dt>Status</dt><dd className="ok">Open to opportunities</dd></div>
            </dl>
          </aside>
        </div>
      </div>
    </section>
  );
}

export function Skills() {
  return (
    <section className="section" id="skills">
      <div className="wrap">
        <SecHead kicker="Skills" note="Comfortable across the whole path: database schema, API, automation layer and the interface on top.">
          The <em>tech stack</em>
        </SecHead>
        <div className="skills-grid">
          <div className="panel skill-panel tilt rv" style={{ '--i': '1' }}>
            <h3>Core languages</h3>
            <div className="bars">
              {bars.map(([name, pct]) => (
                <div key={name}>
                  <div className="bar-top"><span>{name}</span><span className="mono">{pct}%</span></div>
                  <div className="track"><i style={{ '--w': `${pct}%` }} /></div>
                </div>
              ))}
            </div>
          </div>
          <div className="panel stack tilt rv" style={{ '--i': '2' }}>
            {stacks.map(([title, chips]) => (
              <div key={title}>
                <h3>{title}</h3>
                <ul className="chips">{chips.map(c => <li className="chip" key={c}>{c}</li>)}</ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Project({ p }) {
  return (
    <article className={`panel proj${p.feature ? ' proj-feature' : ''} tilt rv`} style={{ '--i': String(p.i) }}>
      <div className="proj-top">
        {p.status ? <span className="status">{p.status}</span> : <span className="proj-meta">{p.meta}</span>}
        {p.href && (
          <a className="proj-link" href={p.href} target="_blank" rel="noopener noreferrer" aria-label={p.label}><ArrowUpRight /></a>
        )}
      </div>
      <h3>{p.title}</h3>
      <p>{p.desc}</p>
      {p.flow && (
        <div className="flow" aria-label="Message flow: WhatsApp to n8n to Express API to PostgreSQL to Next.js portal">
          {p.flow.map(([name, sub], idx) => (
            <Fragment key={name}>
              {idx > 0 && <span className="flow-link" />}
              <span className="flow-node">{name}<small>{sub}</small></span>
            </Fragment>
          ))}
        </div>
      )}
      {p.flow1 && (
        <div className="flow" aria-label="">
          {p.flow1.map(([name, sub], idx) => (
            <Fragment key={name}>
              {idx > 0 && <span className="flow-link" />}
              <span className="flow-node">{name}<small>{sub}</small></span>
            </Fragment>
          ))}
        </div>
      )}
      <ul className="chips">{p.chips.map(c => <li className="chip" key={c}>{c}</li>)}</ul>
    </article>
  );
}

export function Projects() {
  return (
    <section className="section" id="projects">
      <div className="wrap">
        <SecHead kicker="Projects" note="From production fintech tooling to research models. Source for most of these is on GitHub.">
          Things I've <em>built</em>
        </SecHead>
        <div className="proj-grid">
          {projects.map(p => <Project key={p.title} p={p} />)}
        </div>
        <div className="panel more rv">
          <span className="more-label">Also on GitHub</span>
          {alsoOnGithub.map(([name, href]) => (
            <a key={name} href={href} target="_blank" rel="noopener noreferrer">{name} <ArrowUpRight /></a>
          ))}
          <a className="btn btn-ghost magnet" href={GITHUB} target="_blank" rel="noopener noreferrer">All repositories</a>
        </div>
      </div>
    </section>
  );
}

export function Experience() {
  return (
    <section className="section" id="experience">
      <div className="wrap">
        <SecHead kicker="Experience" note="Work and education, most recent first.">Flight <em>log</em></SecHead>
        <ol className="timeline" id="timeline">
          {timeline.map(t => (
            <li className="tl-item rv" key={`${t.title}-${t.when}`}>
              <div className="tl-when">{t.now ? <span className="now">{t.when}</span> : t.when}</div>
              <div className="tl-node" aria-hidden="true" />
              <article className="panel tl-card tilt">
                <span className="tl-type">{t.type}</span>
                <h3>{t.title}</h3>
                <p className="org">{t.org}</p>
                <ul>{t.points.map(pt => <li key={pt}>{pt}</li>)}</ul>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
