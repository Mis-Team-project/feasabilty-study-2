# Blueprint: Feasibility Study Website

## 1. Overview

This document outlines the structure and key components of the feasibility study website. The goal is to create a professional, responsive, and data-rich web application optimized for readability and analysis, with a consistent and modern user interface.

---

## 2. Core Features & Technologies

- **Layout**: Responsive card-based design for each section.
- **Framework**: React.js with `vite`.
- **Typography**: `IBMPlexSansArabic`.
- **Icons**: `lucide-react`.
- **Animations**: `framer-motion`.
- **Charts**: `react-apexcharts`.
- **Navigation**: Auto-hiding sticky navbar, and a sidebar with smooth-scroll and active section highlighting.

---

## 3. Section Breakdown & Components

The application is organized into logical sections, each corresponding to a specific component. Dividers are used in the navigation sidebar for better grouping.

| Section Title | Component (`src/components/`) | ID | Icon (Lucide) |
| :--- | :--- | :--- | :--- |
| 1. الغلاف | - | `cover` | `Book` |
| 2. الحديث عن المشروع وأهميته | - (Inline JSX) | `intro` | `Target` |
| 3. الملخص التنفيذي | - (Inline JSX) | `summary` | `FileText` |
| 4. الهيكل الإداري والتنظيمي | `OrgChart` | `structure`| `Network` |
| 5. دراسة السوق | `MarketStudy` | `market-study`| `BarChart3` |
| 6. التسعير المرجعي | `Pricing` | `pricing` | `Tags` |
| 7. الدراسة القانونية | `LegalStudy` | `legal`| `ShieldCheck` |
| 8. الدراسة الفنية والتشغيلية | `TechnicalStudy` | `technical`| `Wrench` |
| 9. المنهج والبرنامج اليومي | `DailyProgram` | `curriculum`| `CalendarClock` |
| 10. الهيكل البشري | `HumanStructure` | `hr`| `Users` |
| 11. الدراسة المالية | `FinancialStudy`| `financials` | `Calculator` |
| 12. إنشاء موقع وتطبيق | `WebAppSection` | `app` | `MonitorSmartphone`|
| 13. المخاطر والحلول | `RisksAndSolutions` | `risks` | `AlertTriangle` |
| 14. النتائج الشهرية | `MonthlyResults` |`monthly-results`| `Table` |
| 15. الملخص السنوي | `AnnualSummary` | `annual-summary`| `FileBarChart` |
| 16. ملخص النموذج | - (Inline JSX) |`model-summary`| `ClipboardList` |
| 17. أهم المؤشرات | - (Inline JSX) |`indicators` | `TrendingUp` |
| 18. الرسوم البيانية | - (Inline JSX) | `charts`| `PieChart` |
| **--- Divider ---** | - | `divider-1` | - |
| 19. **الدراسات الميدانية** | `FieldStudies` | `field-studies-main` | `Map` |
| **--- Divider ---** | - | `divider-2` | - |
| 20. **خطة العمل التشغيلية** | `ActionPlan` | `action-plan` | `Rss` |
| 21. **ترشيح المواقع الأنسب** | `FieldStudy` | `field-study-locations`| `Route` |


---

## 4. Design & Theming

The application uses a unified light theme controlled by CSS variables in `src/App.css`. All new components must adhere to this theme to ensure visual consistency. Key variables include `--primary-color`, `--text-color`, `--background-color`, and `--card-bg`.

---

## 5. Change Log & Implemented Components

### **Major UI/UX & Content Overhaul (Latest)**

- **Change**: Performed a significant visual and structural update across several key sections to enhance clarity, user experience, and modern aesthetics.
- **New Components**:
  - `FieldStudies.jsx` & `FieldStudies.css`
- **Updated Components & Rationale**:
  - **`ActionPlan.jsx`**:
    - **Change**: Replaced the previous design with a responsive, horizontal timeline.
    - **Features**: Displays 8 distinct phases from planning to launch, each with an icon, duration, and key activities. The design is modern, uses a connecting line, and adapts to a vertical layout on mobile for readability.
  - **`FieldStudy.jsx` ("ترشيح المواقع الأنسب")**:
    - **Change**: Redesigned the component to present a comparative analysis of top locations.
    - **Features**: A 3-card grid layout for "الملقا", "القيروان", and "النرجس". Each card includes reasons and expectations with icons, and a button to open the location on Google Maps. Includes hover effects and responsive design.
  - **`FieldStudies.jsx` (New Section)**:
    - **Change**: Introduced a new, independent section for proposed field studies.
    - **Features**: A grid of cards detailing 5 recommended studies (surveys, interviews, analysis, etc.) with modern icons, descriptions, and animations.
  - **`App.jsx` & `App.css` (Structural)**:
    - **Change**: Reorganized the main sections array to introduce "الدراسات الميدانية" as a distinct section, separated by dividers in the sidebar for better navigation. Fixed a CSS bug causing the sidebar divider to render incorrectly.

### **AnnualSummary** (Previous Component)
- **Files**: `src/components/AnnualSummary.jsx`, `AnnualSummary.css`
- **Purpose**: Displays a 3-year financial summary with a data table and interactive charts.
- **Features**: A data table, KPI cards, and a dynamic chart type selector.

---
*This blueprint is a living document and should be updated with each major change to reflect the current state of the project.*
