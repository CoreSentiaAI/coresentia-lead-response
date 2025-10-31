# CoreSentia Style Guide

**Last Updated:** October 31, 2025

This document outlines the complete design system for CoreSentia, including colors, typography, spacing, components, and UI patterns.

---

## 🎨 Brand Identity

### Brand Positioning
- **Tagline:** "Stop talking about AI. Start closing with it."
- **Voice:** Direct, no-nonsense, helpful, Australian
- **Target:** Solo tradies, small service businesses (landscapers, cleaners, salons, mobile services)
- **Value Prop:** Never miss a lead - AI responds 24/7, books jobs automatically

---

## 🎨 Color Palette

### Primary Colors

**Brand Navy** - `#1E3A5F`
- Primary brand color
- Used for: Headers, navigation, text headings, primary sections
- Psychology: Trustworthy, professional, stable
- Usage: Headings, nav bar, CTA sections

**Brand Orange** - `#FF6B35`
- Accent/Action color
- Used for: CTAs, buttons, highlights, interactive elements
- Psychology: Energy, action, urgency
- Usage: Primary buttons, accents, "Get Started" CTAs

**Brand Sage** - `#8FBC8F`
- Secondary accent
- Used for: Checkmarks, positive indicators, subtle accents
- Psychology: Approachable, natural, calming
- Usage: Feature checkmarks, success states

### Text Colors

**Text Primary** - `#2D3436` (Dark Charcoal)
- Main body text
- High contrast for readability

**Text Secondary** - `rgba(45, 52, 54, 0.6)` (60% opacity)
- Supporting text, descriptions, metadata
- Lower hierarchy information

### Background Colors

**White** - `#FFFFFF`
- Primary background
- Clean, professional

**Gray-50** - Tailwind default
- Alternate section backgrounds
- Card backgrounds

**Gradient Navy-Blue**
- `from-brand-navy to-blue-900`
- Used for: Hero sections, CTA sections
- Creates depth and premium feel

---

## 📝 Typography

### Font Families

**Headings:** Montserrat (400-600 weight)
```css
font-family: 'Montserrat', sans-serif
letter-spacing: 0.15em
```
- All h1-h6 tags
- Strong, modern, professional
- Wide letter spacing for authority

**Body:** Open Sans (default)
```css
font-family: 'Open Sans', sans-serif
```
- Body text, paragraphs, UI elements
- Excellent readability
- Friendly, approachable

### Type Scale

**Hero/H1:**
- Mobile: `text-4xl` (36px)
- Tablet: `text-5xl` (48px)
- Desktop: `text-6xl` (60px)
- Large: `text-7xl` (72px)
- Usage: Homepage hero headline

**Section Headings/H2:**
- Mobile: `text-3xl` (30px)
- Desktop: `text-4xl` or `text-5xl` (36-48px)
- Usage: Major section titles

**Subsection/H3:**
- Mobile: `text-lg` (18px)
- Desktop: `text-xl` (20px)
- Usage: Card titles, feature headings

**Body Text:**
- Mobile: `text-sm` or `text-base` (14-16px)
- Desktop: `text-base` or `text-lg` (16-18px)

**Small Text:**
- `text-xs` (12px) - Metadata, disclaimers
- `text-sm` (14px) - Supporting info

---

## 📐 Spacing System

### Section Padding (Vertical)

**Full-Screen Sections:**
- `min-h-screen` - Hero, Problem, Solution, Workflow, Packages

**Standard Sections:**
- Mobile: `py-16` (64px top/bottom)
- Desktop: `py-16` to `py-20` (64-80px)

**Compact Sections:**
- Footer: `py-10` (40px)

### Container Widths

**Max Widths:**
- Small content: `max-w-4xl` (896px)
- Standard: `max-w-6xl` (1152px)
- Wide: `max-w-7xl` (1280px)

**Horizontal Padding:**
- Mobile: `px-4` (16px) - Tighter for more screen space
- Desktop: `px-6` (24px)

### Component Spacing

**Card Padding:**
- Standard: `p-8` (32px)
- Compact: `p-6` (24px)
- Mobile: `p-4` (16px)

**Element Gaps:**
- Tight: `gap-2` or `gap-3` (8-12px)
- Standard: `gap-4` (16px)
- Loose: `gap-6` or `gap-8` (24-32px)

**Margin Bottom (Between Elements):**
- Tight: `mb-2` to `mb-3` (8-12px)
- Standard: `mb-4` to `mb-6` (16-24px)
- Section spacing: `mb-8` to `mb-12` (32-48px)

---

