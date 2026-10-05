# 3D Human Anatomy Atelier (මානව ශරීර ව්‍යුහ විද්‍යාව)

An interactive 3D human anatomy educational web application featuring animated models, cinematic video tours, Web Audio sound synthesis, and bilingual support (English & Sinhala / සිංහල).

![Anatomy Atelier Preview](assets/thumbs/heart.webp)

## 🌟 Features
- **9 High-Quality 3D Anatomical Organs**: Heart (හෘදය), Brain (මොළය), Lungs (පෙනහැල්ල), Liver (අක්මාව), Kidneys (වකුගඩු), Eyeball (ඇස), Intestine (අන්ත්‍රය), Pancreas (අග්න්‍යාශය), Skin (සම).
- **Cinematic 3D Video Tour Engine**: Step-by-step camera trajectory transitions with timeline scrubbers and interactive audio sound effects.
- **Hotspot Focus**: Clickable anatomical pins highlighting structural parts and medical descriptions.
- **Bilingual Terminology**: 100% curriculum-standard Sri Lankan biological & medical nomenclature in both **English** and **Sinhala (සිංහල)**.
- **Pure Client-Side WebGL**: Zero build step required. Runs directly in any modern browser via Three.js.

## 🚀 Live Demo / GitHub Pages
This project is configured to run out-of-the-box on **GitHub Pages**.
Once enabled in your repository settings:
`https://<your-username>.github.io/<your-repository-name>/`

## 💻 Local Running
To run locally without browser CORS restrictions on 3D `.glb` assets:
1. Double-click `start_server.bat` (or run `python -m http.server 8080`).
2. Open `http://localhost:8080` in your web browser.
