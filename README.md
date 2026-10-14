# Patricio Salazar-Lopez — Personal Portfolio Website 🌐

> **Modern, high-performance personal engineering portfolio showcasing enterprise automation pipelines, full-stack web applications, and mechanical airflow systems.**

[![Live Demo](https://img.shields.io/badge/Demo-Live%20Portfolio-blue?logo=googlechrome)](https://patriciosal.github.io/portfolio/)
[![Stack](https://img.shields.io/badge/Stack-Vanilla%20HTML5%20%7C%20CSS3%20%7C%20JavaScript-orange)](#-technologies)
[![Theme](https://img.shields.io/badge/Theme-Dark%20%2F%20Light%20Mode-purple)](#-features)
[![License](https://img.shields.io/badge/License-MIT-green)](#-license)

---

## 📖 Overview

This repository houses the source code for the personal engineering portfolio of **Patricio Salazar-Lopez**, a Software Engineer & Systems Developer studying Computer Science at **The University of Texas at Dallas**.

The website is crafted with vanilla web technologies to achieve blazing-fast load times, zero external runtime framework overhead, and responsive typography across all viewports.

---

## ✨ Features

* **🎨 Sleek Dark & Light Mode Design System**:
  * Curated color palettes with HSL tokens, glowing ambient backdrops, and glassmorphic card borders.
  * Instant theme toggling persisted to `localStorage` with automated system color preference detection (`prefers-color-scheme`).

* **🏢 Interactive Experience Timeline**:
  * Features authentic logos and detailed engineering breakdowns for:
    * **Sapi Technologies LLC**: Enterprise order automation bot (`SAPI_WATCHER`), WhatsApp & PDF parsing, fuzzy NLP customer matching, and remote MS SQL Server sync.
    * **New Results Heating & Cooling**: Residential HVAC air duct layout, ACCA Manual D CFM airflow calculations, static pressure balancing, and architectural framing routing.
    * **The University of Texas at Dallas**: Academic coursework, algorithms, database architectures, and collaborative engineering.

* **🚀 Filterable Projects Showcase with Deep-Dive Modals**:
  * Filter projects by category (*All*, *Enterprise Automation*, *Mechanical Engineering*, *Full-Stack Web*, *Mobile Apps*).
  * Interactive modal cards providing architecture diagrams, engineering specifications, challenges overcome, and direct links to live repositories.

* **🛠️ Skills & Competencies Matrix**:
  * Organized by *Languages*, *Backend & Databases*, *Enterprise & Automation*, *Engineering & Domain*, and *Tools & Platforms*.

* **📬 Interactive Contact Hub**:
  * Direct contact form with validation, automated toast alerts, and formatted `mailto:` dispatch to `pato.sallopez14@gmail.com`.

---

## 🛠️ Technologies

| Component | Technology | Description |
|---|---|---|
| **Structure** | Semantic HTML5 | Accessible, SEO-optimized markup with OpenGraph social tags |
| **Styling** | Modern CSS3 | Custom CSS variables, responsive CSS Grid / Flexbox, glassmorphism, micro-animations |
| **Logic** | Vanilla JavaScript (ES6+) | Modal controller, filter engine, theme switcher, scroll spy, toast notifications |
| **Typography** | Google Fonts | *Plus Jakarta Sans* & *JetBrains Mono* |
| **Assets** | Authentic Logos & SVGs | High-resolution branding assets stored in `assets/images/logos/` |

---

## 📂 Project Structure

```text
PersonalWeb/
├── index.html              # Main application markup & sections
├── style.css               # Design system tokens, layouts, animations, & themes
├── script.js               # Modal controller, filtering engine, & theme manager
├── assets/
│   ├── images/
│   │   ├── avatar.jpg      # Developer portrait
│   │   └── logos/          # Authentic company & project logos
│   │       ├── sapi_logo.jpg
│   │       ├── new_results_logo.png
│   │       ├── atx_teens_logo.png
│   │       └── evo_logo.png
├── docs/                   # Full documentation for showcased projects
│   ├── README_ATX_TEENS.md # Comprehensive documentation for ATX Teens Need Jobs
│   └── README_EVO_APP.md   # Comprehensive documentation for EVO App
├── .gitignore              # Ignored system and build artifacts
└── README.md               # Repository documentation (this file)
```

---

## 🚀 Getting Started

### Local Preview
No build step or dependencies required! You can open the project directly in your browser or run a lightweight local HTTP server:

```bash
# Clone the repository
git clone https://github.com/PatricioSal/PersonalWeb.git
cd PersonalWeb

# Run with Python
python -m http.server 3000

# Or run with Node
npx serve .
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 👤 Author

* **Patricio Salazar-Lopez**
  * GitHub: [@PatricioSal](https://github.com/PatricioSal)
  * Email: [pato.sallopez14@gmail.com](mailto:pato.sallopez14@gmail.com)
  * Institution: The University of Texas at Dallas

---

## 📄 License

This project is licensed under the [MIT License](LICENSE) — free to reference and adapt.
