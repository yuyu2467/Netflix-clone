## 2024-07-25 - Missing Global Accessibility Styles

**Learning:** The application's CSS architecture lacks a global, reusable utility class for accessibility, specifically a `.visually-hidden` or `.sr-only` class. This prevents the implementation of accessible form labels and other components without either violating the "no new global CSS" rule or duplicating styles, which is inefficient.

**Action:** Propose the creation of a global `accessibility.css` stylesheet or the inclusion of a `.visually-hidden` class in `index.css`. This will unblock future accessibility improvements and ensure a consistent, maintainable approach to accessible design.
