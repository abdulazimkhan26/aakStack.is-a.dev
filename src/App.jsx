import { useEffect } from 'react';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import { About, Skills, Projects, Experience } from './components/Sections.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import { initInteractions, initScroll, initSpace } from './effects.js';

export default function App() {
  useEffect(() => {
    const stops = [initSpace(), initInteractions(), initScroll()];
    return () => stops.forEach(stop => stop());
  }, []);

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <canvas id="sky" aria-hidden="true" />
      <div className="cursor" id="cursor" aria-hidden="true" />
      <div className="cursor-dot" id="cursorDot" aria-hidden="true" />
      <Header />
      <main id="main" tabIndex={-1}>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
