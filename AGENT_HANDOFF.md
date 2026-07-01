# Gas Boys Midrand — Agent Handoff

> **For any AI agent picking this up:** Read this entire file before touching any code. It contains everything you need to continue without asking the user to repeat context. The user is Sibusiso (agency owner), building a stakeholder demo for a gas retail client.

---

## Project Summary

We are building a **full-stack demo website** for **The Gas Boys Midrand** (thegasboysmidrand.com) to pitch them on replacing their current site. The demo is a React app with in-memory Zustand state — no backend yet. If they say yes after the demo, we build a PHP 8.3 / Laravel 11 / MySQL backend on cPanel.

The demo needs to be convincing enough for stakeholders to say "yes" on the spot. Key selling points:
- Customer orders flow live into an admin portal
- Real product images and real prices from their actual price board
- Full inventory management with stock depletion
- Self-service admin — they can manage everything without calling a developer
- WhatsApp deeply integrated everywhere (how they currently operate)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + TypeScript + Vite |
| Routing | React Router v6 |
| Styling | Tailwind CSS v3 + custom design tokens |
| State | Zustand (in-memory, no API calls) |
| Icons | @phosphor-icons/react (Duotone/Fill weights) |
| Animations | Framer Motion |
| Charts | Recharts (admin dashboard) |
| Fonts | Bebas Neue (display) · Space Grotesk (headings) · Inter (body) |
| **Future backend** | PHP 8.3 + Laravel 11 + MySQL on cPanel |

---

## Design System

**Dark Industrial Gold theme:**

```css
--yellow: #FFD600   /* primary CTA */
--orange: #FF6B00   /* accent */
--bg:     #0A0A0A   /* page background */
--surface:#141414   /* section bg */
--card:   #1C1C1C   /* card bg */
--card2:  #242424   /* nested card */
--border: #2E2E2E
--text:   #FAFAFA
--muted:  #888888
--green:  #22C55E   /* success/stock */
--red:    #EF4444   /* error/low-stock */
```

**Note on logo:** Gas Boys' actual logo is blue + orange (flame/water-drop icon). Their transparent PNG works perfectly on the dark background. Use it — don't recreate it.

**Tailwind classes available:** `.btn-primary`, `.btn-secondary`, `.btn-ghost`, `.btn-whatsapp`, `.card`, `.glass`, `.input`, `.label`, `.section-label`, `.badge-yellow/green/orange/muted`, `.page-section` — all defined in `web/src/index.css`.

---

## Folder Structure

