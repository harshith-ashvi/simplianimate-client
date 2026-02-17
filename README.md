# SimpliAnimate

> An open-source web app to create animations, visual effects, and creative media — right in your browser.

SimpliAnimate is a browser-based tool built with React + TypeScript + Vite that lets you generate text animations, image effects, and export them as videos or images. No software to install — just open, customize, and export.

## Table of Contents

- [Features](#features)
  - [Text-Based Animations](#text-based-animations)
  - [Image-Based Effects](#image-based-effects)
  - [Other Templates](#other-templates)
  - [Export](#export)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [Request Templates](#request-templates)
- [License](#license)

## Features

### Text-Based Animations

- **Text Flyers** — Animated flying text effects
- **Matrix Rain** — The classic Matrix digital rain effect with custom text
- **Text Reveal** — Smooth text reveal animations
- **Text Falling** — Gravity-based falling text animation

### Image-Based Effects

- **ASCII Art** — Convert images into ASCII character art
- **Pixel Art** — Apply pixel effect transformations to images
- **Displacement Map** — Distort images using displacement mapping

### Other Templates

- **Quiz (Kotyadhipati)** — Interactive quiz animation
- **Gradient Aurora** — Animated gradient aurora backgrounds

### Export

- **Video export** — Export animations as `.webm`
- **Image export** — Export stills as `.png`, `.jpg`, `.jpeg`, `.webp`, or `.bmp`
- **Multiple aspect ratios** — Portrait (1080x1920), Landscape (1920x1080), Square (1080x1080)
- **Custom file naming** — Name your exports before downloading

## Tech Stack

- **Frontend:** React 18, TypeScript, Vite
- **Styling:** Tailwind CSS, Radix UI, shadcn/ui components
- **Auth & Backend:** Supabase
- **Routing:** React Router v6
- **Analytics:** PostHog
- **Canvas:** HTML5 Canvas API

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
git clone https://github.com/harshith-ashvi/simplianimate-client.git
cd simplianimate-client
npm install
```

### Environment Variables

Create a `.env` file in the root directory with your Supabase credentials:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Run Development Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Usage

1. Open the app and browse available templates on the home page
2. Select a template (text-based, image-based, or other)
3. Customize the animation using the form controls (text, colors, speed, etc.)
4. Choose your aspect ratio — Portrait, Landscape, or Square
5. Click **Export**, enter a file name, select format, and download

> **Note:** You need to sign in to export/download files.

## Project Structure

```
src/
├── components/       # Shared UI components (navbar, auth, export modal)
│   ├── auth/         # Authentication provider and components
│   ├── navbar/       # Navigation bar
│   └── ui/           # Reusable UI primitives (shadcn/ui)
├── data/             # Static data, Supabase client, template configs
├── layouts/          # Dashboard layout wrapper
├── pages/            # Feature pages (one per template)
│   ├── ASCII/
│   ├── DisplacementMap/
│   ├── GradientArora/
│   ├── Home/
│   ├── Kotyadhipati/
│   ├── MatrixRain/
│   ├── PixelEffect/
│   ├── TextFalling/
│   ├── TextFlyers/
│   └── TextReveal/
├── routes/           # App and auth route definitions
├── types/            # TypeScript type definitions
├── utils/            # Utility functions
└── lib/              # Library helpers
```

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/my-feature`)
3. Commit your changes (`git commit -m 'Add my feature'`)
4. Push to the branch (`git push origin feature/my-feature`)
5. Open a Pull Request

## Request Templates

Have an idea for a new animation template? [Request it here](https://simplianimate.canny.io/).

## License

This project is licensed under the [MIT License](LICENSE).
