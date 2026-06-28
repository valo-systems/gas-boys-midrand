
```
████████╗██╗  ██╗███████╗     ██████╗  █████╗ ███████╗    ██████╗  ██████╗ ██╗   ██╗███████╗
╚══██╔══╝██║  ██║██╔════╝    ██╔════╝ ██╔══██╗██╔════╝    ██╔══██╗██╔═══██╗╚██╗ ██╔╝██╔════╝
   ██║   ███████║█████╗      ██║  ███╗███████║███████╗    ██████╔╝██║   ██║ ╚████╔╝ ███████╗
   ██║   ██╔══██║██╔══╝      ██║   ██║██╔══██║╚════██║    ██╔══██╗██║   ██║  ╚██╔╝  ╚════██║
   ██║   ██║  ██║███████╗    ╚██████╔╝██║  ██║███████║    ██████╔╝╚██████╔╝   ██║   ███████║
   ╚═╝   ╚═╝  ╚═╝╚══════╝     ╚═════╝ ╚═╝  ╚═╝╚══════╝    ╚═════╝  ╚═════╝   ╚═╝   ╚══════╝
                                                              MIDRAND  ·  LPG PLATFORM DEMO
```

---

> **A full-stack demo built to pitch a real client.**  
> Every page is a working feature. Every design decision is backed by their 139 Google reviews.

---

## What This Is

The Gas Boys Midrand is an established LPG supplier in Crowthorne, Midrand. This is a **sales demo** — a production-quality web platform built to show them what their digital presence could look like, and how it directly addresses the operational pain points their customers keep writing about.

The pitch is inside the app. Navigate to `/pitch` to see the full breakdown.

---

## Pages

| Route | Purpose |
|---|---|
| `/` | Hero, services overview, how it works, WhatsApp CTA, reviews |
| `/order` | 3-step order flow — size → details → confirm → success with order reference |
| `/services` | All four service categories with deep-dive pages |
| `/shop` | Product catalogue — cylinders, appliances, regulators, accessories |
| `/book` | Service booking form — repairs, installations, CoC |
| `/quote` | Bulk/commercial quote request |
| `/about` | Credentials, certifications, team |
| `/contact` | Contact details, map, enquiry form |
| `/admin` | Internal dashboard — orders, bookings, quotes |
| `/pitch` | The pitch — pain points from real reviews, mapped to platform features |

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | React 19 + TypeScript |
| Build | Vite 8 |
| Styling | Tailwind CSS 3 + custom design tokens |
| Routing | React Router DOM 7 |
| Icons | Phosphor Icons |
| Animation | Framer Motion |
| Font | Bebas Neue (display) · Space Grotesk (heading) · Inter (body) |

---

## Running Locally

```bash
cd web
npm install
npm run dev
```

Opens at **http://localhost:5173**

```bash
npm run build   # Production build
npm run lint    # Lint with oxlint
```

---

## Pain Points This Platform Solves

Sourced from 28 one-star Google reviews across 139 total. Four complaints repeat:

```
01  UNDERFILLING ────────── 8 reviews · Cylinders weighed short at home
02  DELIVERY FAILURES ───── 8 reviews · Paid, waited days, no delivery
03  COMMUNICATION BLACKOUT ─ 5 reviews · Phones ring out, emails ignored  
04  FRONTLINE GATEKEEPING ── 3 reviews · Staff dismissing orders without exploring options
```

The platform addresses each one. See `/pitch` for the full breakdown with real quotes.

---

## Project Structure

```
gas boys/
├── web/
│   ├── src/
│   │   ├── pages/          # One file per route
│   │   ├── components/     # Navbar, Footer, ReviewsWidget
│   │   ├── data/
│   │   │   └── mock.ts     # All products, reviews, services, pricing
│   │   ├── assets/         # cylinder.png and other static assets
│   │   └── index.css       # Design tokens + Tailwind component classes
│   ├── public/
│   └── vite.config.ts
├── docs/
│   └── The_Gas_Boys_Midrand_reviews.csv   # Source data for pitch
└── assets/
```

---

## Design System

```
Background  #0A0A0A    Surface    #141414
Card        #1C1C1C    Border     #2E2E2E
Yellow      #FFD600    Orange     #FF6B00
Green       #22C55E    Red        #EF4444
Text        #FAFAFA    Muted      #888888
```

Fonts: **Bebas Neue** for all display headings · **Space Grotesk** for UI labels · **Inter** for body copy.

---

## What's Not Built Yet

This is a frontend demo. The following are next steps if the client says yes:

- **Backend API** — orders, bookings and quotes persisted to a database
- **WhatsApp API** — automated order confirmation to customer and driver
- **Admin auth** — login-protected dashboard with live order management
- **Domain + hosting** — production deployment on custom domain

---

## Status

> `DEMO` — Frontend only. No orders are real. No data is stored.  
> Built for pitch purposes. All reviews quoted are real Google reviews.

---

*218 Whisken Road, Crowthorne, Midrand · SAQCC Gas Registered · ORYX Gas Supplier*
