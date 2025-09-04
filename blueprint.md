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

## Current Change: Implement Dark/Light Theme Switcher

### Plan
Introduce a theme switcher feature that allows users to toggle between a light and a dark mode for the application. This will be implemented using CSS variables for colors and controlled via a new UI element in the floating controls panel.

### Steps
1.  **Modify `src/App.jsx`:**
    - Add state to manage the current theme (`'light'` or `'dark'`).
    - Create a function to toggle the theme and apply/remove a class (e.g., `'dark-mode'`) to the main application container.
    - Pass the current theme and the toggle function down to the `FloatingControls` component.

2.  **Modify `src/components/FloatingControls.jsx`:**
    - Receive the theme and toggle function as props.
    - In the previously empty panel section, add a UI element (e.g., a button with an icon) for toggling the theme.
    - Use appropriate icons from `lucide-react` (e.g., `Sun` and `Moon`) to represent the current theme and the action.

3.  **Modify `src/index.css` (or another global stylesheet):**
    - Define CSS custom properties (variables) for the color palette (e.g., `--background-color`, `--text-color`, `--card-background`).
    - Set default (light theme) values for these variables under the `:root` selector.
    - Create a `.dark-mode` class selector that overrides these variables with their dark theme equivalents.
    - Update existing component CSS files to use these CSS variables instead of hardcoded color values.


## Previous Changes

### Fix Floating Controls Panel Overflow

#### Plan
Adjust the CSS for the floating controls panel to prevent it from overflowing the screen, especially on smaller viewports. This involves setting maximum dimensions and enabling internal scrolling if content exceeds the visible area.

#### Steps
1.  **Modify `src/components/FloatingControls.css`:**
    - Add `max-width: calc(100vw - 40px);` to ensure the panel does not exceed the viewport width, accounting for padding.
    - Add `max-height: calc(100vh - 120px);` to ensure the panel does not exceed the viewport height, leaving space for the floating button and margins.
    - Add `overflow-y: auto;` to enable vertical scrolling within the panel if its content is too tall.

### Enhance Riyadh Map Visuals (Conceptual)

#### Plan
Improve the visual representation of the Riyadh map by replacing basic SVG rectangles with more complex and visually approximate SVG paths for each region (North, South, East, West, Center Riyadh). This change aims to make the map appear more realistic while maintaining its conceptual nature and interactive functionalities (hover and selection).

#### Steps
1.  **Modify `src/components/RiyadhMap.jsx`:**
    - Update the `d` (path data) attribute for each region in the `regions` array with new, more detailed SVG path strings that visually simulate the shapes of Riyadh's major areas.

### Fix Interactive Riyadh Map Hover Tooltip

#### Plan
Address the issue where the hover tooltip on the Riyadh map was not appearing correctly. This involves dynamically updating CSS variables for tooltip positioning based on mouse movement within the map container.

#### Steps
1.  **Modify `src/components/RiyadhMap.jsx`:**
    - Add a `useRef` hook to get a reference to the map container element.
    - Implement a `useEffect` hook to attach and clean up a `mousemove` event listener to the map container.
    - Inside the `mousemove` handler, calculate the mouse coordinates relative to the map container and set CSS custom properties (`--mouse-x` and `--mouse-y`) on the container element. These properties will be used by the tooltip for positioning.

### Add Interactive Riyadh Map

#### Plan
Add a conceptual interactive map of Riyadh with its main regions. The map will allow users to hover over regions to see their names and click to select it. This map will be integrated into the `FieldStudy` component as it is relevant to location analysis.

#### Steps
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