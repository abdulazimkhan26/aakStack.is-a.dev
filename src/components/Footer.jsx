import { GITHUB, LINKEDIN } from '../data.js';

export default function Footer() {
  return (
    <footer className="foot">
      <div className="wrap">
        <p className="foot-name">Abdul Azim Khan</p>
        <div className="foot-row">
          <span>© {new Date().getFullYear()} · AI Software Engineer · Kuala Lumpur</span>
          <nav aria-label="Footer">
            <a href={GITHUB} target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href={LINKEDIN} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="#top">Back to top ↑</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
