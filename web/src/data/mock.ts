// ─── Cylinders / Pricing ───────────────────────────────────────────────────
// Prices from Gas Boys price board (July 2026)
export const cylinders = [
  { size: 1,   unit: 'kg', price: 41.50,   pricePerKg: 41.50, popular: false, type: 'Refill' },
  { size: 3,   unit: 'kg', price: 124.50,  pricePerKg: 41.50, popular: false, type: 'Refill' },
  { size: 4.5, unit: 'kg', price: 186.75,  pricePerKg: 41.50, popular: false, type: 'Refill' },
  { size: 5,   unit: 'kg', price: 207.50,  pricePerKg: 41.50, popular: false, type: 'Refill' },
  { size: 7,   unit: 'kg', price: 290.50,  pricePerKg: 41.50, popular: false, type: 'Refill' },
  { size: 9,   unit: 'kg', price: 373.50,  pricePerKg: 41.50, popular: false, type: 'Refill' },
  { size: 14,  unit: 'kg', price: 582.00,  pricePerKg: 41.57, popular: false, type: 'Refill' },
  { size: 19,  unit: 'kg', price: 788.50,  pricePerKg: 41.50, popular: true,  type: 'Refill' },
  { size: 48,  unit: 'kg', price: 1992.00, pricePerKg: 41.50, popular: false, type: 'Refill — Commercial' },
]

// ─── Services ──────────────────────────────────────────────────────────────
export const services = [
  {
    id: 'deliveries',
    icon: 'Truck',
    title: 'Gas Deliveries',
    tagline: 'Door-to-door or drive-through',
    description: 'We deliver all cylinder sizes directly to your home or business across Midrand and surrounding areas. Need it fast? Drive-through collection available same day.',
    features: ['All cylinder sizes — 3kg to 48kg', 'Drive-through at our Crowthorne depot', 'Same-day delivery available', 'Pay on delivery — cash or EFT', 'ORYX gas direct from refinery'],
    cta: 'Order Now',
    ctaLink: '/order',
  },
  {
    id: 'repairs',
    icon: 'Wrench',
    title: 'Gas Repairs',
    tagline: 'Qualified technicians, fast response',
    description: 'From leaking regulators to faulty appliance connections, our certified technicians diagnose and repair gas systems on-site across the Midrand area.',
    features: ['Regulator repairs and replacements', 'Gas appliance fault finding', 'Pipe and fitting repairs', 'Leak detection and testing', 'Emergency call-outs available'],
    cta: 'Book a Repair',
    ctaLink: '/book',
  },
  {
    id: 'installations',
    icon: 'Gear',
    title: 'Installations',
    tagline: 'Residential, commercial & industrial',
    description: 'Full gas installation services compliant with SANS 10087 and local authority requirements. We handle everything from planning to inspection sign-off.',
    features: ['Kitchen and braai installations', 'Commercial catering setups', 'Industrial bulk supply installations', 'Full SANS 10087 compliance', 'Authority approval handling'],
    cta: 'Get a Quote',
    ctaLink: '/quote',
  },
  {
    id: 'coc',
    icon: 'SealCheck',
    title: 'CoC Certificate',
    tagline: 'Compliance certificates & inspections',
    description: "A Certificate of Compliance is required by law for all gas installations. Our qualified inspectors issue SAQCC Gas-registered certificates for residential and commercial properties.",
    features: ['SAQCC Gas registered inspectors', 'Residential and commercial CoC', 'Annual safety inspections', 'Required for property transfers', 'Same-day certificate for simple installs'],
    cta: 'Book Inspection',
    ctaLink: '/book',
  },
]

