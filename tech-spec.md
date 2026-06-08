# Tech Spec — Build Your Home Interiors

## Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `react` | ^18.3.0 | UI framework |
| `react-dom` | ^18.3.0 | React DOM renderer |
| `gsap` | ^3.12.0 | Core animation engine — timelines, tweens, ScrollTrigger |
| `@studio-freight/lenis` | ^1.0.0 | Smooth scroll with inertia |
| `three` | ^0.160.0 | WebGL engine for RGB distortion shader |
| `@react-three/fiber` | ^8.15.0 | React renderer for Three.js |
| `@react-three/drei` | ^9.92.0 | Helpers: `useTexture`, `OrbitControls` (not needed) |
| `lucide-react` | ^0.400.0 | Icons: arrow, menu, x, instagram, phone, chevron |
| `tailwind-merge` | ^2.2.0 | Merge Tailwind classes (shadcn dep) |
| `clsx` | ^2.1.0 | Conditional class names (shadcn dep) |
| `class-variance-authority` | ^0.7.0 | Component variants (shadcn dep) |

**Note**: No shadcn/ui components are used — all UI is custom-built. The shadcn infrastructure (Tailwind theming, utils) comes from the init script.

**Dev dependencies** (auto-installed by init script): `typescript`, `vite`, `@vitejs/plugin-react`, `tailwindcss`, `postcss`, `autoprefixer`, `@types/react`, `@types/react-dom`, `@types/three`.

---

## Component Inventory

### Layout

| Component | Source | Notes |
|-----------|--------|-------|
| **Navigation** | Custom | Fixed bar, transparent→solid on scroll, mobile hamburger overlay |
| **Footer** | Custom | Fixed at bottom (z-index: 1), revealed by scroll |
| **WhatsAppButton** | Custom | Fixed bottom-right, green circle |
| **ScrollToTopButton** | Custom | Appears after 400px scroll |

### Sections

| Component | Source | Notes |
|-----------|--------|-------|
| **HeroGallery** | Custom | Fullscreen clip-path morph slider with GSAP timelines |
| **Services** | Custom | Architecture + Interior service cards with stagger entrance |
| **About** | Custom | Two-column asymmetric layout with slide-in entrance |
| **Process** | Custom | 2×3 grid of numbered step cards |
| **StoryCTA** | Custom | Parallax background image + two-column content |
| **Projects** | Custom | 3-column grid, each card hosts R3F canvas for RGB distortion |
| **Testimonials** | Custom | Two-column with carousel, auto-advance |
| **Blog** | Custom | 3-column blog cards grid |

### Reusable Components

| Component | Source | Used By |
|-----------|--------|---------|
| **PillBadge** | Custom | Services, About, Process, StoryCTA, Projects, Testimonials, Blog |
| **ServiceCard** | Custom | Services section (×7) |
| **ProcessCard** | Custom | Process section (×6) |
| **ProjectCard** | Custom | Projects section (×6) — wraps R3F canvas |
| **BlogCard** | Custom | Blog section (×3) |
| **TestimonialCarousel** | Custom | Testimonials section |
| **DistortionCanvas** | Custom | ProjectCard (×6) — R3F canvas + shader material |

### Hooks

| Hook | Purpose |
|------|---------|
| **useLenis** | Initialize Lenis, sync with GSAP ticker and ScrollTrigger |
| **useScrollReveal** | IntersectionObserver-based entrance animation trigger |

---

## Animation Implementation

