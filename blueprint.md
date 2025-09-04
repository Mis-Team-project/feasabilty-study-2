# Project Blueprint

## Overview
This project is a feasibility study for a kindergarten and preschool in Riyadh, focusing on an early childhood center providing innovative care and education. The application is built with React and uses modern web development practices.

## Style and Design
The application features a modern and clean design with a focus on readability and user experience. It uses a responsive layout to adapt to different screen sizes. Visual elements include expressive typography, a vibrant color palette, subtle textures, and multi-layered drop shadows for depth. Interactive components incorporate icons and elegant color effects.

## Features
- **Cover Page:** Displays the project title and subtitle with a background image.
- **Navigation Bar:** A responsive navigation bar with a toggleable sidebar for easy access to different sections.
- **Animated Sections:** Sections of the report are animated to provide a dynamic user experience.
- **Project Sections:** The report is divided into several key sections, each addressing a specific aspect of the feasibility study:
    - Introduction to the project and its importance according to Vision 2030
    - Executive Summary
    - Administrative and Organizational Structure
    - Market Study - North Riyadh
    - Reference Pricing
    - Legal and Regulatory Study
    - Technical and Operational Study
    - Human Structure
    - Economic and Financial Study (Estimated)
    - Website and Application Creation
    - Risks and Solutions
    - Monthly Results (First Year - Brief)
    - Annual Summary (3 Years)
    - Model Summary
    - Key Indicators
    - Field Studies
    - Operational Action Plan
    - Recommendation of Most Suitable Locations
- **Footer:** Contains copyright information.

## Current Change: Fix Cover Image Display

### Plan
The cover image was not appearing due to an issue with how Vite handles relative paths in CSS files. To fix this, the image will be imported directly into the `Cover.jsx` component, and its URL will be passed as a CSS variable to the `cover-container` div. The `Cover.css` file will then use this CSS variable to set the background image.

### Steps
1.  **Modify `src/components/Cover.jsx`:**
    - Import `cover-background.png` directly: `import coverBackground from '../assets/cover-background.png';`
    - Pass the imported image URL as a CSS variable to the `cover-container` div using the `style` prop: `style={{ '--cover-background-image': \`url(${coverBackground})\` }}`.
2.  **Modify `src/components/Cover.css`:**
    - Update the `background-image` property to use the CSS variable: `background-image: var(--cover-background-image);`.