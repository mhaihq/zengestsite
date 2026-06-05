# ZenGest Design System

## Colors

### Brand
| Token | Hex | Usage |
|---|---|---|
| Navy | `#00122F` | Primary text, buttons, headings |
| Blue | `#3B6FD4` | Accent, gradient start, checkmarks |
| Light Blue | `#A7BCF5` | Gradient end, soft accents |
| Teal | `#0D9488` | Eyebrow pills, success states |
| Dark Navy | `#1e2a3a` | Nav links, secondary text |

### Neutrals
| Token | Hex | Usage |
|---|---|---|
| White | `#FFFFFF` | Backgrounds, cards |
| Slate 50 | `#F8FAFC` | Section backgrounds |
| Slate 100 | `#F0F5FF` | Highlighted card bg (Clinical plan) |
| Slate 200 | `#e2e8f0` | Borders, dividers |
| Slate 400 | `#94a3b8` | Muted text, placeholders |
| Slate 500 | `#718096` | Body text, descriptions |

### Status
| Token | Hex | Usage |
|---|---|---|
| Green | `#1f9d62` | Success, generated states |
| Red | `#ef4444` | Error, recording pulse |
| Amber | various | Warning badges |

---

## Typography

### Fonts
```
Headings:  font-['Instrument_Serif']   — serif, tracking -0.025em
Body/UI:   font-['DM_Sans']            — sans-serif
```

### Scale
| Role | Class | Weight | Usage |
|---|---|---|---|
| Hero H1 | `text-4xl → text-7xl` | regular | Page hero titles |
| Section H2 | `text-4xl → text-6xl` | regular | Section headings |
| H3 | `text-3xl → text-4xl` | regular | Sub-sections |
| Body large | `text-base md:text-lg` | regular | Hero subheadlines |
| Body | `text-sm` | regular | Descriptions, card text |
| Label | `text-xs` | `font-semibold` uppercase tracking-widest | Eyebrow pills, section labels |
| Caption | `text-[10px]–text-[11px]` | medium | Dashboard UI, fine print |

### Gradient text
```css
background: linear-gradient(135deg, #3B6FD4 0%, #A7BCF5 100%);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;
```
Used on: key words in section headings (1–3 words max).

---

## Spacing

### Section padding
```
py-24 md:py-32 px-6    — standard sections
pt-20 pb-16 px-6       — hero / pricing top
pb-24                  — bottom of page sections
```

### Card padding
```
p-7                    — pricing cards
p-8 md:p-12            — story/about cards
p-5 md:p-8             — security grid cells
```

### Max widths
```
max-w-5xl   — main content grids
max-w-4xl   — hero headline
max-w-3xl   — two-column content
max-w-2xl   — body text / FAQ
max-w-xl    — centered paragraphs
```

---

## Buttons

### Primary
```tsx
h-12 px-8 rounded-xl font-['DM_Sans'] font-semibold text-sm
text-white bg-[#00122F]
hover:bg-[#00122F]/90 hover:scale-105 active:scale-95
transition-all duration-200 shadow-md
```

### Secondary (border)
```tsx
h-11 rounded-xl font-['DM_Sans'] font-semibold text-sm
border border-slate-200 text-[#00122F]
hover:bg-slate-50
```

### Ghost / link
```tsx
font-['DM_Sans'] text-sm text-slate-400
hover:text-[#00122F] transition-colors
```

---

## Pills & Badges

### Eyebrow pill (teal)
```tsx
inline-flex items-center rounded-full bg-[#0D9488]
px-4 py-1.5 text-xs font-semibold uppercase tracking-widest
text-white font-['DM_Sans']
```

### Neutral pill (white border)
```tsx
inline-flex items-center rounded-full border border-slate-200 bg-white
px-4 py-1.5 text-xs font-semibold text-slate-500 font-['DM_Sans']
```

### Frosted pill (hero top badge)
```tsx
inline-flex items-center gap-2 px-3 py-1.5 rounded-full
bg-white/80 backdrop-blur-sm border border-white/90 shadow-sm
```

### Trust badge (compliance)
```tsx
inline-flex items-center gap-2.5 bg-white/90 backdrop-blur-sm
border border-slate-200 rounded-xl px-4 py-3 shadow-md
```

---

## Border Radius
| Class | Usage |
|---|---|
| `rounded-full` | Pills, avatar circles, toggle buttons |
| `rounded-lg` | Primary CTA buttons |
| `rounded-xl` | Secondary buttons, trust badges, small cards |
| `rounded-2xl` | Dashboard cards, integration chips |
| `rounded-3xl` | Large feature cards, about/story sections |

---

## Shadows
| Class | Usage |
|---|---|
| `shadow-sm` | Subtle cards, frosted pills |
| `shadow-md` | Buttons, trust badges |
| `shadow-lg` | Highlighted pricing card (Clinical) |
| Custom inset | Dashboard cards: `0 1px 0 rgba(255,255,255,.6) inset, 0 0 0 1px rgba(0,18,47,.06), 0 8px 24px -8px rgba(0,18,47,.12), 0 28px 56px -20px rgba(0,18,47,.18)` |

---

## Gradients

### Hero background
```css
linear-gradient(160deg, #C8D9F0 0%, #D6E4F0 30%, #E8EEF5 55%, #EDE8DC 80%, #E8DFC8 100%)
```

### Text accent (blue)
```css
linear-gradient(135deg, #3B6FD4 0%, #A7BCF5 100%)
```

### Blue button shimmer (AI generation bar)
```css
linear-gradient(90deg, #A7BCF5 0%, #00122F 60%, #A7BCF5 100%)
```

---

## Icons
- Library: `lucide-react`
- Stroke width: `1.5` (UI icons), `2` (action icons)
- Size: `w-9 h-9` in security grid, inline at `10px–16px` in dashboard

---

## Check / Feature icon
```tsx
<div className="w-4 h-4 rounded-full bg-[#3B6FD4]/10 flex items-center justify-center shrink-0 mt-0.5">
  <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
    <path d="M2 5L4 7L8 3" stroke="#3B6FD4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
</div>
```

---

## Responsive breakpoints (Tailwind defaults)
| Token | Width |
|---|---|
| `sm` | 640px |
| `md` | 768px |
| `lg` | 1024px |
| `xl` | 1280px |