| Animation | Library | Approach | Complexity |
|-----------|---------|----------|------------|
| Gallery Morph Slider (clip-path + scale wipe) | GSAP Timeline | Two absolutely-positioned layers swap roles. Timeline tweens `clipPath: inset()` + `scale` simultaneously. Text cross-fades synced to image transition. | **High** 🔒 |
| Hero entrance sequence | GSAP Timeline | Staggered timeline: bg fade+scale → tagline → headline clip-reveal → description → CTA | **High** 🔒 |
| RGB Distortion Hover | R3F + custom GLSL | Each card has own `<Canvas>` with `orthographic` camera. Fragment shader displaces UVs with sine waves, separates RGB channels by `uOffset`. `uIntensity` tweened via GSAP on pointer enter/leave. `uMouse` lerped each frame. `uTime` incremented per frame. | **High** 🔒 |
| Scroll Reveal Footer | CSS + GSAP ScrollTrigger | Footer `position: fixed; z-index: 1`. Main content `z-index: 2`. Blog section has `margin-bottom` = footer height. Footer content fades in via ScrollTrigger scrub over last 200px. | **Medium** |
| Section entrance reveals | GSAP + ScrollTrigger | Each section has a trigger at 80% viewport. Elements stagger in with translateY + opacity. One-shot (no re-trigger). | **Medium** |
| Nav background transition | ScrollTrigger | Toggle class or animate background-color + backdrop-filter after 100px scroll. | **Low** |
| Testimonial carousel | GSAP | Cross-fade + slide transition between quotes. Auto-advance timer reset on manual nav. | **Medium** |
| Story CTA parallax | GSAP ScrollTrigger | Background image translates at 0.3× scroll speed via scrub. | **Low** |
| Mobile menu overlay | GSAP Timeline | Full-screen overlay, links stagger in from bottom (50ms stagger), close reverses. | **Medium** |
| Card hover effects | CSS Transitions | translateY(-4px), box-shadow, border-color changes. Pure CSS, no JS needed. | **Low** |
| Nav link underline | CSS | `transform: scaleX(0→1)`, `transform-origin: left`. Pure CSS. | **Low** |
| Scroll-to-top button | CSS Transition | Opacity toggle based on scroll position. | **Low** |

---

## State & Logic

### Hero Gallery State Machine

The gallery slider manages transitions between 5 slides with overlapping GSAP timelines. Key decisions:

- **Two-layer swap system**: Two absolutely-positioned image containers (A and B) alternate as "current" and "next". After each transition, roles swap. This avoids z-index fighting and enables seamless overlapping animations.
- **Timeline must be killable**: If auto-advance fires during an active transition, the running timeline must be `.kill()`-ed before starting a new one to prevent state corruption.
- **Text sync is chained**: The text out-animation completes before the image transition starts, and text in-animation begins 200ms after the image transition starts. This is handled via GSAP timeline position parameters (`"<"`, `">"`).
- **Preloading**: All 5 hero images are preloaded in a `useEffect` before the first transition begins. A loading state gates the entrance animation.

### RGB Distortion — Performance Strategy

6 simultaneous R3F canvases is the primary performance concern:

- **Lazy initialization**: Use IntersectionObserver to mount `<Canvas>` components only when ProjectCards enter the viewport (within 200px buffer). Unmount when scrolled far out of view.
- **Shared renderer alternative** (fallback): If 6 contexts cause issues on target devices, switch to a single fullscreen `<Canvas>` with `@react-three/drei`'s `<View>` component for portal-based rendering. This routes all shader planes through one WebGL context.
- **Shader is intentionally lightweight**: Single texture sample (3x for RGB split), no complex lighting, no post-processing. The 32×32 plane geometry is sufficient for the wave displacement.

### Scroll Reveal Footer — Height Coordination

The footer is `position: fixed` and the Blog section needs `margin-bottom` equal to footer height:

- Measure footer height via `useRef` + `ResizeObserver` after initial render
- Store measured height in state, apply as `marginBottom` to Blog section wrapper
- On resize, re-measure and update
- Default to 500px before measurement to prevent layout flash

### Lenis ↔ GSAP Sync

Critical integration points:

- Lenis `scroll` event calls `ScrollTrigger.update()`
- GSAP ticker drives Lenis `raf(time * 1000)`
- `gsap.ticker.lagSmoothing(0)` disables GSAP's lag smoothing to prevent jumps
- Lenis instance stored in a React ref (not state) to avoid re-renders

---

## Other Key Decisions

### No Routing

Single-page site. All sections on one page with anchor links (`#services`, `#about`, etc.). Lenis `scrollTo` for smooth anchor navigation.

### Image Asset Strategy

- All images served as static assets in `public/images/`
- Hero images: 1920px wide (full-HD coverage)
- Project grid images: 800px wide
- Blog/About images: 1200px wide
- Service icons: SVG (generated as PNG with transparency)
- Use `loading="lazy"` on all non-hero images

### Responsive Breakpoints

| Breakpoint | Tailwind Prefix | Usage |
|------------|-----------------|-------|
| 640px | `sm:` | Minor adjustments |
| 768px | `md:` | Tablet — 2-col grids |
| 1024px | `lg:` | Desktop — full layouts, nav visible |
| 1280px | `xl:` | Large desktop — max content width |

### Font Loading

Inter from Google Fonts with `display=swap`. Preconnect hints in `index.html`:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```