// ─── Products / Shop ───────────────────────────────────────────────────────
// Images sourced from gas-boys-gallery/ (copied to public/gallery/)
export const products = [
  // Cylinders
  { id: 1,  category: 'cylinders',   name: '9 kg Gas Cylinder Refill',            brand: 'ORYX Gas',    price: 373.50,  inStock: true,  popular: false, description: 'Standard household cylinder. Ideal for small families, caravans and braais.',         image: '/gallery/Full-Cylinder.jpg' },
  { id: 2,  category: 'cylinders',   name: '19 kg Gas Cylinder Refill',           brand: 'ORYX Gas',    price: 788.50,  inStock: true,  popular: true,  description: 'Most popular choice. Ideal for family homes and small businesses.',                   image: '/gallery/Full-Cylinder.jpg' },
  { id: 3,  category: 'cylinders',   name: '48 kg Gas Cylinder Refill',           brand: 'ORYX Gas',    price: 1992.00, inStock: true,  popular: false, description: 'Commercial-grade cylinder for restaurants, factories and bulk users.',                 image: '/gallery/Full-Cylinder.jpg' },
  { id: 4,  category: 'cylinders',   name: '14 kg Gas Cylinder Refill',           brand: 'ORYX Gas',    price: 582.00,  inStock: true,  popular: false, description: 'Mid-size option. Great for medium households and B&Bs.',                              image: '/gallery/Full-Cylinder.jpg' },
  // Burners & Stoves
  { id: 5,  category: 'appliances',  name: '1 Burner Auto Stove',                 brand: 'Gas Boys',    price: 499.00,  inStock: true,  popular: false, description: 'Compact auto-ignition single burner. Perfect for camping or backup cooking.',         image: '/gallery/1-Burner-Auto.jpg' },
  { id: 6,  category: 'appliances',  name: '2 Burner Auto Stove',                 brand: 'Gas Boys',    price: 699.00,  inStock: true,  popular: true,  description: 'Double burner with auto ignition. Great for home and outdoor use.',                   image: '/gallery/2-Burner-Auto.jpg' },
  { id: 7,  category: 'appliances',  name: '2 Burner Table (Black)',              brand: 'Gas Boys',    price: 749.00,  inStock: true,  popular: false, description: 'Freestanding 2-burner braai table with folding legs. Powder-coated black finish.',    image: '/gallery/2-Burner-BTable-folding-Legs-Black.jpg' },
  { id: 8,  category: 'appliances',  name: '3 Burner Table (Black)',              brand: 'Gas Boys',    price: 899.00,  inStock: true,  popular: false, description: 'Heavy-duty 3-burner table with folding legs. Ideal for catering and events.',         image: '/gallery/3-Burner-BTable-folding-Legs-Black-HD.jpg' },
  { id: 9,  category: 'appliances',  name: '4 Burner Table (Black)',              brand: 'Gas Boys',    price: 1099.00, inStock: true,  popular: false, description: '4-burner high-output table with folding legs. Built for serious cooking.',             image: '/gallery/4-Burner-BTable-folding-Legs-Black-HD.jpg' },
  { id: 10, category: 'appliances',  name: '4 Plate Stove + Gas Oven',            brand: 'Gas Boys',    price: 2499.00, inStock: true,  popular: false, description: 'Full kitchen setup. 4 plate gas stove with built-in gas oven.',                       image: '/gallery/4-Plate-Stove-Incl-GasOven.jpg' },
  { id: 11, category: 'appliances',  name: '5 Plate Stove + Oven + Grill',        brand: 'Gas Boys',    price: 3299.00, inStock: true,  popular: false, description: 'Premium 5-plate stove with gas oven and grill. Restaurant-quality.',                  image: '/gallery/5Plate-Incl-GasOven-Grill.jpg' },
  // Cast Iron
  { id: 12, category: 'cast-iron',   name: 'Single Ring Burner',                  brand: 'Gas Boys',    price: 199.00,  inStock: true,  popular: false, description: 'Heavy-duty single cast iron ring burner. High output for rapid boiling.',             image: '/gallery/Single-Ring-Burner.jpg' },
  { id: 13, category: 'cast-iron',   name: 'Double Ring Burner',                  brand: 'Gas Boys',    price: 349.00,  inStock: true,  popular: true,  description: 'Twin ring high-pressure burner. Built for industrial and catering use.',             image: '/gallery/Double-Ring-Burner.jpg' },
  { id: 14, category: 'cast-iron',   name: 'Triple Ring Burner',                  brand: 'Gas Boys',    price: 499.00,  inStock: true,  popular: false, description: 'Triple ring burner for maximum output. Ideal for large-batch cooking.',              image: '/gallery/Triple-Ring-Burner.jpg' },
  { id: 15, category: 'cast-iron',   name: 'Single Cast Iron Boiling Table',      brand: 'Gas Boys',    price: 599.00,  inStock: true,  popular: false, description: 'Single burner cast iron boiling table. Sturdy and long-lasting.',                    image: '/gallery/Single-Cast-Iron-Boiling-Table.jpg' },
  { id: 16, category: 'cast-iron',   name: 'Double Cast Iron Boiling Table',      brand: 'Gas Boys',    price: 899.00,  inStock: true,  popular: false, description: 'Double burner cast iron boiling table. A favourite for outdoor caterers.',           image: '/gallery/Double-Cast-Iron-Boiling-Table.jpg' },
  { id: 17, category: 'cast-iron',   name: 'Triple Cast Iron Boiling Table',      brand: 'Gas Boys',    price: 1199.00, inStock: true,  popular: false, description: 'Triple burner cast iron table. Handles the biggest pots.',                           image: '/gallery/Triple-Cast-Iron-Boiling-Table.jpg' },
  // Accessories
  { id: 18, category: 'accessories', name: 'Blow Torch',                          brand: 'Gas Boys',    price: 149.00,  inStock: true,  popular: false, description: 'Precision blow torch for brazing, soldering and gas installation work.',              image: '/gallery/Blow-Torch.jpg' },
  { id: 19, category: 'accessories', name: 'Bullnose Regulator 1 kg/hr',          brand: 'Gas Boys',    price: 89.00,   inStock: true,  popular: false, description: 'Standard bullnose regulator rated at 1 kg/hr. For household appliances.',            image: '/gallery/Bullnose-1kg-hr-.jpg' },
  { id: 20, category: 'accessories', name: 'Bullnose Regulator + Pressure Gauge', brand: 'Gas Boys',    price: 129.00,  inStock: true,  popular: false, description: 'Bullnose regulator with built-in pressure gauge for accurate flow monitoring.',      image: '/gallery/Bullnose-Regulator-with-pressure-gauge.jpg' },
  { id: 21, category: 'accessories', name: '500mm Liquid Pig Tail',               brand: 'Gas Boys',    price: 79.00,   inStock: true,  popular: false, description: '500mm flexible liquid pig tail connector for gas cylinder connections.',             image: '/gallery/500mm-Liquid-Pig-Tail.jpg' },
  { id: 22, category: 'accessories', name: 'Gas Fittings Set',                    brand: 'Gas Boys',    price: 59.00,   inStock: true,  popular: false, description: 'Assorted gas fittings for residential and commercial connections. SANS approved.',   image: '/gallery/Gas-Fittings.jpg' },
  // Heating
  { id: 23, category: 'heating',     name: 'Infrared Heater',                     brand: 'Gas Boys',    price: 899.00,  inStock: true,  popular: false, description: 'Energy-efficient infrared gas heater. Instant heat, no electricity required.',       image: '/gallery/Infrared-Heater.jpg' },
  { id: 24, category: 'heating',     name: 'Patio Heater',                        brand: 'Gas Boys',    price: 1299.00, inStock: true,  popular: false, description: 'Freestanding patio gas heater. Warms up to 20m². Perfect for outdoor entertaining.', image: '/gallery/Patio-Heater.jpg' },
]

