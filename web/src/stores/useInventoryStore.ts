import { create } from 'zustand'

export interface Product {
  id: string
  name: string
  sku: string
  category: 'cylinders' | 'appliances' | 'cast-iron' | 'accessories' | 'heating'
  size?: number        // kg, for gas cylinders only
  price: number
  stockQty: number
  lowStockAt: number
  images: string[]
  description: string
  popular?: boolean
  brand: string
}

interface InventoryState {
  products: Product[]
  addProduct: (p: Omit<Product, 'id'>) => void
  updateProduct: (id: string, patch: Partial<Product>) => void
  deductStock: (id: string, qty: number) => void
  restockProduct: (id: string, qty: number) => void
  uploadImage: (id: string, base64: string) => void
  // computed helpers
  lowStockItems: () => Product[]
  byCategory: (cat: string) => Product[]
  getById: (id: string) => Product | undefined
}

const SEED: Product[] = [
  // ── Cylinders ──────────────────────────────────────────────────────────────
  { id: 'GAS-1KG',    sku: 'GAS-1KG',    category: 'cylinders',   size: 1,   name: '1 kg Gas Cylinder',                     brand: 'Gas Boys',  price: 41.50,   stockQty: 30, lowStockAt: 5,  popular: false, images: ['/gallery/Cylinder-Generic.png'],    description: 'Smallest cylinder. Great for camping, caravans and small appliances.' },
  { id: 'GAS-3KG',    sku: 'GAS-3KG',    category: 'cylinders',   size: 3,   name: '3 kg Gas Cylinder',                     brand: 'Gas Boys',  price: 124.50,  stockQty: 25, lowStockAt: 5,  popular: false, images: ['/gallery/Cylinder-3KG.png'],        description: 'Compact cylinder perfect for braais and small stoves.' },
  { id: 'GAS-4-5KG',  sku: 'GAS-4-5KG',  category: 'cylinders',   size: 4.5, name: '4.5 kg Gas Cylinder',                   brand: 'Gas Boys',  price: 186.75,  stockQty: 20, lowStockAt: 5,  popular: false, images: ['/gallery/Cylinder-Generic.png'],    description: 'Mid-compact size. Ideal for regular household use.' },
  { id: 'GAS-5KG',    sku: 'GAS-5KG',    category: 'cylinders',   size: 5,   name: '5 kg Gas Cylinder',                     brand: 'Gas Boys',  price: 207.50,  stockQty: 20, lowStockAt: 5,  popular: false, images: ['/gallery/Cylinder-5KG.png'],        description: 'Popular household size. Fits most standard stoves.' },
  { id: 'GAS-7KG',    sku: 'GAS-7KG',    category: 'cylinders',   size: 7,   name: '7 kg Gas Cylinder',                     brand: 'Gas Boys',  price: 290.50,  stockQty: 15, lowStockAt: 3,  popular: false, images: ['/gallery/Cylinder-Generic.png'],    description: 'Great middle-ground size for families and small businesses.' },
  { id: 'GAS-9KG',    sku: 'GAS-9KG',    category: 'cylinders',   size: 9,   name: '9 kg Gas Cylinder',                     brand: 'Gas Boys',  price: 373.50,  stockQty: 15, lowStockAt: 3,  popular: false, images: ['/gallery/Cylinder-9KG.png'],        description: 'Standard household cylinder. Suitable for small families and braais.' },
  { id: 'GAS-14KG',   sku: 'GAS-14KG',   category: 'cylinders',   size: 14,  name: '14 kg Gas Cylinder',                    brand: 'Gas Boys',  price: 582.00,  stockQty: 10, lowStockAt: 3,  popular: false, images: ['/gallery/Cylinder-Generic.png'],    description: 'Mid-size option. Ideal for medium households and B&Bs.' },
  { id: 'GAS-19KG',   sku: 'GAS-19KG',   category: 'cylinders',   size: 19,  name: '19 kg Gas Cylinder',                    brand: 'Gas Boys',  price: 788.50,  stockQty: 12, lowStockAt: 3,  popular: true,  images: ['/gallery/Cylinder-19KG.png'],       description: 'Most popular choice. Ideal for family homes and small businesses.' },
  { id: 'GAS-48KG',   sku: 'GAS-48KG',   category: 'cylinders',   size: 48,  name: '48 kg Commercial Cylinder',             brand: 'Gas Boys',  price: 1992.00, stockQty: 5,  lowStockAt: 2,  popular: false, images: ['/gallery/Cylinder-Generic.png'],    description: 'Commercial-grade cylinder for restaurants, factories and bulk users.' },
  // ── Burners & Stoves ───────────────────────────────────────────────────────
  { id: 'BURN-1-AUTO', sku: 'BURN-1-AUTO', category: 'appliances', name: '1 Burner Auto Stove',                    brand: 'Gas Boys',  price: 499.00,  stockQty: 8,  lowStockAt: 2,  popular: false, images: ['/gallery/1-Burner-Auto.jpg'],                                    description: 'Compact auto-ignition single burner. Perfect for camping or backup cooking.' },
  { id: 'BURN-2-AUTO', sku: 'BURN-2-AUTO', category: 'appliances', name: '2 Burner Auto Stove',                    brand: 'Gas Boys',  price: 699.00,  stockQty: 8,  lowStockAt: 2,  popular: true,  images: ['/gallery/2-Burner-Auto.jpg'],                                    description: 'Double burner with auto ignition. Great for home and outdoor use.' },
  { id: 'BURN-2-TBL',  sku: 'BURN-2-TBL',  category: 'appliances', name: '2 Burner Table (Black)',                 brand: 'Gas Boys',  price: 749.00,  stockQty: 6,  lowStockAt: 2,  popular: false, images: ['/gallery/2-Burner-BTable-folding-Legs-Black.jpg'],               description: 'Freestanding 2-burner braai table with folding legs. Powder-coated black finish.' },
  { id: 'BURN-3-TBL',  sku: 'BURN-3-TBL',  category: 'appliances', name: '3 Burner Table (Black)',                 brand: 'Gas Boys',  price: 899.00,  stockQty: 5,  lowStockAt: 2,  popular: false, images: ['/gallery/3-Burner-BTable-folding-Legs-Black-HD.jpg'],            description: 'Heavy-duty 3-burner table with folding legs. Ideal for catering and events.' },
  { id: 'BURN-4-TBL',  sku: 'BURN-4-TBL',  category: 'appliances', name: '4 Burner Table (Black)',                 brand: 'Gas Boys',  price: 1099.00, stockQty: 4,  lowStockAt: 2,  popular: false, images: ['/gallery/4-Burner-BTable-folding-Legs-Black-HD.jpg'],            description: '4-burner high-output table with folding legs. Built for serious cooking.' },
  { id: 'STOVE-4-OVEN',sku: 'STOVE-4-OVEN',category: 'appliances', name: '4 Plate Stove + Gas Oven',              brand: 'Gas Boys',  price: 2499.00, stockQty: 3,  lowStockAt: 1,  popular: false, images: ['/gallery/4-Plate-Stove-Incl-GasOven.jpg'],                       description: 'Full kitchen setup. 4 plate gas stove with built-in gas oven.' },
  { id: 'STOVE-5-OVEN',sku: 'STOVE-5-OVEN',category: 'appliances', name: '5 Plate Stove + Oven + Grill',          brand: 'Gas Boys',  price: 3299.00, stockQty: 2,  lowStockAt: 1,  popular: false, images: ['/gallery/5Plate-Incl-GasOven-Grill.jpg'],                        description: 'Premium 5-plate stove with gas oven and grill. Restaurant-quality.' },
  // ── Cast Iron ──────────────────────────────────────────────────────────────
  { id: 'RING-1',      sku: 'RING-1',      category: 'cast-iron',  name: 'Single Ring Burner',                     brand: 'Gas Boys',  price: 199.00,  stockQty: 12, lowStockAt: 3,  popular: false, images: ['/gallery/Single-Ring-Burner.jpg'],                                description: 'Heavy-duty single cast iron ring burner. High output for rapid boiling.' },
  { id: 'RING-2',      sku: 'RING-2',      category: 'cast-iron',  name: 'Double Ring Burner',                     brand: 'Gas Boys',  price: 349.00,  stockQty: 10, lowStockAt: 3,  popular: true,  images: ['/gallery/Double-Ring-Burner.jpg'],                                description: 'Twin ring high-pressure burner. Built for industrial and catering use.' },
  { id: 'RING-3',      sku: 'RING-3',      category: 'cast-iron',  name: 'Triple Ring Burner',                     brand: 'Gas Boys',  price: 499.00,  stockQty: 8,  lowStockAt: 2,  popular: false, images: ['/gallery/Triple-Ring-Burner.jpg'],                                description: 'Triple ring burner for maximum output. Ideal for large-batch cooking.' },
  { id: 'CI-TBL-1',    sku: 'CI-TBL-1',    category: 'cast-iron',  name: 'Single Cast Iron Boiling Table',         brand: 'Gas Boys',  price: 599.00,  stockQty: 6,  lowStockAt: 2,  popular: false, images: ['/gallery/Single-Cast-Iron-Boiling-Table.jpg'],                   description: 'Single burner cast iron boiling table. Sturdy and long-lasting.' },
  { id: 'CI-TBL-2',    sku: 'CI-TBL-2',    category: 'cast-iron',  name: 'Double Cast Iron Boiling Table',         brand: 'Gas Boys',  price: 899.00,  stockQty: 4,  lowStockAt: 2,  popular: false, images: ['/gallery/Double-Cast-Iron-Boiling-Table.jpg'],                   description: 'Double burner cast iron boiling table. A favourite for outdoor caterers.' },
  { id: 'CI-TBL-3',    sku: 'CI-TBL-3',    category: 'cast-iron',  name: 'Triple Cast Iron Boiling Table',         brand: 'Gas Boys',  price: 1199.00, stockQty: 3,  lowStockAt: 1,  popular: false, images: ['/gallery/Triple-Cast-Iron-Boiling-Table.jpg'],                   description: 'Triple burner cast iron table. Handles the biggest pots.' },
  // ── Accessories ────────────────────────────────────────────────────────────
  { id: 'ACC-TORCH',   sku: 'ACC-TORCH',   category: 'accessories', name: 'Blow Torch',                             brand: 'Gas Boys',  price: 149.00,  stockQty: 15, lowStockAt: 3,  popular: false, images: ['/gallery/Blow-Torch.jpg'],                                        description: 'Precision blow torch for brazing, soldering and gas installation work.' },
  { id: 'REG-BULL-1',  sku: 'REG-BULL-1',  category: 'accessories', name: 'Bullnose Regulator 1 kg/hr',            brand: 'Gas Boys',  price: 89.00,   stockQty: 20, lowStockAt: 5,  popular: false, images: ['/gallery/Bullnose-1kg-hr-.jpg'],                                  description: 'Standard bullnose regulator rated at 1 kg/hr. For household appliances.' },
  { id: 'REG-BULL-G',  sku: 'REG-BULL-G',  category: 'accessories', name: 'Bullnose Regulator + Pressure Gauge',   brand: 'Gas Boys',  price: 129.00,  stockQty: 15, lowStockAt: 3,  popular: false, images: ['/gallery/Bullnose-Regulator-with-pressure-gauge.jpg'],            description: 'Bullnose regulator with built-in pressure gauge for accurate flow monitoring.' },
  { id: 'ACC-PIGTAIL', sku: 'ACC-PIGTAIL', category: 'accessories', name: '500mm Liquid Pig Tail',                 brand: 'Gas Boys',  price: 79.00,   stockQty: 25, lowStockAt: 5,  popular: false, images: ['/gallery/500mm-Liquid-Pig-Tail.jpg'],                             description: '500mm flexible liquid pig tail connector for gas cylinder connections.' },
  { id: 'ACC-FITTINGS',sku: 'ACC-FITTINGS',category: 'accessories', name: 'Gas Fittings Set',                      brand: 'Gas Boys',  price: 59.00,   stockQty: 30, lowStockAt: 5,  popular: false, images: ['/gallery/Gas-Fittings.jpg'],                                      description: 'Assorted gas fittings for residential and commercial connections. SANS approved.' },
  // ── Heating ────────────────────────────────────────────────────────────────
  { id: 'HEAT-IR',     sku: 'HEAT-IR',     category: 'heating',    name: 'Infrared Heater',                        brand: 'Gas Boys',  price: 899.00,  stockQty: 5,  lowStockAt: 2,  popular: false, images: ['/gallery/Infrared-Heater.jpg'],                                   description: 'Energy-efficient infrared gas heater. Instant heat, no electricity required.' },
  { id: 'HEAT-PATIO',  sku: 'HEAT-PATIO',  category: 'heating',    name: 'Patio Heater',                           brand: 'Gas Boys',  price: 1299.00, stockQty: 4,  lowStockAt: 2,  popular: false, images: ['/gallery/Patio-Heater.jpg'],                                      description: 'Freestanding patio gas heater. Warms up to 20m². Perfect for outdoor entertaining.' },
]

export const useInventoryStore = create<InventoryState>((set, get) => ({
  products: SEED,

  addProduct: (p) => {
    const id = p.sku || `PROD-${Date.now()}`
    set(s => ({ products: [...s.products, { ...p, id }] }))
  },

  updateProduct: (id, patch) => {
    set(s => ({ products: s.products.map(p => p.id === id ? { ...p, ...patch } : p) }))
  },

  deductStock: (id, qty) => {
    set(s => ({
      products: s.products.map(p =>
        p.id === id ? { ...p, stockQty: Math.max(0, p.stockQty - qty) } : p
      )
    }))
  },

  restockProduct: (id, qty) => {
    set(s => ({ products: s.products.map(p => p.id === id ? { ...p, stockQty: p.stockQty + qty } : p) }))
  },

  uploadImage: (id, base64) => {
    set(s => ({
      products: s.products.map(p =>
        p.id === id ? { ...p, images: [base64, ...p.images] } : p
      )
    }))
  },

  lowStockItems: () => get().products.filter(p => p.stockQty <= p.lowStockAt),

  byCategory: (cat) => {
    const all = get().products
    return cat === 'all' ? all : all.filter(p => p.category === cat)
  },

  getById: (id) => get().products.find(p => p.id === id),
}))
