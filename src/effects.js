// Imperative effects ported from the original page. Each init* returns a cleanup function.
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const reduce = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine = () => matchMedia('(hover: hover) and (pointer: fine)').matches;

function listeners() {
  const off = [];
  const on = (target, type, fn, opts) => {
    target.addEventListener(type, fn, opts);
    off.push(() => target.removeEventListener(type, fn, opts));
  };
  return { on, clear: () => off.forEach(f => f()) };
}

/* starfield canvas, UFO, custom cursor, pointer parallax */
export function initSpace() {
  const root = document.documentElement;
  const isReduce = reduce(), isFine = fine();
  const { on, clear } = listeners();

  const ptr = { x: innerWidth * 0.6, y: innerHeight * 0.35, active: false };
  let npx = 0, npy = 0;
  on(window, 'pointermove', e => { ptr.x = e.clientX; ptr.y = e.clientY; ptr.active = true; }, { passive: true });
  on(document, 'pointerleave', () => { ptr.active = false; });
  let sy = scrollY, lastSy = sy, vel = 0;
  on(window, 'scroll', () => { sy = scrollY; }, { passive: true });

  const cv = document.getElementById('sky');
  const ctx = cv.getContext('2d');
  let W = 0, H = 0, stars = [], nodes = [], meteors = [], nextMeteor = 1200;

  function resize() {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    W = innerWidth; H = innerHeight;
    cv.width = W * dpr; cv.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = Math.min(280, Math.round(W * H / 6500));
    stars = Array.from({ length: n }, () => ({ x: Math.random() * W, y: Math.random() * H, z: Math.random() * 0.9 + 0.1, t: Math.random() * 6.28, h: Math.random() }));
    const m = isFine ? Math.min(70, Math.round(W * H / 20000)) : Math.min(28, Math.round(W * H / 26000));
    nodes = Array.from({ length: m }, () => ({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3 }));
    if (isReduce) drawStatic();
  }
  const starColor = (h, a) => h < 0.7 ? `rgba(226,240,255,${a})` : h < 0.86 ? `rgba(103,232,249,${a})` : `rgba(196,181,253,${a})`;

  function drawStatic() {
    ctx.clearRect(0, 0, W, H);
    for (const s of stars) { ctx.fillStyle = starColor(s.h, 0.3 + 0.6 * s.z); ctx.beginPath(); ctx.arc(s.x, s.y, s.z * 1.4 + 0.2, 0, 6.283); ctx.fill(); }
  }

  function drawSky(t) {
    ctx.clearRect(0, 0, W, H);
    const stretchBase = clamp(vel, -70, 70);
    for (const s of stars) {
      let x = (s.x - npx * 30 * s.z) % W; if (x < 0) x += W;
      let y = (s.y - sy * 0.09 * s.z - npy * 20 * s.z) % H; if (y < 0) y += H;
      s.t += 0.025 * s.z;
      const a = (0.3 + 0.7 * s.z) * (0.62 + 0.38 * Math.sin(s.t));
      const r = s.z * 1.5 + 0.2;
      const st = stretchBase * s.z * 1.5;
      if (Math.abs(st) > 1.5) {
        ctx.strokeStyle = starColor(s.h, a); ctx.lineWidth = r;
        ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + st); ctx.stroke();
      } else {
        ctx.fillStyle = starColor(s.h, a);
        ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.fill();
      }
    }

    ctx.lineWidth = 1;
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      a.x += a.vx; a.y += a.vy;
      if (a.x < 0 || a.x > W) a.vx *= -1;
      if (a.y < 0 || a.y > H) a.vy *= -1;
      if (ptr.active && isFine) {
        const dx = a.x - ptr.x, dy = a.y - ptr.y, d = Math.hypot(dx, dy);
        if (d < 200 && d > 0.1) {
          const k = 1 - d / 200;
          ctx.strokeStyle = `rgba(167,139,250,${k * 0.6})`;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(ptr.x, ptr.y); ctx.stroke();
          a.x += (dx / d) * k * 1.2; a.y += (dy / d) * k * 1.2;
        }
      }
      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j], dx = a.x - b.x, dy = a.y - b.y, d2 = dx * dx + dy * dy;
        if (d2 < 12100) {
          ctx.strokeStyle = `rgba(103,232,249,${(1 - Math.sqrt(d2) / 110) * 0.14})`;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
      }
      ctx.fillStyle = 'rgba(165,243,252,.7)';
      ctx.fillRect(a.x - 1, a.y - 1, 2, 2);
    }

    if (t > nextMeteor) {
      nextMeteor = t + 1600 + Math.random() * 2800;
      meteors.push({ x: W * (0.3 + Math.random() * 0.8), y: Math.random() * H * 0.45, vx: -(7 + Math.random() * 6), vy: 3 + Math.random() * 3, life: 1 });
    }
    for (let i = meteors.length - 1; i >= 0; i--) {
      const m = meteors[i];
      m.x += m.vx; m.y += m.vy; m.life -= 0.011;
      const tx = m.x - m.vx * 16, ty = m.y - m.vy * 16;
      const g = ctx.createLinearGradient(m.x, m.y, tx, ty);
      g.addColorStop(0, `rgba(236,254,255,${Math.max(0, m.life)})`);
      g.addColorStop(0.3, `rgba(103,232,249,${Math.max(0, m.life) * 0.6})`);
      g.addColorStop(1, 'rgba(124,58,237,0)');
      ctx.strokeStyle = g; ctx.lineWidth = 1.8;
      ctx.beginPath(); ctx.moveTo(m.x, m.y); ctx.lineTo(tx, ty); ctx.stroke();
      if (m.life <= 0 || m.x < -300 || m.y > H + 300) meteors.splice(i, 1);
    }
  }

  const hero = document.querySelector('.hero');
  const ufo = document.getElementById('ufo');
  const u = { x: innerWidth * 0.62, y: 120, tilt: 0 };
  function moveUfo(t) {
    const r = hero.getBoundingClientRect();
    if (r.bottom < 0) return;
    let tx, ty, beam;
    const inHero = isFine && ptr.active && ptr.y > r.top && ptr.y < r.bottom;
    if (inHero) {
      tx = ptr.x - r.left;
      ty = clamp(ptr.y - r.top - 190, 70, r.height * 0.42);
    } else {
      tx = r.width * (0.6 + 0.28 * Math.sin(t / 4300));
      ty = 100 + 38 * Math.sin(t / 2100);
    }
    tx = clamp(tx, 70, r.width - 70);
    const dx = (tx - u.x) * 0.035;
    u.x += dx; u.y += (ty - u.y) * 0.03;
    u.tilt += (dx * 1.6 - u.tilt) * 0.1;
    const bob = Math.sin(t / 620) * 6;
    ufo.style.transform = `translate3d(${(u.x - 60).toFixed(1)}px, ${(u.y + bob).toFixed(1)}px, 0) rotate(${clamp(u.tilt, -20, 20).toFixed(2)}deg)`;
    if (inHero) {
      const under = ptr.y - r.top > u.y + 40;
      beam = under ? clamp(1 - Math.abs(ptr.x - r.left - u.x) / 110, 0, 1) : 0;
    } else {
      beam = 0.25 + 0.2 * Math.sin(t / 900);
    }
    ufo.style.setProperty('--beam', beam.toFixed(2));
  }

  const ring = document.getElementById('cursor'), dot = document.getElementById('cursorDot');
  let cx = ptr.x, cy = ptr.y;
  if (isFine && !isReduce) {
    on(window, 'pointermove', () => root.classList.add('has-cursor'), { once: true });
    on(document, 'pointerover', e => {
      ring.classList.toggle('hot', !!e.target.closest('a, button, input, textarea, .chip'));
    });
  }

  let raf = 0;
  function frame(t) {
    const tx = ptr.x / W * 2 - 1, ty = ptr.y / H * 2 - 1;
    npx += (tx - npx) * 0.06; npy += (ty - npy) * 0.06;
    root.style.setProperty('--px', npx.toFixed(3));
    root.style.setProperty('--py', npy.toFixed(3));
    vel += ((sy - lastSy) - vel) * 0.18; lastSy = sy;
    drawSky(t);
    moveUfo(t);
    if (isFine) {
      cx += (ptr.x - cx) * 0.2; cy += (ptr.y - cy) * 0.2;
      ring.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      dot.style.transform = `translate3d(${ptr.x}px, ${ptr.y}px, 0)`;
    }
    raf = requestAnimationFrame(frame);
  }
  resize();
  on(window, 'resize', resize);
  if (!isReduce) raf = requestAnimationFrame(frame);

  return () => {
    cancelAnimationFrame(raf);
    clear();
    root.classList.remove('has-cursor');
  };
}

