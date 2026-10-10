# Marco Martinez Portfolio

A Vite + React single-page portfolio based on the approved dark portfolio mockup.

## Run locally

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

## Structure

- `/` — portfolio homepage
- `/projects/yavria` — Yavria case study
- `/projects/nextproblem` — NextProblem case study

The homepage uses a flex-first layout and rem-relative sizing. The two selected-project cards are equal-height at desktop widths and stack naturally on smaller screens.

## Resume and experience content

The professional experience bullets are aligned with `Marco_M_Resume (7).pdf` (October 2026). The current resume is included at `public/assets/Marco_Martinez_Resume.pdf` and linked from the homepage. To keep future changes consistent, update the `experience` data in `src/App.jsx` and replace that PDF together. Project case studies contain additional implementation context beyond the shorter resume bullets.
