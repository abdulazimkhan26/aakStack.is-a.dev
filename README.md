# AAKSTACK portfolio

React + Vite version of the AAKSTACK portfolio. Design, animations and content are unchanged from the original `index.html`.

## Run locally
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```

## Deploy to GitHub Pages
1. Create a new repo on GitHub (e.g. `aakstack-portfolio`) and push this folder to the `main` branch.
2. In the repo go to **Settings → Pages → Build and deployment → Source** and choose **GitHub Actions**.
3. Push to `main` (or run the workflow from the **Actions** tab). The site goes live at
   `https://<your-username>.github.io/<repo-name>/`.

Tip: name the repo `abdulazimkhan26.github.io` to serve it at `https://abdulazimkhan26.github.io/` instead.

## Where things live
- `src/data.js`: all text content (projects, skills, timeline, links, email)
- `src/components/`: Header, Hero, Sections (About/Skills/Projects/Experience), Contact, Footer
- `src/effects.js`: starfield, UFO, custom cursor, card tilt, magnetic buttons, scroll reveal
- `src/styles.css`: original stylesheet, copied as-is