```
gas boys/                              ← workspace root
├── AGENT_HANDOFF.md                   ← YOU ARE HERE
├── docs/
│   ├── 01 - Current Site Audit.md
│   ├── 02 - New Website Proposal.docx
│   ├── 03 - Build Plan.docx
│   └── 04 - UI Design System.html     ← full design reference
├── the-gas-boys-website-assets/       ← REAL LOGO FILES
│   ├── gas-boys-logo-transparent-256.png   ← use in Navbar
│   ├── gas-boys-logo-transparent-512.png   ← use in Admin sidebar
│   ├── gas-boys-logo-transparent-1024.png
│   ├── gas-boys-logo-transparent-2048.png
│   ├── gas-boys-logo-white-512.png
│   ├── gas-boys-logo-white-1024.png
│   └── gas-boys-logo-white-master.jpg
├── gas-boys-gallery/                  ← 21 REAL PRODUCT IMAGES
│   ├── 1-Burner-Auto.jpg
│   ├── 2-Burner-Auto.jpg
│   ├── 2-Burner-BTable-folding-Legs-Black.jpg
│   ├── 3-Burner-BTable-folding-Legs-Black-HD.jpg
│   ├── 4-Burner-BTable-folding-Legs-Black-HD.jpg
│   ├── 4-Plate-Stove-Incl-GasOven.jpg
│   ├── 500mm-Liquid-Pig-Tail.jpg
│   ├── 5Plate-Incl-GasOven-Grill.jpg
│   ├── Blow-Torch.jpg
│   ├── Bullnose-1kg-hr-.jpg
│   ├── Bullnose-Regulator-with-pressure-gauge.jpg
│   ├── Double-Cast-Iron-Boiling-Table.jpg
│   ├── Double-Ring-Burner.jpg
│   ├── Full-Cylinder.jpg
│   ├── Gas-Fittings.jpg
│   ├── Infrared-Heater.jpg
│   ├── Patio-Heater.jpg
│   ├── Single-Cast-Iron-Boiling-Table.jpg
│   ├── Single-Ring-Burner.jpg
│   ├── Triple-Cast-Iron-Boiling-Table.jpg
│   └── Triple-Ring-Burner.jpg
└── web/                               ← REACT PROJECT ROOT
    ├── index.html
    ├── package.json
    ├── tsconfig.json
    ├── vite.config.ts
    ├── tailwind.config.js
    └── src/
        ├── App.tsx                    ← all routes defined here
        ├── main.tsx
        ├── index.css                  ← design tokens + component classes
        ├── data/
        │   └── mock.ts                ← ALL static data (prices WRONG — see Phase 1)
        ├── components/
        │   ├── Navbar.tsx             ← sticky glass navbar, mobile menu
        │   ├── Footer.tsx             ← 4-column footer
        │   └── ReviewsWidget.tsx      ← star ratings, review cards
        └── pages/
            ├── Home.tsx
            ├── Order.tsx              ← 3-step order flow
            ├── Services.tsx
            ├── Book.tsx               ← service booking
            ├── Shop.tsx               ← product grid + filter
            ├── Quote.tsx              ← B2B bulk quote
            ├── About.tsx
            ├── Contact.tsx
            └── Admin.tsx              ← BASIC — needs full rebuild in Phase 4
```

---

## Real Data (from client photos — use these, not mock.ts)

### Cylinder Prices (from price board photo)
| Size | Price |
|------|-------|
| 1 kg | R41.50 |
| 3 kg | R124.50 |
| 4.5 kg | R186.75 |
| 5 kg | R207.50 |
| 7 kg | R290.50 |
| 9 kg | R373.50 |
| 14 kg | R582.00 |
| 19 kg | R788.50 |
| 48 kg | R1,992.00 |

### Contact Info (confirmed from signage photo)
```
WhatsApp: 0640263510  (wa.me/27640263510)
Email:    sales@thegasboysmidrand.com   ← NOT info@, it's sales@
Phone:    011 468 1130
Address:  Cnr New Road & 13th Ave, Halfway House, Midrand
```

### Current mock.ts errors to fix
- All cylinder prices are wrong (were ORYX wholesale estimates ~R20.90/kg)
- Email is `info@thegasboysmidrand.com` — must be `sales@thegasboysmidrand.com`
- Navbar uses a `<Fire>` icon placeholder — must use real logo PNG

---

## Current App Routes (`web/src/App.tsx`)

```
/             → Home.tsx
/order        → Order.tsx
/services     → Services.tsx
/services/:id → Services.tsx (detail)
/book         → Book.tsx
/shop         → Shop.tsx
/quote        → Quote.tsx
/about        → About.tsx
/contact      → Contact.tsx
/admin        → Admin.tsx  (basic, needs full rebuild)
```

**Routes to ADD in Phase 3 & 4:**
```
/track        → TrackOrder.tsx   (customer order tracking, ?ref=GB-2026-XXXX)
/admin/dashboard
/admin/orders
/admin/orders/:id
/admin/inventory
/admin/inventory/add
/admin/bookings
/admin/quotes
/admin/customers
/admin/reports
/admin/settings
```

---

## State Architecture (Zustand — to be built in Phase 2)

Install: `npm install zustand` inside `web/`

Create folder: `web/src/stores/`

### Store contracts

