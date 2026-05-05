# Advanced Scientific & Programmer Calculator

A high-performance, feature-rich power tool built with React, Vite, Tailwind CSS v4, `math.js`, and `recharts`. This progressive web application (PWA) goes beyond simple calculations to provide advanced modes and functions.

## Core Features & Upgrades

1. **Advanced Mathematical Engine** (`math.js`):
   - **Hyperbolic Functions**: `sinh`, `cosh`, `tanh`.
   - **Combinatorics**: Permutations (`nPr`) and Combinations (`nCr`).
   - **Extended Ops**: Factorial (`!`), Absolute value (`|x|`), Modulo (`mod`), and custom nth-root powers (`x√y`).
   - **Live Evaluation**: Expressions are evaluated and formatted dynamically.

2. **Dynamic UI/UX & Keyboard Mapping**:
   - **Glassmorphism**: Premium "Sleek Dark Mode" aesthetics.
   - **Keyboard Support**: Full numpad mapping. Type your expressions intuitively (`+`, `-`, `*`, `/`, `^`, `!`, `&`, `|`, etc.) and hit `Enter` to solve.
   - **Micro-Interactions**: Hover effects, active scaling, and focus states.

3. **Persistent Memory & History**:
   - **Memory Keys**: `M+`, `M-`, `MR`, and `MC` with a persistent UI indicator when memory is populated.
   - **History Sidebar**: Saves automatically to `LocalStorage`. Click any entry to instantly reuse it.

4. **Multi-Mode Operation**:
   - **Scientific Mode**: Standard trigonometric and advanced algebraic calculations.
   - **Programmer Mode**: Parallel dynamic rows displaying Binary (BIN), Hexadecimal (HEX), Decimal (DEC), and Octal (OCT) conversions. Includes bitwise logic operations (`AND`, `OR`, `XOR`, `NOT`, `<<`, `>>`).
   - **Graphing Module**: Collapsible visualization pane using `recharts` to plot custom functions (e.g., `f(x) = 2*x^2 + 5`). Lazy-loaded for optimal performance.

5. **PWA Integration**:
   - Web app is fully installable on desktop and mobile platforms via `vite-plugin-pwa`.
   - Works offline with a generated service worker and `manifest.json`.

## Technical Efficiency
- Logic and UI layers are robustly separated via a `useReducer` custom hook (`useCalculator.js`).
- Bundle sizes are minimized using Vite's tree-shaking and dynamic imports (`Suspense` + `lazy` for Graphing).

## Deployment & PWA Setup

### Building the App
```bash
npm install
npm run build
```
This prepares the `dist/` directory, minimizing the chunk sizes. The `vite-plugin-pwa` handles service worker generation automatically.

### Enabling Installability
1. **Host on HTTPS**: Deploy to any static provider (Vercel, GitHub Pages, Netlify).
2. **Device Installation**:
   - **Desktop**: Click the install icon in the URL bar (Chrome/Edge).
   - **Mobile**: Tap the browser menu and select "Add to Home Screen" or "Install App".

## Development Server
```bash
npm run dev
```
