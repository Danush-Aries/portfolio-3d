# portfolio-3d

A dark, terminal-grade 3D portfolio for Dhanush Shankar — agent engineer.
Built with Next.js 15/16 App Router, React Three Fiber, and Framer Motion.

Live tagline: **I build the AI. I break the AI. I ship with the AI.**

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS v4
- React Three Fiber + Drei (hero neural-mesh + orbit shard gallery)
- Framer Motion (panel transitions)
- next/font: Space Grotesk (display) + Inter (body) + JetBrains Mono (mono)

## Sections

1. **Hero** — full-viewport R3F canvas: streaming terminal + particle mesh
2. **Work** — six shipped projects orbiting as 3D shards, synced to scrolling panels
3. **About** — ASCII avatar + bio + skill matrix (AI, Security, Web)
4. **Now** — monthly ship log with status glyphs
5. **Contact** — terminal-styled contact block with copy-to-clipboard

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm run start
```

## Deploy on Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Danush-Aries/portfolio-3d)

The project runs on the default Next.js Vercel preset. No env vars required.

## Structure

```
src/
├── app/                  # layout, page, globals.css
├── components/
│   ├── scene/           # R3F: HeroCanvas, ParticleMesh, HoloTerminal, WorkScene, ProjectShard, CameraRig
│   ├── sections/        # Hero, Work, ProjectPanel, About, Now, Contact, Footer
│   └── ui/              # CursorTrail, TerminalText, NavRail, SectionLabel
└── lib/                 # projects, skills, hooks
```

Crafted with three.js + claude.