**`useOrderStore.ts`**
```ts
interface Order {
  id: string
  ref: string              // e.g. "GB-2026-1024"
  items: { productId: string; name: string; size: number; qty: number; price: number }[]
  customer: { name: string; phone: string; address: string; email?: string }
  status: 'pending' | 'confirmed' | 'dispatched' | 'delivered' | 'cancelled'
  paymentStatus: 'unpaid' | 'partial' | 'paid'
  paymentMethod?: 'cash' | 'eft'
  amountPaid?: number
  notes: string[]
  total: number
  createdAt: Date
}

// Actions
addOrder(cart, customer) → string (returns ref)
updateStatus(id, status)
markPaid(id, amount, method)
addNote(id, note)
getByRef(ref) → Order | undefined

// Computed
pendingCount: number
todayRevenue: number
```

**`useInventoryStore.ts`**
```ts
interface Product {
  id: string
  name: string
  sku: string
  category: 'cylinders' | 'burners' | 'stoves' | 'cast-iron' | 'accessories' | 'heating'
  size?: number            // kg for gas cylinders
  price: number
  costPrice?: number
  stockQty: number
  lowStockAt: number       // alert threshold
  images: string[]         // e.g. ['/gallery/Full-Cylinder.jpg']
  description: string
  popular?: boolean
}

// Actions
addProduct(p)
updateProduct(id, patch)
deductStock(id, qty)       // called by orderStore.addOrder
restockProduct(id, qty)
uploadImage(id, base64)    // admin image upload

// Computed
lowStockItems: Product[]
byCategory(cat): Product[]
```

**`useBookingStore.ts`**
```ts
interface Booking {
  id: string
  ref: string
  serviceType: string
  customer: { name: string; phone: string; email?: string; address: string }
  date: string
  time: string
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  technicianName?: string
  notes?: string
  createdAt: Date
}
```

**`useQuoteStore.ts`**
```ts
interface Quote {
  id: string
  company: string
  contact: string
  phone: string
  email: string
  requirements: string
  status: 'new' | 'responded' | 'won' | 'lost'
  responseAmount?: number
  responseNotes?: string
  createdAt: Date
}
```

### Cross-store dependency
`orderStore.addOrder()` must call `inventoryStore.getState().deductStock(productId, qty)` for each item in the cart.

---

## Inventory Seed Data (use in Phase 2)

Seed `useInventoryStore` initial state with these products. All images reference files in `web/public/gallery/` (copy from `gas-boys-gallery/` in Phase 1).

### Gas Cylinders (category: 'cylinders')
| Name | SKU | Size | Price | Stock | Image |
|------|-----|------|-------|-------|-------|
| 1 kg Gas Refill | GAS-1KG | 1 | 41.50 | 30 | Full-Cylinder.jpg |
| 3 kg Gas Refill | GAS-3KG | 3 | 124.50 | 25 | Full-Cylinder.jpg |
| 4.5 kg Gas Refill | GAS-4-5KG | 4.5 | 186.75 | 20 | Full-Cylinder.jpg |
| 5 kg Gas Refill | GAS-5KG | 5 | 207.50 | 20 | Full-Cylinder.jpg |
| 7 kg Gas Refill | GAS-7KG | 7 | 290.50 | 15 | Full-Cylinder.jpg |
| 9 kg Gas Refill | GAS-9KG | 9 | 373.50 | 15 | Full-Cylinder.jpg |
| 14 kg Gas Refill | GAS-14KG | 14 | 582.00 | 10 | Full-Cylinder.jpg |
| 19 kg Gas Refill | GAS-19KG | 19 | 788.50 | 10 | Full-Cylinder.jpg |
| 48 kg Commercial | GAS-48KG | 48 | 1992.00 | 5 | Full-Cylinder.jpg |

