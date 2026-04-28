<div align="center">
  <h1>🌷 28E (Yaire's Vault)</h1>
  <p><strong>A high-performance, time-locked Progressive Web App (PWA) built with Vanilla JS, GSAP, and TailwindCSS.</strong></p>
  
  <p>
    <img src="https://img.shields.io/badge/Status-Locked_until_April_28_2026-red.svg" alt="Status" />
    <img src="https://img.shields.io/badge/JavaScript-Vanilla-F7DF1E.svg" alt="Vanilla JS" />
    <img src="https://img.shields.io/badge/CSS-Tailwind-38B2AC.svg" alt="Tailwind" />
    <img src="https://img.shields.io/badge/Animations-GSAP_3-88CE02.svg" alt="GSAP" />
  </p>
</div>

---

## 📖 Overview

**28E** is a heavily optimized, bespoke web application designed as a time-locked digital vault. Conceived with a strict minimalist **OLED-black** design language, it utilizes a modular "Bento Grid" layout to present content. 

The application is explicitly designed to be inaccessible before **April 28, 2026**. Prior to this date, an internal time-lock mechanism intercepts the load sequence and forcefully routes the user to a secure maintenance/countdown page.

## ✨ Key Features

*   ⏱️ **Cryptographic Time-Lock**: Client-side date validation prevents access to the main bundle before the target unlock date.
*   🌑 **OLED-Black "Monolith" Aesthetic**: Pure `#000000` backgrounds with charcoal `.bento-surface` cards. All glassmorphism was stripped to ensure maximum contrast, deep blacks, and a premium editorial feel.
*   🚀 **Hardware-Accelerated UI**: Custom CSS containment (`contain`, `translateZ(0)`) and DOM node purging ensure 60 FPS fluidity with zero memory leaks, even on lower-end mobile devices.
*   🎵 **Zero-Lag Web Audio Engine**: A completely custom AudioContext implementation handles background music (`radio/`) and UI sound effects (`sounds/`) without thread-blocking.
*   🌍 **Dynamic i18n Engine**: Built-in, zero-dependency translation dictionary supporting English, Spanish, French, Portuguese, and German, instantly switchable via DOM hydration.
*   📱 **Custom Swipe Navigation**: A bespoke touch-event listener system handles swipe gestures on mobile, avoiding the overhead of heavy slider libraries.
*   🎮 **Integrated Micro-interactions**: Includes integrated minigames (Memory Match), interactive particle canvases, and Chart.js data visualizations.

## 🛠️ Tech Stack

*   **Logic**: 100% Vanilla JavaScript (No React, Vue, or Angular overhead).
*   **Styling**: Tailwind CSS (via CDN) + Custom utility classes.
*   **Typography**: `Inter` (UI) and `Merriweather` (Display).
*   **Animations**: GSAP 3 & ScrollTrigger for scroll-linked cascades and layout reveals.
*   **Data Vis**: Chart.js for interactive statistics.

## 📁 Project Structure

```text
/
├── index.html           # Main Application Bundle (15k+ lines of optimized JS/HTML/CSS)
├── mantenimiento.html   # The time-lock fallback / countdown interface
├── radio/               # High-fidelity music tracks 
├── sounds/              # UI sound effects (clicks, hovers, success chimes)
└── tulip.ico            # Brand favicon
```

## 🚀 Local Development

To run this project locally and bypass the time-lock for testing purposes:

1. Clone the repository:
   ```bash
   git clone https://github.com/charlygustav/yaire.git
   ```
2. Serve the directory using any local web server (e.g., Live Server, Python `http.server`, or Node `http-server`).
3. **Bypass the Time-Lock**: Append `?dev=1` to the URL (e.g., `http://localhost:3000/index.html?dev=1`) to force-unlock the vault and prevent redirection to `mantenimiento.html`.

## 🎨 Design Philosophy

The UI adheres strictly to the **Megara Studio Monolith** guidelines:
- No soft shadows.
- Ultra-thin (1px) `rgba(255,255,255,0.05)` borders.
- Hover states are driven by GSAP elastic scales rather than color shifts.
- The color palette is restricted strictly to zinc grays, `brand-500` (Amber/Orange), and `tulip-500` (Pink).

---
*Diseñado y codificado por Charles Gustav.*
