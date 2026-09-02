# 🪐 3D Saturn Interactive Portfolio

[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-r185-000000?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.1-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

An interactive, dark cosmic-themed 3D Developer Portfolio featuring custom **Three.js / React Three Fiber** WebGL shaders, photorealistic procedural **Saturn and Ring systems**, scroll-driven camera trajectories, smooth inertial scrolling via **Lenis**, and **GSAP** scroll-triggered animations.

---

## ✨ Features

- **🪐 Photorealistic Procedural 3D Saturn & Ring Mesh:** Built with procedural canvas ring textures, atmospheric bloom, surface noise shading, and realistic lighting.
- **✨ Dynamic Starfield & Parallax Background:** Interactive 3D particle starfield reacting smoothly to mouse movement and scroll depth.
- **📜 Scroll-Driven 3D Camera Trajectories:** GSAP & Lenis integration smoothly panning the 3D Saturn model across viewport sections as the user scrolls.
- **🎨 Glassmorphic Modern UI:** Dark cosmic aesthetic, frosted glass navbars, interactive modals, and glowing micro-interactions.
- **⚡ High Performance:** Optimized WebGL canvas rendering with `@react-three/fiber` and `@react-three/drei`.
- **📱 Fully Responsive:** Adaptive layouts optimized for desktops, tablets, and mobile devices.

---

## 🛠️ Tech Stack

| Domain | Technologies Used |
| :--- | :--- |
| **Frontend Framework** | React 19, TypeScript |
| **Build Tool** | Vite |
| **3D & WebGL Graphics** | Three.js, `@react-three/fiber`, `@react-three/drei` |
| **Animations & Scroll** | GSAP, Lenis Smooth Scroll |
| **Styling** | Tailwind CSS, Lucide Icons |

---

## 📁 Project Structure

```
3d-saturn-website/
├── public/                # Static assets & textures
├── src/
│   ├── components/
│   │   ├── canvas/       # 3D R3F WebGL Components
│   │   │   ├── SaturnMesh.tsx       # Procedural Saturn planet & ring system
│   │   │   ├── MoonMesh.tsx         # Orbiting lunar elements
│   │   │   ├── NightSkyStars.tsx    # Interactive background starfield
│   │   │   ├── FloatingParticles.tsx# Ambient space dust particles
│   │   │   ├── HeroShaderMesh.tsx   # Custom shader effects
│   │   │   └── SceneCanvas.tsx      # R3F Canvas wrapper & lighting
│   │   └── dom/          # HTML/DOM UI Components
│   │       ├── Navbar.tsx           # Glassmorphic top navigation
│   │       ├── HeroSection.tsx      # Hero banner with dynamic typography
│   │       ├── AboutSection.tsx     # Developer bio & journey
│   │       ├── ServicesSection.tsx  # Interactive service cards
│   │       ├── WorkSection.tsx      # Featured project showcase
│   │       ├── ProcessSection.tsx   # Workflow & methodology timeline
│   │       ├── FaqSection.tsx       # FAQ accordion
│   │       ├── Footer.tsx           # Social links & copyright footer
│   │       ├── ContactModal.tsx     # Interactive contact form modal
│   │       └── LoadingScreen.tsx    # Cosmic loader with progress bar
│   ├── hooks/
│   │   └── useSmoothScroll.ts       # Lenis smooth scroll setup
│   ├── store/            # State management
│   ├── App.tsx           # Main application assembly
│   ├── index.css         # Custom utility styles & design tokens
│   └── main.tsx          # Application entry point
├── package.json
├── tailwind.config.js
└── vite.config.ts
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (version 18 or higher) and `npm` installed.

### Installation

1. **Clone the repository:**
   ```bash
   git clone git@github.com:Mahesh-4017/3d-saturn-website.git
   cd 3d-saturn-website
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   Navigate to `http://localhost:5173` to view the 3D application.

---

## 📦 Build & Deployment

To create an optimized production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

---

## 📬 Contact & Socials

- **Developer:** Mahesh
- **GitHub:** [@Mahesh-4017](https://github.com/Mahesh-4017)
- **LinkedIn:** [Mahesh Sain](https://linkedin.com/in/mahesh-sain)
- **Email:** [sain_4017@gmail.com](mailto:sain_4017@gmail.com)

---

⭐ *If you enjoyed this project, feel free to give it a star on GitHub!*
