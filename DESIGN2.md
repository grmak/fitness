---
name: Proactive Studio Management
colors:
  surface: '#f9f9f9'
  surface-dim: '#dadada'
  surface-bright: '#f9f9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f3'
  surface-container: '#eeeeee'
  surface-container-high: '#e8e8e8'
  surface-container-highest: '#e2e2e2'
  on-surface: '#1a1c1c'
  on-surface-variant: '#40493d'
  inverse-surface: '#2f3131'
  inverse-on-surface: '#f1f1f1'
  outline: '#707a6c'
  outline-variant: '#bfcaba'
  surface-tint: '#1b6d24'
  primary: '#0d631b'
  on-primary: '#ffffff'
  primary-container: '#2e7d32'
  on-primary-container: '#cbffc2'
  inverse-primary: '#88d982'
  secondary: '#785900'
  on-secondary: '#ffffff'
  secondary-container: '#fdc003'
  on-secondary-container: '#6c5000'
  tertiary: '#ac0c18'
  on-tertiary: '#ffffff'
  tertiary-container: '#d02d2d'
  on-tertiary-container: '#ffedeb'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#a3f69c'
  primary-fixed-dim: '#88d982'
  on-primary-fixed: '#002204'
  on-primary-fixed-variant: '#005312'
  secondary-fixed: '#ffdf9e'
  secondary-fixed-dim: '#fabd00'
  on-secondary-fixed: '#261a00'
  on-secondary-fixed-variant: '#5b4300'
  tertiary-fixed: '#ffdad6'
  tertiary-fixed-dim: '#ffb3ac'
  on-tertiary-fixed: '#410003'
  on-tertiary-fixed-variant: '#930010'
  background: '#f9f9f9'
  on-background: '#1a1c1c'
  surface-variant: '#e2e2e2'
typography:
  kpi-display:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  title-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  title-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-reg:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-caps:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  safe-area-margin: 16px
  gutter: 12px
---

## Brand & Style
The design system is anchored in a **Corporate / Modern** aesthetic, specifically tailored for the high-energy yet disciplined environment of boutique fitness studios. The personality is proactive and efficient, focusing on reducing cognitive load for busy studio owners who manage schedules on the move. 

The interface leverages a "Clean Professional" style: a minimalist white-label foundation that allows the "Healthy Green" to signal growth and completion. It prioritizes clarity over decoration, ensuring that every tap is intentional and every piece of data is actionable. The emotional response is one of calm control and operational readiness.

## Colors
This design system utilizes a high-clarity functional palette. 
- **Healthy Green (#2E7D32)**: Used for primary actions, success states, and positive growth trends.
- **Alert Amber (#FFC107)**: Reserved for proactive warnings, such as low-capacity classes or expiring memberships.
- **Critical Red (#D32F2F)**: Dedicated to immediate issues like declined payments or cancellations.
- **Neutral Palette**: A pure **White (#FFFFFF)** base for maximum readability, supported by **Light Gray (#F5F5F5)** for structural grounding and surface differentiation.

## Typography
The typography system uses **Plus Jakarta Sans** to maintain a modern, energetic, and legible atmosphere. 
- **KPIs**: Bold, large-scale weights are used for performance metrics (e.g., "Daily Revenue" or "Active Members") to ensure they are the first thing a user sees.
- **Titles**: Semibold weights provide clear hierarchy for section headers and card titles.
- **Body**: Standardized at 14px for optimal density on mobile screens, ensuring that lists and schedules remain compact yet readable.

## Layout & Spacing
The layout follows a **fluid grid** model optimized for mobile touch targets. 
- **Margins**: A consistent 16px lateral margin ensures content does not crowd the edges of the device.
- **Rhythm**: An 8px-based grid governs vertical spacing, though 12px is used for internal card padding to align with the border radius.
- **Hierarchy**: Proactive insights are placed at the top of the scroll view, with secondary management tools nested in cards below.

## Elevation & Depth
Depth is communicated through **ambient shadows** and **tonal layering**. 
- **Primary Surfaces**: Use a flat white background.
- **Cards**: Feature a soft, diffused shadow (Offset: 0, 4px; Blur: 12px; Opacity: 0.05; Color: Black) to appear slightly lifted, signaling interactivity.
- **Sticky Elements**: Navigation bars and "Add" buttons use a slightly higher elevation to remain persistent over scrolling content.
- **Background**: The Light Gray (#F5F5F5) is used as a canvas to make the white cards "pop" and feel organized.

## Shapes
The shape language is "Rounded" and friendly. 
- **Cards & Containers**: All containers utilize a signature **12px border radius**, striking a balance between professional precision and the approachable nature of fitness/wellness.
- **Interactive Elements**: Buttons and input fields maintain this radius to create a cohesive visual language.
- **Buttons**: Minimum height is strictly **44px** to exceed standard touch-target guidelines, ensuring ease of use during active studio environments.

## Components
- **Buttons**: Primary buttons are solid "Healthy Green" with white text. Secondary buttons use a subtle gray stroke. All buttons are 44px high.
- **Cards**: The primary vehicle for information. They include 12px padding and soft shadows. Cards are used for class schedules, student profiles, and financial summaries.
- **KPI Chips**: Small, high-contrast badges used within cards to show status (e.g., "Full," "3 Spots Left," "Paid").
- **Status Indicators**: Use the Alert Amber and Critical Red for "Attention Needed" states, often paired with a small icon.
- **Input Fields**: Outlined with 1px Light Gray, becoming Healthy Green on focus. Labels are 12px bold caps for clarity.
- **List Items**: Clean, edge-to-edge separators within cards for managing student rosters or equipment lists.
- **Actionable Insights**: A specialized "Proactive Card" that appears at the top of the dashboard with an Amber or Green accent border to suggest immediate tasks (e.g., "Approve 3 waitlist requests").