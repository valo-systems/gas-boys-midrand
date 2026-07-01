#!/bin/bash
set -e
cd "$(dirname "$0")/web"

echo "▶ Building..."
npm run build

echo "▶ Staging all changes..."
cd ..
git add -A

echo "▶ Committing..."
git commit -m "feat: gas safety page, persist order store, fix track page reactivity

- Add /safety route: interactive LPG safety page with DO/DON'T flip
  cards (3D), 6-step smell-gas emergency protocol, 5-question safety
  quiz with score ring, monthly cylinder inspection checklist
- Wire Safety into Navbar (desktop + mobile) and Footer quick links
- Persist useOrderStore to localStorage (zustand persist middleware)
  so admin status changes survive page refreshes and cross-tab opens
- Fix TrackOrder selector: s.orders.find() instead of s.getByRef()
  for proper Zustand reactivity
- Fix 3 TS build errors: unused OrderStatus/QuoteStatus imports,
  Recharts Tooltip formatter ValueType"

echo "▶ Pushing..."
git push

echo ""
echo "✅ Done! All changes pushed."
