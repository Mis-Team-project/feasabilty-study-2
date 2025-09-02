# Project Blueprint: Kindergarten Financial and Economic Study

## Overview
This document outlines the development of an interactive "Financial and Economic Study" section for a kindergarten website. The section will be in Arabic (RTL), modern, clean, fully responsive, and visually engaging, featuring summary cards and dynamic ApexCharts.

## Detailed Outline

### Current State
The project currently has a basic React setup with various components. The goal is to integrate a new, rich, and interactive section.

### Features Implemented (Initial Version)
- React application structure.
- Basic CSS styling.

### Plan for Current Requested Change: Financial and Economic Study Section

**Purpose:** To present key financial and economic data related to the kindergarten in an interactive and visually appealing manner.

**Actionable Steps:**

1.  **Create `blueprint.md` (Completed):** Document the plan and project outline.
2.  **Create `src/components/FinancialEconomicStudy.jsx`:**
    *   This component will encapsulate the entire Financial and Economic Study section.
    *   It will manage the state for selected cards and data for charts.
3.  **Create `src/components/FinancialEconomicStudy.css`:**
    *   Define styles for the section, including cards, chart containers, and responsive adjustments.
    *   Ensure RTL compatibility.
    *   Implement animations for numbers counting up on scroll.
4.  **Create `src/components/AnimatedNumber.jsx`:**
    *   A reusable component to animate numbers from 0 to a target value, specifically designed for scroll-triggered animation.
    *   Utilize `react-intersection-observer` for visibility detection.
5.  **Update `src/App.jsx`:**
    *   Import and render the `FinancialEconomicStudy` component within the main application layout.
6.  **Define Data:**
    *   Embed the provided Arabic financial data directly within `FinancialEconomicStudy.jsx` for initial development.
    *   Structure the data for easy consumption by ApexCharts.
7.  **Implement Summary Cards (Part 1):**
    *   Design and render 3 visually appealing cards (`تكاليف التأسيس`, `التشغيل الشهري`, `الإيرادات المتوقعة`).
    *   Display the total for each card.
    *   Add a "عرض الرسم البياني" button/action area.
    *   Manage the active card state using `useState`.
    *   Integrate `AnimatedNumber` for the totals in the cards.
8.  **Implement Interactive Charts (Part 2):**
    *   Use `useState` to conditionally render different charts based on the selected card.
    *   **ApexCharts Integration:**
        *   **For `تكاليف التأسيس`:**
            *   Render a Pie/Doughnut Chart showing the distribution of costs.
            *   Configure tooltips to show item name, amount, and percentage.
        *   **For `التشغيل الشهري`:**
            *   Render a Pie/Doughnut Chart showing the distribution of monthly expenses.
            *   Configure tooltips to show item name, amount, and percentage.
        *   **For `الإيرادات المتوقعة`:**
            *   **Break-even / Line Chart:** Plot revenues vs. costs to identify the break-even point. This will require calculating monthly revenues based on child count and cost.
            *   **Comparative / Scenario Charts (Stacked Bar Chart):** Create hypothetical scenarios (e.g., different child counts or pricing tiers) and compare their revenues, costs, and profits using a stacked bar chart.
            *   Configure tooltips for all charts to show relevant details (name, amount, percentage/value on axis).
9.  **Styling Enhancements:**
    *   Ensure smooth transitions for card selection and chart rendering.
    *   Apply modern design principles: rounded corners, soft shadows, clear typography, and a vibrant color palette.
    *   Verify full responsiveness across various screen sizes.
    *   Ensure RTL layout for all elements.
10. **Refinements and Error Handling:**
    *   Run `eslint . --fix` to maintain code quality.
    *   Test thoroughly in the preview environment for functionality, responsiveness, and visual accuracy.
    *   Address any console errors or warnings.

## Styling Guidelines

*   **Aesthetics:** Modern, clean, and engaging design with a focus on user experience.
*   **Fonts:** Clear and readable Arabic typography, with appropriate size hierarchy.
*   **Color Palette:** Vibrant and energetic, color-coded for chart clarity.
*   **Shadows:** Soft, multi-layered drop shadows for depth and "lifted" card appearance.
*   **Interactivity:** Smooth transitions, responsive hover effects for buttons and chart elements.
*   **Responsiveness:** Fully adaptable layout for desktop, tablet, and mobile screens.
*   **RTL:** All text and layout elements will be right-to-left.

## Accessibility (A11Y) Standards

*   Ensure proper ARIA attributes for interactive elements.
*   Maintain sufficient color contrast.
*   Provide keyboard navigation where applicable.