### Burners & Stoves (category: 'burners' / 'stoves')
| Name | SKU | Price | Stock | Image |
|------|-----|-------|-------|-------|
| 1 Burner Auto Stove | BURN-1-AUTO | 499.00 | 8 | 1-Burner-Auto.jpg |
| 2 Burner Auto Stove | BURN-2-AUTO | 699.00 | 8 | 2-Burner-Auto.jpg |
| 2 Burner Table (Black) | BURN-2-TABLE | 749.00 | 6 | 2-Burner-BTable-folding-Legs-Black.jpg |
| 3 Burner Table (Black) | BURN-3-TABLE | 899.00 | 5 | 3-Burner-BTable-folding-Legs-Black-HD.jpg |
| 4 Burner Table (Black) | BURN-4-TABLE | 1099.00 | 4 | 4-Burner-BTable-folding-Legs-Black-HD.jpg |
| 4 Plate Stove + Oven | STOVE-4-OVEN | 2499.00 | 3 | 4-Plate-Stove-Incl-GasOven.jpg |
| 5 Plate Stove + Oven + Grill | STOVE-5-OVEN | 3299.00 | 2 | 5Plate-Incl-GasOven-Grill.jpg |

### Cast Iron & Ring Burners (category: 'cast-iron')
| Name | SKU | Price | Stock | Image |
|------|-----|-------|-------|-------|
| Single Ring Burner | RING-1 | 199.00 | 12 | Single-Ring-Burner.jpg |
| Double Ring Burner | RING-2 | 349.00 | 10 | Double-Ring-Burner.jpg |
| Triple Ring Burner | RING-3 | 499.00 | 8 | Triple-Ring-Burner.jpg |
| Single Cast Iron Table | CI-TABLE-1 | 599.00 | 6 | Single-Cast-Iron-Boiling-Table.jpg |
| Double Cast Iron Table | CI-TABLE-2 | 899.00 | 4 | Double-Cast-Iron-Boiling-Table.jpg |
| Triple Cast Iron Table | CI-TABLE-3 | 1199.00 | 3 | Triple-Cast-Iron-Boiling-Table.jpg |

### Accessories & Heating (category: 'accessories' / 'heating')
| Name | SKU | Price | Stock | Image |
|------|-----|-------|-------|-------|
| Blow Torch | ACC-TORCH | 149.00 | 15 | Blow-Torch.jpg |
| Bullnose Regulator 1kg/hr | REG-BULL-1 | 89.00 | 20 | Bullnose-1kg-hr-.jpg |
| Bullnose Regulator + Gauge | REG-BULL-G | 129.00 | 15 | Bullnose-Regulator-with-pressure-gauge.jpg |
| 500mm Liquid Pig Tail | ACC-PIGTAIL | 79.00 | 25 | 500mm-Liquid-Pig-Tail.jpg |
| Gas Fittings Set | ACC-FITTINGS | 59.00 | 30 | Gas-Fittings.jpg |
| Infrared Heater | HEAT-IR | 899.00 | 5 | Infrared-Heater.jpg |
| Patio Heater | HEAT-PATIO | 1299.00 | 4 | Patio-Heater.jpg |

---

## Admin Panel

### Login (for demo)
- Username: `admin`
- Password: `gas2026`
- Store session in `localStorage` key `gb_admin_session`
- Protect all `/admin/*` routes with an `AdminGuard` component that redirects to `/admin` if not authenticated

### Admin Sidebar Navigation
```
Dashboard      /admin/dashboard
Orders         /admin/orders     ← badge showing pending count
Inventory      /admin/inventory
Bookings       /admin/bookings
Quotes         /admin/quotes
——————
Customers      /admin/customers
Reports        /admin/reports
Settings       /admin/settings
——————
[View Site]    opens / in new tab
[Logout]
```

### Dashboard widgets
1. **Stats row:** Today's Orders · Today's Revenue · Pending Fulfillment · Low Stock Alert count
2. **Revenue bar chart** (Recharts `<BarChart>`) — last 7 days, bar color `#FFD600`
3. **Recent orders feed** — last 5 orders with status badge
4. **Low stock panel** — products where `stockQty <= lowStockAt`
5. **Upcoming bookings** — next 3 bookings