export const productCategories = ['All', 'Cylinders', 'Appliances', 'Cast Iron', 'Accessories', 'Heating']

// ─── Reviews ───────────────────────────────────────────────────────────────
export const reviews = [
  { id: 1, author: 'Lebo Morake', rating: 5, text: 'Professionalism is under the statement, from enquiries to installation. Assisted by the lady called Tsaki, she was so effective and efficient, the technicians are so clean, no cleanups after their job. Thank you to the Gas Boys Midrand team. Keep up the great service.', timeAgo: '2 days ago' },
  { id: 2, author: 'Boca AK', rating: 5, text: 'This is the best gas refill place in Midrand — friendly staff, quick services and they are hands on. Keep the momentum Gas Boys!', timeAgo: '10 months ago' },
  { id: 3, author: 'Esido Mushwana', rating: 5, text: 'Excellent service by Tsakani and her colleague. I bought a pigtail pipe and they came to install at my house. Their prices are very good. This is my place to be for any gas related services.', timeAgo: '8 months ago' },
  { id: 4, author: 'Avi Ramdhin', rating: 5, text: 'Called the office on a Thursday morning and by 6pm I had my gas delivered. Great service and really customer centric. Well done and keep it up!', timeAgo: '3 years ago' },
  { id: 5, author: 'Tyrell Govender', rating: 5, text: 'Efficient service and went the extra mile to stay open after hours to refill.', timeAgo: '9 months ago' },
  { id: 6, author: 'Michelle Naicker', rating: 5, text: 'Very efficient, reliable and professional service. Robert and his team are very helpful and giving good customer service with great advice.', timeAgo: '3 years ago' },
]

