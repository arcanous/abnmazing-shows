# 🎬 ABN-Mazing TV Shows Dashboard

Welcome! 👋
This project showcases my approach to building clean, modular, and delightful user interfaces using modern frontend tools.

## 🚀 Live Demo

Check out the live version here:
🔗 [abnmazing-shows.vercel.app](https://abnmazing-shows.vercel.app/)

## 🛠️ Tech Stack
- Nuxt 3 for its intuitive file-based routing, auto-imports, and seamless integration with Vue. It offers a solid structure for building scalable applications. ￼
- Tailwind CSS for its utility-first approach and rapid UI development. It's widely adopted in the industry.

## 🧱 Architectural Decisions
- Modular components, keeping the codebase clean and maintainable.
- Minimal dependencies - no unnecessary packages to maintain simplicity and reduce bloat.
- Focused on delivering a subtle and delightful user experience with smooth interactions and animations.

## ✨ Features
- Displays TV shows categorized by genres in horizontal scrollable lists.
- Clicking on a show navigates to a detailed view with comprehensive information. ￼
- A search feature with subtle animations and a teleport mechanism to render results effectively.
- Application is mobile-friendly and adapts seamlessly to various screen sizes.
- As a small extra: A minimalist infinite scroll for browsing shows within a genre.


## 🛠️ Production-Readiness Considerations

While this project meets the core assignment requirements, a production-ready application would require additional features and refinements, including:
- Mobile swipe support for the hero carousel to enhance touch interaction.
- Improved infinite scroll logic that continues pagination if the initial page dataset is insufficient to fill the page.
- Robust API response validation, potentially using a schema validation library like [Zod](https://zod.dev/).
- Enhanced a11y features (ARIA roles, sr-only text for non-visual cues, better kyboard navigation support and visible focus indicators etc.)
- Internationalization (i18n) support for broader audience reach.
- etc.

## 📦 Getting Started

Prerequisites
- Node.js: Version 20 or 22 (LTS recommended).
- pnpm: Preferred package manager for this project. ￼

## Installation
1. Clone the repository:
```

git clone https://github.com/arcanous/abnmazing-shows
cd abnmazing-shows
```

2. Install dependencies:
`pnpm install`

3. Run the development server:
`pnpm dev`


4. Run tests:
`pnpm test`


5. Lint the code:
`pnpm lint`