### Order status pipeline
```
pending → confirmed → dispatched → delivered
```
Admin can move forward one step at a time via button click. All status changes update `useOrderStore`. The customer's `/track` page reads the same store so status reflects live.

---

## 5 Build Phases

### Phase 1 — Data & Assets (~1 hr) ✅ STATUS: COMPLETE
Ground truth first. Everything the stakeholders will fact-check on the day.

- [x] Update all 9 cylinder prices in `web/src/data/mock.ts` to real prices (see table above)
- [x] Fix email to `sales@thegasboysmidrand.com` in `mock.ts` contactInfo
- [x] Copy all logo variants to `web/public/logo/`
- [x] Copy all 21 gallery images to `web/public/gallery/`
- [x] Update `web/src/components/Navbar.tsx`: real logo PNG (h-10), Fire icon removed
- [x] Update `web/src/components/Footer.tsx`: real logo PNG (h-12), Fire icon removed
- [x] Products array expanded from 10 → 24 products with real gallery images and real prices
- [x] Product categories updated: All / Cylinders / Appliances / Cast Iron / Accessories / Heating
- [ ] Update all WhatsApp links to use `wa.me/27640263510` — already correct in contactInfo, verify in page CTAs

### Phase 2 — State Layer + Seeded Inventory (~2 hrs) ✅ STATUS: COMPLETE

- [x] `cd web && npm install zustand`
- [x] `web/src/stores/useInventoryStore.ts` — 27 products seeded with real gallery images + real prices + stock levels
- [x] `web/src/stores/useOrderStore.ts` — 5 seed orders so admin dashboard looks live on first load
- [x] `web/src/stores/useBookingStore.ts` — 3 seed bookings
- [x] `web/src/stores/useQuoteStore.ts` — 3 seed quotes
- [x] `Order.tsx` — reads cylinders from inventoryStore, writes to orderStore, out-of-stock guard, qty capped to stock, /track link on confirmation
- [x] `Book.tsx` — writes to bookingStore, returns real ref
- [x] `Quote.tsx` — writes to quoteStore, returns real ref
- [x] `Shop.tsx` — reads live inventory, 6 category filters, stock badges, out-of-stock overlay, "Ask Us" WA fallback
- [x] Cross-store: `orderStore.addOrder()` calls `inventoryStore.deductStock()` for each item
- [x] TypeScript: zero errors

### Phase 3 — Order Flow + Customer Tracking (~2 hrs) ✅ STATUS: COMPLETE

- [x] Order confirmation built inline in `Order.tsx` step 4 — shows ref, summary, "Track Your Order" + WhatsApp links
- [x] Created `web/src/pages/TrackOrder.tsx` — reads `?ref=` from URL, pulls live order from `useOrderStore.getByRef()`, shows animated status stepper (Pending → Confirmed → Dispatched → Delivered)
- [x] Track page has: search form when no ref, "not found" state, cancellation state, live payment status, delivery details, WhatsApp CTA
- [x] Added `/track` route in `App.tsx`
- [x] Out-of-stock guard: done in Phase 2 (disabled card, orange LOW STOCK badge, WhatsApp fallback)
- [x] Ref generated in `useOrderStore.addOrder()` as `GB-YEAR-XXXX`
- [x] TypeScript: zero errors
- **Demo moment**: admin changes status → customer's /track page updates instantly (same Zustand store, both in same browser session across tabs)

### Phase 4 — Full Admin Panel (~4 hrs) ✅ STATUS: COMPLETE
Demo-ready after this phase. Self-service portal for Gas Boys team.