export const overallRating = { average: 4.0, total: 139 }

// ─── Admin mock data ────────────────────────────────────────────────────────
export const adminOrders = [
  { id: 1024, customer: 'Sandra Mokoena', phone: '082 456 7890', cylinder: '19 kg', qty: 1, total: 395, address: '12 Crowthorne Ave, Midrand', status: 'en_route', time: '10:32' },
  { id: 1023, customer: 'Sipho Khumalo', phone: '073 123 4567', cylinder: '48 kg', qty: 1, total: 970, address: '5 Kyalami Blvd, Kyalami', status: 'delivered', time: '09:15' },
  { id: 1022, customer: 'Anele Dlamini', phone: '064 987 6543', cylinder: '9 kg', qty: 2, total: 360, address: '33 Whisken Rd, Crowthorne', status: 'pending', time: '11:05' },
  { id: 1021, customer: 'Marco van Zyl', phone: '083 222 3344', cylinder: '19 kg', qty: 2, total: 790, address: '7 Carlswald Rd, Carlswald', status: 'delivered', time: '08:40' },
  { id: 1020, customer: 'Fatima Ahmed', phone: '071 556 7788', cylinder: '14 kg', qty: 1, total: 292.60, address: '22 Halfway Gardens, Midrand', status: 'delivered', time: '08:10' },
]

export const adminBookings = [
  { id: 'B-089', customer: 'Ryan Pretorius', service: 'Gas Repair', date: '2026-06-27', time: 'Morning (8–12)', phone: '072 334 4556', address: '45 Vorna Valley Rd', status: 'confirmed' },
  { id: 'B-088', customer: 'Thandi Nkosi', service: 'CoC Certificate', date: '2026-06-27', time: 'Afternoon (12–5)', phone: '060 112 3344', address: '8 Midrand Ext 5', status: 'pending' },
  { id: 'B-087', customer: 'James Liu', service: 'Installation', date: '2026-06-28', time: 'Morning (8–12)', phone: '084 998 7766', address: '19 Corporate Park, Midrand', status: 'confirmed' },
]

export const adminQuotes = [
  { id: 'Q-034', company: 'Bella Cucina Restaurant', contact: 'Maria S.', phone: '011 234 5678', volume: '200 kg/month', status: 'in_review', submitted: '2026-06-25' },
  { id: 'Q-033', company: 'Midrand Factory Park', contact: 'George T.', phone: '082 777 8899', volume: '1 ton/month', status: 'new', submitted: '2026-06-26' },
  { id: 'Q-032', company: 'Sunridge B&B', contact: 'Lisa M.', phone: '073 445 6677', volume: '50 kg/month', status: 'sent', submitted: '2026-06-23' },
]

// ─── Credentials / About ──────────────────────────────────────────────────
export const credentials = [
  { icon: 'SealCheck', title: 'LPG Safety Association', body: 'Certified member. All cylinders inspected and approved to SANS standards.' },
  { icon: 'Clipboard', title: 'SANS 10087 Compliant', body: 'Every installation and repair follows SANS 10087 safety codes without exception.' },
  { icon: 'Truck', title: 'Direct from Refineries', body: 'ORYX Gas purchased directly from refineries — zero middlemen, better pricing.' },
  { icon: 'Users', title: 'All Market Segments', body: 'Serving residential, commercial and industrial clients across Gauteng.' },
  { icon: 'Storefront', title: 'Drive-Through Depot', body: '218 Whisken Road, Crowthorne. Quick in-and-out cylinder collection.' },
  { icon: 'Wrench', title: 'Qualified Technicians', body: 'SAQCC Gas-registered technicians trained on fire dept and authority regulations.' },
]

// ─── Contact info ──────────────────────────────────────────────────────────
export const contactInfo = {
  address: '218 Whisken Road, Crowthorne, Midrand, 1686',
  phone1: '011 468 1130',
  phone2: '064 026 3510',
  email: 'sales@thegasboysmidrand.com',
  hours: 'Monday – Friday: 8:00am – 5:00pm',
  saturday: 'Saturday: By appointment',
  sunday: 'Sunday: Closed',
  mapUrl: 'https://maps.google.com/?q=218+Whisken+Road,+Crowthorne,+Midrand',
  whatsapp: '27640263510',
}
