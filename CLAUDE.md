# CLAUDE.md

## Project Purpose

Build and maintain a professional portfolio website for **Veerakran Sereerungruangkul (Vee)**.

The website should present professional experience, selected projects, technical skills, and contact information accurately and professionally.

The portfolio should demonstrate engineering ability through its content and implementation rather than visual effects.

---

# Documentation

Everything inside `/docs` is the source of truth.

Never invent facts.

Always read the relevant documentation before generating content.

Documentation structure:

```
docs/
│
├── profile.md
├── professional-identity.md
├── personality.md
├── career.md
├── skills.md
├── resume.md
├── writing-style.md
└── projects/
```

---

# Documentation Priority

When information overlaps, use this priority.

Highest priority

1. CLAUDE.md

Professional identity

2. profile.md

Professional narrative

3. professional-identity.md

Writing behaviour

4. personality.md

Employment history

5. career.md

Individual project facts

6. docs/projects/*

Technology inventory

7. skills.md

Approved resume wording

8. resume.md

Writing preferences

9. writing-style.md

Project documentation always overrides general documentation.

If two documents appear inconsistent, ask instead of guessing.

---

# Working Principles

Always optimise for

- Truthfulness
- Technical accuracy
- Maintainability
- Simplicity
- Accessibility
- Long-term readability

Never optimise for

- Looking impressive
- Following UI trends
- Marketing language
- Artificial complexity

Authenticity is more important than perfection.

---

# Writing Rules

Before writing any content:

- Read the relevant documentation.
- Reuse existing approved wording when appropriate.
- Keep wording concise.
- Prefer engineering language over marketing language.
- Sound like an experienced software engineer.
- Never invent responsibilities.
- Never invent metrics.
- Never invent technologies.
- Never exaggerate ownership.

If information is missing:

Ask.

Do not assume.

---

# Professional Representation

Do not assume Veerakran

- selected a technology
- designed the overall architecture
- led a project
- managed a team
- owned a product

unless documentation explicitly says so.

Most technology choices were made by project requirements or technical leadership.

Veerakran's recurring responsibility was researching unfamiliar technologies, integrating them into existing systems, and delivering production software.

Preserve this distinction.

---

# Project Confidentiality

Many projects were developed for employers or clients.

Never expose

- source code
- architecture diagrams
- credentials
- client data
- confidential implementation details
- internal documentation

When describing employer projects:

Discuss

- responsibilities
- engineering challenges
- technologies
- publicly known information

Do not disclose confidential information.

---

# Technical Stack

Preferred stack

- Astro
- TypeScript
- Static Site Generation
- Markdown / MDX
- Minimal JavaScript

Avoid unnecessary dependencies.

Use Astro capabilities before adding packages.

---

# Hosting

Primary target

Cloudflare Pages

Fallback

GitHub Pages

Requirements

- Fully static build
- No server runtime
- No database
- No authentication
- No SSR
- No Cloudflare Functions
- No Workers

The site should deploy without modification to either hosting provider.

---

# Design Philosophy

Content comes first.

The UI should support the content instead of competing with it.

Prefer

- whitespace
- typography
- hierarchy
- accessibility
- responsiveness

Avoid

- excessive animations
- parallax
- fake terminals
- skill bars
- 3D effects
- glassmorphism
- unnecessary gradients
- decorative motion

If a design decision exists only because it looks impressive, it is probably the wrong decision.

---

# Engineering Philosophy

Prefer

- simple architecture
- reusable components
- semantic HTML
- minimal JavaScript
- maintainable code

Avoid

- premature abstraction
- unnecessary state management
- unnecessary client-side rendering
- dependency bloat

Every dependency should have a clear reason.

---

# Content Generation

Before generating new content ask:

1. Which documentation file contains the facts?

2. Am I inventing anything?

3. Does this sound like Veerakran?

4. Can this wording be simpler?

5. Would an experienced software engineer naturally write this?

---

# Code Generation

Before writing code ask:

- Can Astro already do this?
- Can this be static?
- Can this be implemented with less JavaScript?
- Is another dependency actually necessary?
- Will this still be easy to maintain one year from now?

---

# Out of Scope

Unless explicitly requested, do not implement

- CMS
- Admin dashboard
- Authentication
- User accounts
- Blog engine
- Search
- Comments
- Analytics
- Contact form backend
- Database
- API server

Keep the first version intentionally simple.

---

# Definition of Done

A feature is complete when

- implementation is simple
- code is maintainable
- documentation is updated
- accessibility is preserved
- responsive behaviour is verified
- production build succeeds
- no confidential information is exposed

---

# Final Principle

When multiple acceptable solutions exist:

Choose the solution that is

- simpler
- easier to maintain
- more truthful
- more readable
- more future-proof

This project values authenticity over perfection.

This portfolio should feel like it was created by an experienced software engineer, not by AI.