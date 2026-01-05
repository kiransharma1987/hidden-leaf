# Hidden Leaf 🌿

A modern, elegant website for **Hidden Leaf** — a premium venue for weddings, corporate events, celebrations, and gatherings. Built with Angular 19 featuring smooth animations, responsive design, and an interactive gallery.

![Angular](https://img.shields.io/badge/Angular-19.2-dd0031?style=flat&logo=angular)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178c6?style=flat&logo=typescript)
![SCSS](https://img.shields.io/badge/SCSS-Styling-cc6699?style=flat&logo=sass)

## ✨ Features

- **Responsive Design** — Seamless experience across all devices
- **Smooth Animations** — Custom reveal and parallax directives for elegant transitions
- **Interactive Gallery** — Filterable image gallery with lightbox support
- **Venue Sections** — Dedicated sections showcasing different event spaces:
  - **Hasiru** — The Lawns (open-air weddings & gatherings)
  - **Usiru** — Indoor venue space
  - **Kudli** — Intimate event area
  - **Tunga Bhadra** — Waterside venue
- **Enquiry Form** — Built-in contact form for event bookings
- **WhatsApp Integration** — Quick contact button for instant communication
- **Auto Gallery Scanner** — Drop images into folders and auto-generate gallery config

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [Angular CLI](https://angular.io/cli) v19.2+

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd hidden-leaf-frontend

# Install dependencies
npm install
```

### Development Server

```bash
npm start
# or
ng serve
```

Navigate to `http://localhost:4200/`. The app will automatically reload on file changes.

### Build for Production

```bash
npm run build
```

Build artifacts are stored in the `dist/hidden-leaf-frontend` directory.

## 📁 Project Structure

```
src/
├── app/
│   ├── core/                    # Core layout components
│   │   ├── header/              # Site header/navigation
│   │   ├── footer/              # Site footer
│   │   └── layout/              # Main layout wrapper
│   │
│   ├── pages/
│   │   └── home/                # Home page component
│   │
│   ├── sections/                # Page sections
│   │   ├── hasiru/              # The Lawns venue section
│   │   ├── usiru/               # Usiru venue section
│   │   ├── kudli/               # Kudli venue section
│   │   └── tunga-bhadra/        # Tunga Bhadra venue section
│   │
│   └── shared/
│       ├── components/          # Reusable components
│       │   ├── enquiry-form/    # Contact/booking form
│       │   ├── gallery/         # Image gallery with filtering
│       │   └── whatsapp-button/ # WhatsApp contact button
│       │
│       └── directives/          # Custom directives
│           ├── reveal.directive.ts      # Scroll reveal animations
│           ├── parallax.directive.ts    # Parallax scrolling effects
│           ├── magnetic.directive.ts    # Magnetic hover effects
│           └── image-parallax.directive.ts
│
├── assets/
│   ├── data/
│   │   └── gallery.json         # Auto-generated gallery config
│   └── images/
│       └── gallery/             # Gallery images by category
│           ├── venue/
│           ├── weddings/
│           ├── celebrations/
│           └── corporate/
│
└── styles/
    └── _tokens.scss             # Design tokens & variables
```

## 🖼️ Gallery Management

The gallery uses an automated scanner to generate configuration from image files.

### Adding Images

1. Drop images into the appropriate category folder:
   ```
   src/assets/images/gallery/
   ├── venue/
   ├── weddings/
   ├── celebrations/
   └── corporate/
   ```

2. Run the gallery scanner:
   ```bash
   npm run gallery
   ```

3. The scanner will auto-generate `src/assets/data/gallery.json`

**Tip:** Use descriptive filenames like `outdoor-lawn-setup.jpg` — they're automatically converted to captions: "Outdoor Lawn Setup"

## 🧪 Testing

```bash
# Run unit tests
npm test

# Run tests with coverage
ng test --code-coverage
```

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start development server |
| `npm run build` | Build for production (includes gallery scan) |
| `npm run watch` | Build in watch mode |
| `npm test` | Run unit tests |
| `npm run gallery` | Scan and generate gallery config |

## 🎨 Styling

The project uses SCSS with:
- **Design Tokens** — Centralized variables in `_tokens.scss`
- **Component Styles** — Scoped styles per component
- **Google Fonts** — Inter (body) & Playfair Display (headings)

## 🛠️ Technologies

- **Framework:** Angular 19 (Standalone Components)
- **Styling:** SCSS
- **Animations:** Custom directives with Intersection Observer
- **Build Tool:** Angular CLI with esbuild
- **Image Processing:** Sharp (for optimization scripts)

## 📄 License

Private project. All rights reserved.

---

<p align="center">
  <strong>Hidden Leaf</strong> — Step Into Serenity 🌿
</p>
