# Chromify – Color Palette Studio

> **Find Your Perfect Colors. Build Better Designs.**  
> Create harmonious color palettes, check accessibility, preview real-world designs, and export developer-ready color codes — all in one free workspace.

Chromify is a modern, polished SaaS-style web application tailored for designers, frontend developers, UI/UX specialists, students, and beginners.

---

## 🚀 Stage 1 Implementation Overview

In this initial foundation stage, Chromify delivers:
1. **Shared Navigation & Brand Identity**:
   - Distinctive chromatic logo and branding.
   - Responsive navbar with desktop navigation pills, active route indicators, and a mobile slide-down menu.
   - Prominent **"Start Creating"** call-to-action button.
2. **Launch-Ready Home Landing Page**:
   - **Hero Section**: High-impact headline, value proposition, primary and secondary CTA buttons, and a live 5-color palette preview card with interactive presets and hex copy feedback.
   - **Core Features**: 6 core capabilities (Smart Palette Generator, Lock & Customize Colors, WCAG Accessibility Checker, Live Design Preview, Developer-Friendly Export, Save Favorite Palettes) with icons, badges, descriptions, and custom miniature previews.
   - **How It Works**: 4-step progressive workflow from instant generation to production-ready token export.
   - **Use Cases**: 4 audience personas (UI/UX Designers, Frontend Developers, Design & CS Students, Beginners & Creators).
   - **Pre-Footer CTA & Comprehensive Footer**: Product links, studio capabilities, audience categorization, and copyright metadata.
3. **Multi-Page Routing Architecture**:
   - `/` — Complete Home Landing Page
   - `/studio` — Palette Studio (Branded Stage 2 Roadmap & Interface Mockup)
   - `/accessibility` — Accessibility Lab (WCAG Contrast Simulation & Roadmap)
   - `/favorites` — My Collections (LocalStorage Project Boards Roadmap)
   - `/guide` — Color Guide (Color Harmonies, 60-30-10 Rule, WCAG 2.1 Thresholds)

---

## 🛠️ Technology Stack

- **Framework**: [React 18](https://react.dev/) + [Vite 5](https://vitejs.dev/)
- **Routing**: [React Router DOM v6](https://reactrouter.com/)
- **Styling**: [Tailwind CSS 3](https://tailwindcss.com/) + PostCSS + Autoprefixer
- **Icons**: [Lucide React](https://lucide.dev/)
- **Typography**: Inter & JetBrains Mono

---

## 📦 Getting Started & Installation

### 1. Prerequisites
Ensure you have Node.js (version 18 or higher) and npm installed:
```bash
node -v
npm -v
```

### 2. Install Dependencies
In the project root directory, install all required dependencies:
```bash
npm install
```

### 3. Run the Development Server
Start the local Vite development server:
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:3000` (or the port shown in your terminal).

### 4. Build for Production
To create an optimized production build:
```bash
npm run build
```

To preview the production build locally:
```bash
npm run preview
```

---



## 🎨 Design Philosophy
- **Modern SaaS Polish**: Inspired by top-tier creative tools (Linear, Figma, Raycast, Coolors).
- **Subtle Depth**: Clean slate surfaces, subtle 1px borders (`border-slate-800`), refined typography, and purposeful micro-interactions.
- **Accessibility First**: Built-in awareness of WCAG contrast ratios, readability benchmarks, and color vision considerations.
- **Zero Distractions**: Avoids AI-template tropes, excessive glassmorphism, or overcrowded layouts in favor of generous whitespace and scannable visual hierarchy.