/* tilt + spotlight cards, magnetic buttons, reveal-on-scroll */
export function initInteractions() {
  const isReduce = reduce(), isFine = fine();
  const { on, clear } = listeners();

  if (isFine) {
    document.querySelectorAll('.tilt').forEach(el => {
      on(el, 'pointermove', e => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        el.style.setProperty('--mx', (x * 100).toFixed(1) + '%');
        el.style.setProperty('--my', (y * 100).toFixed(1) + '%');
        if (!isReduce) {
          const k = Math.min(1, 420 / r.width);
          el.style.setProperty('--rx', ((0.5 - y) * 9 * k).toFixed(2) + 'deg');
          el.style.setProperty('--ry', ((x - 0.5) * 11 * k).toFixed(2) + 'deg');
        }
      });
      on(el, 'pointerleave', () => {
        el.style.setProperty('--rx', '0deg');
        el.style.setProperty('--ry', '0deg');
      });
    });
  }

  if (isFine && !isReduce) {
    document.querySelectorAll('.magnet').forEach(el => {
      on(el, 'pointermove', e => {
        const r = el.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
        el.style.transform = `translate(${dx * 0.22}px, ${dy * 0.32}px)`;
      });
      on(el, 'pointerleave', () => { el.style.transform = ''; });
    });
  }

  let io;
  if ('IntersectionObserver' in window && !isReduce) {
    io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.remove('pre'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    document.querySelectorAll('.rv').forEach(el => {
      if (el.getBoundingClientRect().top > innerHeight) { el.classList.add('pre'); io.observe(el); }
    });
  }

  return () => {
    clear();
    if (io) io.disconnect();
    document.querySelectorAll('.rv.pre').forEach(el => el.classList.remove('pre'));
  };
}

/* top progress bar + timeline fill */
export function initScroll() {
  const root = document.documentElement;
  const tl = document.getElementById('timeline');
  const { on, clear } = listeners();
  function onScroll() {
    const max = root.scrollHeight - innerHeight;
    root.style.setProperty('--p', max > 0 ? (scrollY / max).toFixed(4) : '0');
    const r = tl.getBoundingClientRect();
    tl.style.setProperty('--tp', clamp((innerHeight * 0.65 - r.top) / r.height, 0, 1).toFixed(3));
  }
  on(window, 'scroll', onScroll, { passive: true });
  on(window, 'resize', onScroll);
  onScroll();
  return clear;
}
