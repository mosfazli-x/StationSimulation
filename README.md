# 🚂 PANTOhealth Station Explorer

A high-performance, interactive dashboard for visualizing German train stations. Built with **React**, **Leaflet**, and **Framer Motion** to provide a premium, responsive user experience.

---

## 🚀 Live Demo
**[INSERT_YOUR_DEPLOYMENT_LINK_HERE]**

---

## ✨ Key Features

* **Split-View Dashboard:** A modern "Map-First" layout that maximizes screen real estate while keeping data accessible.
* **Intelligent Filtering:** Real-time city search and dropdown filtering with synchronized map updates.
* **Fluid Animations:** Powered by **Framer Motion**, featuring layout transitions, hover effects, and smooth sidebar entrances.
* **Pro-Grade Map Design:** Utilizes **CartoDB Voyager & Dark Matter** tiles for a clean, professional aesthetic that highlights data markers.
* **Dark Mode Support:** A fully integrated dark theme that persists across the UI components and the map tiles.
* **Interactive Context:** Selecting a station in the list triggers a smooth "Fly-To" animation on the map for immediate visual feedback.

---

## 🛠️ Tech Stack

| Tool | Purpose |
| :--- | :--- |
| **React 18** | UI Library |
| **Zustand** | Lightweight, high-performance state management |
| **Leaflet & React-Leaflet** | Map rendering and spatial data visualization |
| **Framer Motion** | Senior-level layout and entry animations |
| **Tailwind CSS** | Utility-first styling and dark mode implementation |
| **Lucide React** | Consistent, modern iconography |

---

## 🧠 Engineering Decisions

### 1. The Split-View Layout
Instead of a traditional top-down website layout, I implemented a split-view system (`flex-col-reverse md:flex-row`). This allows users to browse the list without losing the spatial context of the map, a standard UX pattern in professional geospatial tools.

### 2. State Management with Zustand
I chose **Zustand** over Redux or Context API. It provides a cleaner "hooks-based" API, avoids unnecessary re-renders via selectors, and is significantly more efficient to implement for a project of this scale while remaining easily testable.

### 3. Perceived Performance (Skeletons & Transitions)
To prevent "layout shift," I implemented **Loading Skeletons** and Framer Motion's `layout` prop. This ensures that when the list changes (filtering), the remaining cards slide into position rather than disappearing and reappearing abruptly.

### 4. Professional Map Tiles
Default OpenStreetMap tiles can be visually cluttered. I switched to **CartoDB** tiles (Voyager for Light mode, Dark Matter for Dark mode) to ensure that the station markers remain the primary focus of the visualization.

---

## 🧪 Testing

The project includes a meaningful unit test for the core business logic:
* **Filter Logic Test:** Ensures the store correctly filters stations by city and updates the `filtered` state accurately without UI side effects.

Run tests with:
```bash
npm run test

🏗️ Local Setup
Clone the repo:

```bash
git clone [your-repo-link]
Install dependencies:

```bash
npm install
Run development server:

```bash
npm run dev