## 🧩 Component Library

### Buttons

**Primary Button** (Orange CTA)
```jsx
className="btn-primary px-10 py-4 rounded-full font-semibold text-lg shadow-lg"
```
- Background: Brand Orange (#FF6B35)
- Hover: `scale(1.05)` + box-shadow
- Usage: Main CTAs, "Get Started"

**Secondary Button** (Navy)
```jsx
className="btn-secondary px-10 py-4 rounded-full font-semibold text-lg shadow-lg"
```
- Background: Brand Navy (#1E3A5F)
- Hover: `scale(1.05)` + box-shadow
- Usage: Secondary actions, "View Packages"

**Button Sizes:**
- Large: `px-10 py-4 text-lg` (Main CTAs)
- Standard: `px-8 py-3 text-base` (Standard actions)
- Small: `px-6 py-2 text-sm` (Inline actions)

**Border Radius:**
- Buttons: `rounded-full` (pill shape)
- Cards: `rounded-xl` or `rounded-2xl`
- Inputs: `rounded-lg`

### Cards

**Standard Card:**
```jsx
className="bg-white border-2 border-gray-200 rounded-2xl p-8 md:p-10
           hover:border-brand-orange transition-all shadow-lg"
```
- White background
- Gray border (hover: orange)
- Large border radius
- Drop shadow
- Hover transition

**Dark Card (Professional Package):**
```jsx
className="bg-gradient-to-br from-brand-navy to-blue-900
           border-2 border-brand-orange rounded-2xl p-10
           text-white shadow-2xl transform lg:scale-105"
```
- Navy gradient background
- Orange border
- White text
- Scaled up slightly on desktop

**Feature Card:**
```jsx
className="bg-gray-50 border border-gray-200 rounded-xl p-8 text-center"
```
- Light gray background
- Centered content
- Icon + heading + description

### Icons

**Icon Library:** Lucide React

**Icon Sizes:**
- Large: `w-12 h-12` (48px) - Section icons
- Standard: `w-10 h-10` (40px) - Feature icons
- Small: `w-5 h-5` (20px) - Checkmarks, inline icons

**Icon Colors:**
- Primary: `text-brand-orange`
- Success: `text-brand-sage`
- Navy context: `text-brand-orange` (for contrast)

### Forms (Onboarding)

**Input Fields:**
```jsx
className="w-full px-4 py-3 border border-gray-300 rounded-lg
           focus:ring-2 focus:ring-brand-orange focus:border-transparent"
```
- Full width
- Gray border
- Orange focus ring
- Rounded corners

**Radio Buttons (Package Selection):**
```jsx
className="flex items-start gap-3 p-4 border-2 border-gray-300 rounded-lg
           cursor-pointer hover:border-brand-orange transition-colors
           has-[:checked]:border-brand-orange has-[:checked]:bg-orange-50"
```
- Interactive hover state
- Orange highlight when selected
- Includes pricing and description

**Form Sections:**
```jsx
className="bg-gray-50 p-6 rounded-lg space-y-4"
```
- Light background
- Grouped related fields
- Clear visual separation

---

## 🎭 UI Patterns

### Scroll Snap Behavior

**Container:**
```jsx
className="snap-y snap-proximity overflow-y-auto h-screen scroll-smooth"
```
- Vertical scroll with proximity snap
- Smooth scrolling transitions
- Full viewport height

**Snap Sections:**
```jsx
className="min-h-screen w-full flex items-center snap-start"
```
- Full-screen major sections
- Vertically centered content
- Snap points for smooth transitions

### Header Behavior

**Fixed Header with Auto-Hide:**
- Fixed position at top
- Slides up when scrolling down (past 100px)
- Slides back down when scrolling up
- Smooth 300ms transition
- Backdrop blur effect

**Header States:**
- Top: `bg-brand-navy/95 backdrop-blur-sm`
- Scrolled: `bg-brand-navy/98 backdrop-blur-lg shadow-lg border-b border-brand-orange/30`
- Hidden: `-translate-y-full`

### Hover Effects

**Buttons:**
- Scale: `hover:scale-105`
- Box shadow: `hover:shadow-lg`
- Transform: `transition-all duration-300`

**Cards:**
- Border color change: `hover:border-brand-orange`
- Subtle lift: `hover:shadow-xl`

**Links:**
- Underline: `hover:border-brand-orange` (border-bottom)
- Color shift: `hover:text-brand-orange`

### Glass Effects

**Glassmorphism:**
```css
.glass {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
```
- Subtle, modern
- Used sparingly for premium feel

### Gradient Text

**Text Gradient:**
```css
.gradient-text {
  background: linear-gradient(90deg, var(--brand-navy) 0%, var(--brand-orange) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```
- Navy to Orange gradient
- Available but currently unused

---

## 📱 Responsive Behavior

### Breakpoints (Tailwind Defaults)

- **sm:** 640px
- **md:** 768px
- **lg:** 1024px
- **xl:** 1280px

### Mobile-First Approach

**Pattern:**
```jsx
className="text-sm md:text-base lg:text-lg"
```
- Base styles are mobile
- Add larger styles with breakpoints

**Grid Layouts:**
```jsx
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
```
- Single column on mobile
- Multi-column on larger screens
- Responsive gap sizing

**Spacing:**
- Mobile: Tighter spacing (px-4, py-16)
- Desktop: More generous (px-6, py-20)

**Text Sizing:**
- Mobile: Smaller but readable (text-sm to text-base)
- Desktop: Larger for impact (text-base to text-lg)

---

## 🎨 Current Design Strengths

1. **Clear Hierarchy:** Strong visual hierarchy with navy headings and orange CTAs
2. **Consistent Spacing:** Standardized padding and margins throughout
3. **Professional Feel:** Clean, minimal, trustworthy
4. **Mobile-Optimized:** Responsive design with mobile-first approach
5. **Accessible Colors:** Good contrast ratios for readability
6. **Action-Oriented:** Clear CTAs with strong visual weight

---

## 🤔 Areas for Potential Improvement

### Visual Elements
- Limited use of images/illustrations
- Could benefit from more visual interest in sections
- Gradient text available but unused

### Typography
- Letter spacing might be too wide (0.15em)
- Could explore font weight variations
- Limited use of font sizes for hierarchy

### Spacing
- Some sections might benefit from tighter/looser spacing
- Workflow section has complex nested containers

### Interactive Elements
- Hover effects are consistent but could be more dynamic
- Animation opportunities (currently only fade-in)
- Scroll effects beyond snap

### Color Usage
- Sage color is underutilized
- Could explore more gradient applications
- Background variations are minimal (white/gray-50)

### Component Variety
- Cards are similar throughout
- Could benefit from alternative layouts
- Limited icon usage variety

---

## 📸 Current Implementation

### Homepage Sections
1. **Hero** - Navy text + orange accent, full-screen, centered
2. **Problem** - 3-column grid, icon + heading + description
3. **Solution** - Navy gradient background, 4-column feature grid
4. **Workflow** - 3-step process with SMS examples and dashboard mockup
5. **Packages** - 2-column pricing cards (white + dark navy)
6. **How It Works** - 4-step numbered circles with descriptions
7. **Why CoreSentia** - 3-column benefit cards
8. **Social Proof** - 4-column stat display
9. **CTA** - Navy gradient, centered call-to-action
10. **Footer** - Navy background, 4-column link grid

### Other Pages
- **Onboarding Form** - 6 sections, clean form design, radio buttons for packages
- **Chat Interface** - Message bubbles, inline forms
- **Admin Dashboard** - Table view, conversation history

---

## 🚀 Technical Implementation

### CSS Framework
- **Tailwind CSS 3.3.3** - Utility-first framework
- **Custom theme extensions** in `tailwind.config.ts`
- **Global styles** in `app/globals.css`

### Fonts
- **Montserrat** - Loaded via Next.js font optimization
- **Open Sans** - Loaded via Next.js font optimization

### Icons
- **Lucide React** - Modern, consistent icon set
- SVG-based, customizable

---

## 📋 Design Checklist for Review

When reviewing the design, consider:

- [ ] Color balance and usage
- [ ] Typography hierarchy and readability
- [ ] Spacing consistency and rhythm
- [ ] Component variety and visual interest
- [ ] Animation and interaction opportunities
- [ ] Image and illustration integration
- [ ] Section layout variations
- [ ] Mobile experience optimization
- [ ] Loading states and transitions
- [ ] Accessibility and contrast
- [ ] Brand personality expression
- [ ] Call-to-action prominence
- [ ] Visual flow and user journey

---

## 🎯 Brand Goals

The design should communicate:
1. **Professional** - Trustworthy, legitimate business
2. **Modern** - AI-powered, cutting-edge technology
3. **Accessible** - Easy to understand, no jargon
4. **Action-Oriented** - Direct, get-things-done attitude
5. **Australian** - Local, relatable, authentic

---

**For Design Consultation:** Share this guide with designer/ChatGPT along with live URL (https://www.coresentia.com.au) for contextual feedback.