- [ ] Create `web/src/pages/admin/AdminLogin.tsx` — PIN login, stores session in localStorage
- [ ] Create `web/src/components/AdminGuard.tsx` — redirects to `/admin` if not authenticated
- [ ] Create `web/src/layouts/AdminLayout.tsx` — sidebar with nav, logo, logout
- [ ] Update `web/src/App.tsx` — nest all `/admin/*` routes under AdminLayout + AdminGuard
- [ ] `cd web && npm install recharts`
- [ ] Create `web/src/pages/admin/Dashboard.tsx` — stats, revenue chart, recent orders, low-stock, bookings
- [ ] Create `web/src/pages/admin/OrdersList.tsx` — filterable table, quick status badge
- [ ] Create `web/src/pages/admin/OrderDetail.tsx` — status stepper, payment, notes, WA button, print slip
- [ ] Create `web/src/pages/admin/InventoryGrid.tsx` — product cards with real images, stock, restock modal, inline price edit
- [ ] Create `web/src/pages/admin/AddProduct.tsx` — form with image upload (FileReader → base64 → store)
- [ ] Create `web/src/pages/admin/BookingsList.tsx` — list view, status management, tech assign
- [ ] Create `web/src/pages/admin/QuotesList.tsx` — respond form, won/lost tracking

### Phase 5 — Power Features + Polish (~1 hr) ✅ STATUS: COMPLETE
Enterprise feel. Run if time allows before the meeting.

- [ ] Create `web/src/pages/admin/Customers.tsx` — auto-built from order history, full spend per customer
- [ ] Create `web/src/pages/admin/Reports.tsx` — revenue by day/week, top products, cylinder size pie chart
- [ ] Create `web/src/pages/admin/Settings.tsx` — live-edit business info that reflects on front end via `useSettingsStore`
- [ ] Create `web/src/stores/useSettingsStore.ts` — business name, WA number, hours
- [ ] Add Framer Motion count-up animation to dashboard stat numbers
- [ ] Polish: loading skeletons on admin tables, empty states for zero data

---

## Demo Script (for Sibusiso to run in the meeting)

1. Open `http://localhost:5173` (customer site) on one screen, `http://localhost:5173/admin` on another
2. Log in to admin: `admin / gas2026`
3. On customer site, order a **19 kg cylinder** — show the stakeholder the real price R788.50
4. Point to admin — the order appears live, no reload
5. Click Confirm → Dispatched on admin
6. Open `/track?ref=GB-2026-XXXX` on a phone — show status updated
7. Go to Inventory — set 9 kg stock to 2, make two orders, show it goes out of stock
8. Restock from admin — customer can order again
9. Admin → Inventory → Add Product — upload a photo from phone, set price, save — it appears in Shop
10. Show Dashboard — revenue bar is live from demo orders
11. Close line: "You manage everything yourself. No developer calls."

---

## Known Issues / Gotchas

- **tailwind v3**: The project uses `tailwindcss@3`. Do not upgrade to v4 — the CLI interface changed completely. If `npx tailwindcss` fails, run `node node_modules/tailwindcss/lib/cli.js` instead.
- **npm install**: May timeout. Use `npm install --prefer-offline` if first attempt hangs.
- **No backend**: Everything is in-memory. Refreshing the page resets all orders/bookings. This is expected for the demo — seed the store with mock data so the admin looks populated on first load.
- **Logo colours**: Their logo is blue + orange, our theme is dark + yellow. This contrast is intentional and looks premium. Don't change the theme to match the logo.
- **Prices**: Current `mock.ts` has wrong prices (ORYX wholesale ~R20.90/kg). Real prices are Gas Boys retail (R41.50/kg effective). Always use the table above.

---

## Production Roadmap (after they sign)

| Phase | Work | Stack |
|-------|------|-------|
| 1 | Migrate Zustand stores to API calls | Axios + TanStack Query |
| 2 | Laravel 11 REST API | PHP 8.3 + MySQL |
| 3 | Authentication | Laravel Sanctum |
| 4 | File uploads | Laravel Storage + cPanel |
| 5 | Google Reviews | Places API → Laravel cron → MySQL cache |
| 6 | Deploy | cPanel + subdomain for admin |

Each Zustand store action becomes a one-line swap: `set(...)` → `axios.post('/api/...')`. Component code does not change.

---

*Last updated: 2026-07-02 · Phases completed: 5 of 5 · Demo ready ✅*
