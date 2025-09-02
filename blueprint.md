# Blueprint: A4-Optimized Feasibility Study Website

## 1. Overview

This document outlines a major redesign of the one-page feasibility study website. The goal is to create a professional, A4-based responsive layout optimized for mobile viewing and PDF export. The design will use a specific Arabic font, feature 19 distinct sections with updated icons, and include advanced navigation features like active section highlighting.

---

## 2. Core Features & Technologies

- **Layout**: A4-proportioned, responsive card-based design for each section.
- **Typography**: `IBMPlexSansArabic` font, as used in the reference documentation.
- **Icons**: An updated set of icons from `lucide-react` for 19 sections.
- **Animations**: Subtle, scroll-triggered entrance animations (`fade`, `slide`, `zoom`) via `framer-motion`.
- **Navigation**:
  - Transparent, auto-hiding sticky navbar.
  - Sidebar with smooth-scroll links.
  - **Active section highlighting** in the sidebar based on scroll position.

---

## 3. Section Breakdown & Icons

| Section Title                                          | Icon (Lucide)         |
| ------------------------------------------------------ | --------------------- |
| 1. **الغلاف (Cover)**                                  | `Book`                |
| 2. **الحديث عن المشروع وأهميته وفق رؤية 2030**          | `Target`              |
| 3. **الملخص التنفيذي**                                | `FileText`            |
| 4. **الهيكل الإداري والتنظيمي**                       | `Network`             |
| 5. **دراسة السوق – شمال الرياض**                         | `BarChart3`           |
| 6. **التسعير المرجعي**                                  | `Tags`                |
| 7. **الدراسة القانونية والتنظيمية**                      | `ShieldCheck`         |
| 8. **الدراسة الفنية والتشغيلية**                          | `Wrench`              |
| 9. **المنهج والبرنامج اليومي**                          | `CalendarClock`       |
| 10. **الهيكل البشري**                                  | `Users`               |
| 11. **الدراسة الاقتصادية والمالية (تقديرية)**          | `Calculator`          |
| 12. **إنشاء موقع وتطبيق**                              | `MonitorSmartphone`   |
| 13. **المخاطر والحلول**                                | `AlertTriangle`       |
| 14. **ملخص النموذج**                                    | `ClipboardList`       |
| 15. **أهم المؤشرات**                                    | `TrendingUp`          |
| 16. **النتائج الشهرية (سنة أولى – مختصر)**              | `Table`               |
| 17. **الملخص السنوي**                                  | `FileBarChart`        |
| 18. **الرسوم البيانية**                                 | `PieChart`            |
| 19. **خطة العمل التشغيلية...**                         | `MapPin`              |

---

## 4. Implementation Plan

1.  **Update `src/App.jsx`**:
    -   Replace the sections data array with the new 19-section structure.
    -   Implement scroll-spying logic to track the active section.
    -   Pass the active section state to the `Sidebar` component.

2.  **Update `src/App.css`**:
    -   Import and apply the `IBMPlexSansArabic` font from Google Fonts.
    -   Redesign the main layout to be A4-proportioned.
    -   Style each section as a clean, responsive card with soft shadows.
    -   Add a style rule for highlighting the active navigation link (e.g., `.active-link`).
    -   Add `@media print` styles to ensure a clean PDF export.

3.  **Enhance Navigation Components (`Navbar`, `Sidebar`)**:
    -   Ensure the `Sidebar` correctly highlights the active link based on the props received from `App.jsx`.
    -   Verify all smooth-scrolling links work with the new section IDs.

4.  **Final Review**:
    -   Test active link highlighting and smooth scrolling thoroughly.
    -   Confirm the A4 layout is responsive and does not have horizontal scroll on mobile.
    -   Check the print preview to ensure clean PDF export.
