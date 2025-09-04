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
- **Floating Controls Panel:** A floating button with an icon that, when clicked, reveals a hover panel. This panel is divided into three sections: a toggle for 'summary' or 'detailed' view, a slider for year selection (2025-2035), and an empty space for future features.
- **Interactive Riyadh Map:** A conceptual map of Riyadh divided into regions. Users can hover over regions to see their names and click to select a region.

## Current Change: Add Interactive Riyadh Map

### Plan
Add a conceptual interactive map of Riyadh with its main regions. The map will allow users to hover over a region to display its name and click to select it. This map will be integrated into the `FieldStudy` component as it is relevant to location analysis.

### Steps
1.  **Create `src/components/RiyadhMap.jsx`:**
    - Develop a new React component to house the SVG-based map.
    - Implement state management for `hoveredRegion` and `selectedRegion`.
    - Define `onMouseEnter`, `onMouseLeave`, and `onClick` handlers for each region.
    - Include the `MapPin` icon from `lucide-react` for thematic consistency.
2.  **Create `src/components/RiyadhMap.css`:**
    - Style the map container, SVG elements, and individual regions.
    - Design hover and selected states for regions, including a glow effect for selected regions.
    - Style the tooltip for hovered regions and the display for selected regions.
3.  **Modify `src/components/FieldStudy.jsx`:**
    - Import the `RiyadhMap` component.
    - Render `RiyadhMap` at the top of the `FieldStudy` component.

## Previous Changes

### Update Executive Summary Icons

#### Plan
Replace the generic `FileText` icon in the "Executive Summary" section with more descriptive icons from the `lucide-react` library to better match the content of each summary card.

#### Steps
1.  **Modify `src/components/SummarySectionContent.jsx`:**
    - Import the new icons: `TrendingUp`, `ClipboardList`, `ShieldCheck`, and `Target`.
    - Update the `summaryData` array to associate each item with its corresponding new icon.
    - Dynamically render the appropriate icon for each card.

### Move Floating Controls to the Right

#### Plan
Adjust the CSS for the floating button and its panel to position them on the right side of the screen instead of the left.

#### Steps
1.  **Modify `src/components/FloatingControls.css`:**
    - Change `left: 20px;` to `right: 20px;` and add `left: unset;` for `.floating-controls-container`.
    - Ensure `.floating-panel`'s `right` property is set to `0` and `left: unset;` is added, to align it correctly with the button on the right side.

### Add Floating Controls Panel

#### Plan
Implement a floating button with an icon in the bottom-left corner of the screen. Upon clicking, a hover panel will appear, divided into three sections:
1.  A toggle between "ملخص" (Summary) and "تفصيلي" (Detailed).
2.  A slider for selecting a year from 2025 to 2035.
3.  An empty section reserved for future features.

#### Steps
1.  **Create `src/components/FloatingControls.jsx`**
2.  **Create `src/components/FloatingControls.css`**
3.  **Modify `src/App.jsx`**

### Fix Cover Image Display

#### Plan
The cover image was not appearing due to an issue with how Vite handles relative paths in CSS files. To fix this, the image will be imported directly into the `Cover.jsx` component, and its URL will be passed as a CSS variable to the `cover-container` div. The `Cover.css` file will then use this CSS variable to set the background image.

#### Steps
1.  **Modify `src/components/Cover.jsx`**
2.  **Modify `src/components/Cover.css`**