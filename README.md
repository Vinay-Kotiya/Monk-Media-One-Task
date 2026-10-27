# Monk Media One Tech — Homepage Redesign

A premium, responsive homepage redesign for **Monk Media One Tech**, an AI and software innovation business focused on private AI infrastructure, autonomous agents, custom AI solutions, and business automation.

This project was created as a website redesign assessment. The goal is to retain the existing brand identity while improving the website's storytelling, visual hierarchy, usability, and presentation.

## Project goals

- Preserve the Monk Media One brand identity, including the original yellow, blue, and coral-red logo accents.
- Present the company's AI and software capabilities through clearer, business-focused messaging.
- Establish a consistent visual system across the homepage.
- Deliver a responsive experience for desktop, tablet, and mobile.
- Use subtle interactions and animations without making the interface distracting.
- Keep the implementation maintainable and suitable for deployment.

## Design direction

The design uses a dark, editorial technology aesthetic inspired by premium AI and software websites.

- **Backgrounds:** near-black and charcoal surfaces.
- **Typography:** Manrope for prominent headings, with Inter for general interface and body text; JetBrains Mono or a monospace fallback for technical labels.
- **Brand accents:** yellow `#FFC44D`, blue `#5276FF`, and coral red `#FF5D65`.
- **Layout:** a consistent centered `.shell` container, generous section spacing, subtle borders, and responsive grids.
- **Motion:** restrained hover effects and scroll-triggered reveals, with reduced-motion preferences respected where implemented.
- **Hero concept:** a custom “Sovereign AI Core” 3D centerpiece, intended to communicate private AI and connected intelligence.

## Homepage sections

The homepage is organized as a continuous story, moving from the company's promise to the challenges it addresses, its approach, capabilities, proof, and contact action.

1. **Header and navigation** — brand mark, desktop navigation, discovery-call CTA, and responsive mobile menu.
2. **Hero** — the core message, supporting copy, primary and secondary actions, audience categories, and the 3D centerpiece.
3. **Problem** — three business challenges: fragmented intelligence, unclear data boundaries, and repetitive manual work.
4. **Approach** — Discover, Architect, and Build & Integrate.
5. **Services** — private LLM deployments, autonomous AI agents, custom AI and RAG, AI-enabled CRM/ERP, AI calling agents, compliance automation, and proprietary AI products.
6. **Differentiators** — the company's principles around data sovereignty, production-oriented engineering, outcome-led strategy, flexible architecture, integrated systems, and continuous improvement.
7. **Selected work / case studies** — project cards using the existing portfolio content and conceptual CSS illustrations where genuine project visuals are unavailable.
8. **Testimonials** — client feedback presented in a consistent card layout, with staggered scroll-reveal animation where implemented.
9. **Technology ecosystem** — technologies grouped by models, orchestration, voice, data, and engineering infrastructure.
10. **FAQ** — an accessible expandable question-and-answer list.
11. **Final CTA** — a clear invitation to discuss a business problem or book a discovery call.
12. **Footer** — brand statement, service links, company navigation, official social links, and contact details.

> Content-integrity note: company details, service offerings, portfolio claims, testimonials, and metrics should be checked against the official website before publication. Do not present conceptual illustrations as real product screenshots or add unsupported customer claims, performance figures, certifications, or security guarantees.

## Tech stack

The project is based on the following frontend tools and conventions:

- **React** for UI components.
- **TypeScript** for typed component logic.
- **Vite** for local development and production builds.
- **CSS** for responsive layouts, design tokens, custom illustrations, transitions, and animation.
- **React hooks** such as `useState`, `useEffect`, and `useRef` for interactive behavior.
- **Three.js / React Three Fiber** may be used for the interactive 3D hero if included in the installed project dependencies.

The technologies actually installed in the repository are defined by `package.json`. This README does not imply that optional 3D dependencies are installed unless they appear there.

## Getting started

### Requirements

- Node.js compatible with the project's installed Vite version.
- npm (or the package manager indicated by the repository lockfile).

### Install dependencies

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

Open the local URL printed by Vite in the terminal.

### Create a production build

```bash
npm run build
```

### Preview the production build locally

```bash
npm run preview
```

If a command differs in this repository, check the `scripts` section of `package.json` and use the project's configured script.

## Favicon and page metadata

The HTML entry point is `index.html`. It contains the page title, description, Open Graph metadata, canonical URL, theme color, and the React mount element.

To show the brand symbol in browser tabs, place favicon assets inside the Vite `public/` directory and reference them from `index.html`, for example:

```html
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
<link rel="shortcut icon" href="/favicon.ico" />
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
```

Use the original logo symbol whenever possible. A simplified square favicon should be used instead of shrinking the full wordmark into a tiny icon.

## Responsive design and accessibility

When validating the homepage, check at least these viewport widths:

- 320–390px: small mobile screens
- 768px: tablet
- 1024px: laptop/tablet landscape
- 1440px: desktop
- 1728px: wide desktop

Validation checklist:

- No horizontal overflow or clipped headings.
- Navigation and section anchors point to valid destinations.
- Mobile navigation opens and closes correctly and can be closed with Escape.
- Interactive controls have visible keyboard focus.
- FAQ controls expose their expanded state correctly.
- Animations respect `prefers-reduced-motion`.
- The hero remains usable if WebGL or the 3D component fails to initialize.
- Contact links use verified URLs and do not display fake submission confirmations.
- The production build completes without errors.

## Deployment

The project can be deployed to Vercel or another host that supports the configured Vite build.

For a typical Vite deployment, the build command is:

```bash
npm run build
```

The output directory is normally `dist/`. Confirm the configured output and deployment settings in the repository before publishing. After deployment, test the public URL in a private/incognito browser window and verify that assets, navigation, favicon, and responsive layouts load correctly.

## Official links

- **Monk Media One Tech:** https://monkmediaone.tech/
- **Creatives Division:** https://monkmediaone.com/
- **LinkedIn:** https://in.linkedin.com/company/monk-media-one
- **Instagram:** https://www.instagram.com/monkmediaone/
- **Contact:** https://monkmediaone.tech/contact/

## Project status

This README documents the intended design and implementation conventions for the homepage redesign. Before submitting the assessment, confirm which sections and interactions are implemented in the current repository, run the production build, test the deployed page, and remove or correct any content that is still a placeholder.
