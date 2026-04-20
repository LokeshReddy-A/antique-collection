# Design System Documentation: The Digital Estate Curator

## 1. Overview & Creative North Star
**Creative North Star: "The Digital Estate Curator"**

This design system is not a standard e-commerce interface; it is a digital gallery designed to house history. We are moving away from the "grid of boxes" trope common in modern retail. Instead, we embrace a **High-End Editorial** approach that mirrors the experience of leafing through a rare, leather-bound auction catalog. 

The aesthetic is driven by **intentional asymmetry** and **tonal depth**. We break the template look by allowing high-resolution imagery to bleed off-center, utilizing overlapping typography, and employing a sophisticated hierarchy where content feels "curated" rather than "displayed." The goal is to evoke a sense of heritage, weight, and quiet extravagance.

---

## 2. Colors
Our palette is rooted in the materials of a Victorian library: deep mahogany woods, tarnished gold leaf, and aged parchment.

### The Palette
*   **Primary (#411001):** Our "Deep Mahogany." Used for high-impact brand moments and critical CTAs.
*   **Secondary (#7b5800):** Our "Antique Gold." Reserved for accents, highlights, and moments of royal flourish.
*   **Surface (#fdf9ef):** Our "Parchment." A warm, off-white base that provides a soft, organic feel compared to sterile digital white.

### The "No-Line" Rule
To maintain a premium, seamless feel, **1px solid borders are strictly prohibited for sectioning.** Structural boundaries must be defined through:
1.  **Background Shifts:** Transitioning from `surface` to `surface-container-low` to define different content zones.
2.  **Tonal Transitions:** Using subtle shifts in the parchment family to separate the header from the hero or the product grid from the footer.

### Glass & Gradient Rule
While the system is "Antique," it is not "Old." We use **Glassmorphism** to bridge the gap. Use semi-transparent versions of `surface-container` (at 80% opacity) with a `24px` backdrop blur for floating navigation bars or modal overlays. 
*   **Signature Gradient:** For primary action buttons or hero backgrounds, use a subtle radial gradient from `primary` (#411001) to `primary-container` (#5d2510) to give the mahogany a polished, three-dimensional "soul."

---

## 3. Typography
We utilize a high-contrast pairing of **Noto Serif** and **Manrope** to balance antique authority with modern legibility.

*   **Display & Headlines (Noto Serif):** These are our "Statement" styles. Use `display-lg` for hero titles with generous letter-spacing. This font conveys the "Royal" aspect—it is rhythmic, elegant, and carries the weight of history.
*   **Body & UI (Manrope):** To ensure the e-commerce experience remains functional, all utility text (prices, descriptions, labels) uses Manrope. It is a clean, geometric sans-serif that provides a necessary "modern lens" to view the antiques through.
*   **Hierarchy Note:** Always lead with Noto Serif for storytelling and transition to Manrope for the "transactional" phase of the user journey.

---

## 4. Elevation & Depth
In this design system, depth is a physical property of stacked materials, not a digital shadow effect.

*   **The Layering Principle:** Depth is achieved by stacking `surface-container` tiers. 
    *   *Example:* A product card (`surface-container-lowest`) sitting on a category section (`surface-container-low`) creates a natural, soft lift.
*   **Ambient Shadows:** If a floating element (like a "Quick Buy" fab) requires a shadow, it must be "Ambient." Use the `on-surface` color (#1c1c16) at 4% opacity with a blur radius of at least `32px`. It should feel like a soft glow of light rather than a harsh drop shadow.
*   **The "Ghost Border" Fallback:** For decorative elements or to subtly define a button, use the `outline-variant` (#d9c2ba) at **15% opacity**. This creates a "whisper" of a line that guides the eye without breaking the "No-Line" rule.

---

## 5. Components

### Buttons
*   **Primary:** `primary` background, `on-primary` text. No border. Use a slight `primary-container` gradient.
*   **Secondary (The Gold Standard):** `secondary` background with `on-secondary` text. Reserved for "Add to Collection" or high-value actions.
*   **Shape:** Use the `DEFAULT` roundedness (0.25rem). It is sharp enough to feel architectural but soft enough to be inviting.

### Input Fields
*   **Style:** Minimalist. No enclosing box. Use a bottom-only "Ghost Border" using `outline-variant`.
*   **Typography:** Labels use `label-md` (Manrope) in `on-surface-variant`. Input text uses `title-md` (Manrope).

### Cards
*   **Construction:** Forbid divider lines. Separate product imagery from product data using vertical white space (use the 32px or 48px spacing increments).
*   **Container:** Use `surface-container-low`. For a "hover" state, shift to `surface-container-high` and apply an ambient shadow.

### Signature Component: The "Ornate Frame"
To lean into the "Extravagant" request, certain high-end featured products should utilize an **Ornate Frame**. This is a decorative SVG border using `secondary-fixed` (#ffdea6) at low opacity, framing the product image with delicate filigree.

---

## 6. Do's and Don'ts

### Do:
*   **Embrace Asymmetry:** Place a `display-md` headline on the left and a product image slightly offset to the right, overlapping the text.
*   **Use Intentional White Space:** Luxury is defined by the "space between things." Don't crowd the parchment.
*   **Fluid Transitions:** All hover states should use a `cubic-bezier(0.4, 0, 0.2, 1)` transition over 400ms for a "graceful" feel.

### Don't:
*   **No Pure Black:** Never use #000000. Use `on-background` (#1c1c16) for text to maintain the soft, antique warmth.
*   **No Standard Grids:** Avoid the "3-column product grid" where possible. Try alternating 2-column and 1-column layouts to maintain an editorial flow.
*   **No High-Contrast Borders:** Never use a 100% opaque `outline`. It shatters the illusion of a tactile, parchment-based interface.

---

## 7. Interaction Patterns
*   **The "Reveal" Scroll:** As the user scrolls, elements should fade in and slide up by 20px, mimicking the unveiling of a curated collection.
*   **Micro-interactions:** When hovering over an "Antique Gold" element, it should subtly glow (using a small `secondary-container` box-shadow), suggesting a glint of light hitting gold leaf.