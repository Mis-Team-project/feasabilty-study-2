# Project Blueprint: Kindergarten Financial and Economic Study

## Overview
This document outlines the development of an interactive "Financial and Economic Study" section for a kindergarten website. The section is designed to be modern, clean, fully responsive, and visually engaging, featuring summary cards, detailed modals, and dynamic ApexCharts, with a strong focus on user experience and readability in Arabic (RTL).

## Detailed Outline

### Current State
The project has a well-structured React application. The latest major update involved a complete rebuild of the "Financial and Economic Study" section to be highly interactive and data-driven.

### Features Implemented

-   **React Application Structure:** Robust and component-based.
-   **Comprehensive Responsiveness:** Media queries and flexible layouts are applied across the application, ensuring a seamless experience on all devices.
-   **Centered and Modern Layout:** Consistent use of modern CSS for centered, clean, and professional layouts.

### New: Financial and Economic Study Section (Interactive & Modern)

This section was completely redesigned and implemented to provide a rich, interactive financial overview.

**Purpose:** To present key financial data (establishment costs, operational costs, and revenue projections) in a visually appealing and easily digestible format.

**Key Components & Features:**

1.  **`FinancialEconomicStudy.jsx` (Main Component):**
    *   Acts as the central container for this entire section.
    *   Manages the state for the modal window visibility and the data passed to it.
    *   Integrates all sub-components into a cohesive unit.

2.  **`FinancialEconomicStudy.css` (Styling):**
    *   A dedicated stylesheet that defines a modern color palette (`--cool-blue`, `--vibrant-green`, etc.).
    *   Styles for summary cards, including hover effects (`transform`, `box-shadow`) and `border-radius`.
    *   Defines the look and feel of the interactive charts, buttons, and the modal window, ensuring a consistent and polished design.
    *   All styles are written to be fully compatible with a Right-to-Left (RTL) layout.

3.  **`AnimatedNumber.jsx` (Dynamic Number Display):**
    *   A reusable component that uses `framer-motion` to animate numbers, making financial data feel more dynamic and engaging.
    *   Triggers the animation when the component comes into view (`useInView`).

4.  **Summary Cards (`SummaryTableCard`):**
    *   Three distinct cards for **"تكاليف التأسيس"**, **"التشغيل الشهري"**, and **"الإيرادات المتوقعة"**.
    *   Each card features a `lucide-react` icon, a list of detailed items, and animated numbers for costs.
    *   The cost-related cards include a **"عرض التفاصيل"** button.

5.  **Modal with Donut Chart (`SummaryModal`):**
    *   Clicking "عرض التفاصيل" opens a sleek modal window (`framer-motion` for animations).
    *   The modal displays a **Donut Chart** (`react-apexcharts`) visualizing the cost breakdown for the selected category.
    *   Provides a clear, focused view of the data.

6.  **Interactive Charts Section (`InteractiveChartsSection`):**
    *   A powerful, multi-chart container allowing users to switch between different financial perspectives.
    *   **Chart Toggles:** Three buttons to switch between:
        *   **توزيع التكاليف (Pie Chart):** Compares total establishment costs vs. annual operational costs.
        *   **مقارنة شاملة (Bar Chart):** A stacked bar chart comparing establishment costs, annual operational costs, and projected annual revenue at the break-even point.
        *   **نقطة التعادل (Line Chart):** A line chart tracking cumulative revenue vs. cumulative costs over 12 months, with an annotation highlighting the approximate break-even point.
    *   Uses `AnimatePresence` from `framer-motion` for smooth, animated transitions between charts.

**Data & Styling:**

-   **Data:** All financial figures and labels are embedded within `FinancialEconomicStudy.jsx` as structured objects.
-   **Color Palette:**
    *   **Primary:** `#4A90E2` (Cool Blue)
    *   **Secondary:** `#F4F5F7` (Light Gray)
    *   **Accent:** `#50E3C2` (Vibrant Green)
    *   **Text:** `#333333` (Dark Charcoal)
-   **Design:** The design emphasizes clarity through clean typography, soft shadows, and a well-defined visual hierarchy.

## Accessibility (A11Y) Standards

*   Sufficient color contrast is maintained for readability.
*   Interactive elements like buttons and modals are designed to be intuitive.
*   Chart tooltips enhance data understanding.
