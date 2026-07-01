#!/bin/bash
set -e
ROOT="$(cd "$(dirname "$0")" && pwd)"
WEB="$ROOT/web"

echo "▶ Removing dead source files..."

# Vite starter leftovers — never used
rm -f "$WEB/src/App.css"
rm -f "$WEB/src/assets/cylinder.png"
rm -f "$WEB/src/assets/hero.png"
rm -f "$WEB/src/assets/react.svg"
rm -f "$WEB/src/assets/vite.svg"
rmdir "$WEB/src/assets" 2>/dev/null || true

# Old prototype admin page + standalone guard — replaced by admin/ panel
rm -f "$WEB/src/components/AdminGuard.tsx"
rm -f "$WEB/src/pages/Admin.tsx"

echo "▶ Removing stray public/ files..."
rm -f "$WEB/public/cylinder.png"   # orphaned, not referenced anywhere
rm -f "$WEB/public/favicon.svg"    # replaced by PNG favicons
rm -f "$WEB/public/icons.svg"      # not referenced anywhere

echo "▶ Removing root junk..."

# Original hash-named photos — already copied+renamed to web/public/gallery/
rm -f "$ROOT/62a6894f5533da5fa1aef9500b09bbc58f10ace8af0e5d4d69ade669ab2b8d73.png"
rm -f "$ROOT/cda802c1d0c3649c84f0d6c2bda0fcf1daeffe154b176bfdfb2498f15f00ac27.png"
rm -f "$ROOT/d8f59b5aa11f945f57a45e36a64de4726420fbb3263a082818dab5b8e986b704.png"
rm -f "$ROOT/5b86bc1d64cfab673f3f54fa4198ceebeda3e784057991b0cbc50d47a1035e94.png"
rm -f "$ROOT/9a89a79ac9a40de76a470aaeea81fce67286522278ee86f3fbbbc269f5638c34.png"

# Stray root image
rm -f "$ROOT/gas-boys.png"

# Original gallery folder — contents now live in web/public/gallery/
rm -rf "$ROOT/gas-boys-gallery"

# Source asset dump — contents now in web/public/logo/
rm -rf "$ROOT/the-gas-boys-website-assets"

# Early logo scratchpad — superseded by web/public/logo/
rm -rf "$ROOT/assets"

# This script itself
rm -f "$ROOT/build-and-push.command"

echo "▶ Building..."
cd "$WEB"
npm run build

echo "▶ Staging..."
cd "$ROOT"
git add -A

echo "▶ Committing..."
git commit -m "chore: repo cleanup + rebuild dist

Removed:
- web/src/App.css, src/assets/* (Vite defaults, never used)
- web/src/components/AdminGuard.tsx (replaced by inline guard in App.tsx)
- web/src/pages/Admin.tsx (replaced by full admin/ panel)
- web/public/cylinder.png, favicon.svg, icons.svg (orphaned / replaced)
- Root: 5 hash-named original PNGs (already in web/public/gallery/)
- Root: gas-boys.png, gas-boys-gallery/, the-gas-boys-website-assets/, assets/

Photos in web/public/gallery/ all correctly named:
  Cylinder-3KG.png, Cylinder-5KG.png, Cylinder-9KG.png,
  Cylinder-19KG.png, Cylinder-Generic.png + all accessory images"

echo "▶ Pushing..."
git push

echo ""
echo "✅ Repo cleaned, built, and pushed."

# Remove self
rm -f "$ROOT/cleanup-and-push.command"
