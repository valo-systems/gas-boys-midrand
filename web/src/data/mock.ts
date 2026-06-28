// ─── Cylinders / Pricing ───────────────────────────────────────────────────
export const cylinders = [
  { size: 3,   unit: 'kg', price: 62.70,  pricePerKg: 20.90, popular: false, type: 'Refill' },
  { size: 4.5, unit: 'kg', price: 90.10,  pricePerKg: 20.90, popular: false, type: 'Refill' },
  { size: 5,   unit: 'kg', price: 104.50, pricePerKg: 20.90, popular: false, type: 'Refill' },
  { size: 6,   unit: 'kg', price: 125.40, pricePerKg: 20.90, popular: false, type: 'Refill' },
  { size: 7,   unit: 'kg', price: 140.30, pricePerKg: 20.90, popular: false, type: 'Refill' },
  { size: 9,   unit: 'kg', price: 180.00, pricePerKg: 20.90, popular: false, type: 'Refill' },
  { size: 14,  unit: 'kg', price: 292.60, pricePerKg: 20.90, popular: false, type: 'Refill' },
  { size: 19,  unit: 'kg', price: 395.00, pricePerKg: 20.90, popular: true,  type: 'Refill' },
  { size: 48,  unit: 'kg', price: 970.00, pricePerKg: 20.90, popular: false, type: 'Refill — Commercial' },
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
const IMG = {
  cylinder: '/src/assets/cylinder.png',
  single:   'https://images.unsplash.com/photo-1743612828221-7bdc71a8107a?w=400&h=300&fit=crop&auto=format',
  double:   'https://images.unsplash.com/photo-1563729527945-2cc08fee1613?w=400&h=300&fit=crop&auto=format',
  regulator:'https://images.unsplash.com/photo-1510467181625-c419e443bdfa?w=400&h=300&fit=crop&auto=format',
  hose:     'https://images.unsplash.com/photo-1568124344138-7e165785e13a?w=400&h=300&fit=crop&auto=format',
}

export const products = [
  { id: 1, category: 'cylinders', name: '9 kg Gas Cylinder Refill', brand: 'ORYX Gas', price: 180.00, inStock: true, popular: false, description: 'Standard household cylinder. Suitable for small families, caravans and braais.', image: IMG.cylinder },
  { id: 2, category: 'cylinders', name: '19 kg Gas Cylinder Refill', brand: 'ORYX Gas', price: 395.00, inStock: true, popular: true, description: 'Most popular choice. Ideal for family homes and small businesses.', image: IMG.cylinder },
  { id: 3, category: 'cylinders', name: '48 kg Gas Cylinder Refill', brand: 'ORYX Gas', price: 970.00, inStock: true, popular: false, description: 'Commercial-grade cylinder for restaurants, factories and bulk users.', image: IMG.cylinder },
  { id: 4, category: 'cylinders', name: '14 kg Gas Cylinder Refill', brand: 'ORYX Gas', price: 292.60, inStock: true, popular: false, description: 'Mid-size option ideal for medium households and B&Bs.', image: IMG.cylinder },
  { id: 5, category: 'appliances', name: 'Single Burner Gas Stove', brand: 'Cadac', price: 549.00, inStock: true, popular: false, description: 'Compact single burner stove. Ideal for camping or backup cooking.', image: IMG.single },
  { id: 6, category: 'appliances', name: 'Double Burner Gas Stove', brand: 'Totai', price: 890.00, inStock: true, popular: true, description: 'Freestanding double burner with ignition. Stainless steel finish.', image: IMG.double },
  { id: 7, category: 'regulators', name: 'Low Pressure Regulator', brand: 'Flogas', price: 145.00, inStock: true, popular: false, description: 'Standard 1.5 kPa regulator for household use. SANS approved.', image: IMG.regulator },
  { id: 8, category: 'regulators', name: 'High Pressure Regulator', brand: 'Flogas', price: 210.00, inStock: true, popular: false, description: '28 kPa regulator for commercial appliances and heaters.', image: IMG.regulator },
  { id: 9, category: 'accessories', name: 'Gas Hose 1.5m', brand: 'Generic', price: 89.00, inStock: true, popular: false, description: 'SANS-approved rubber hose with fittings for indoor connections.', image: IMG.hose },
  { id: 10, category: 'accessories', name: 'Gas Hose Clamps (2-pack)', brand: 'Generic', price: 25.00, inStock: true, popular: false, description: 'Stainless steel hose clamps. Essential for safe hose connections.', image: IMG.hose },
]

export const productCategories = ['All', 'Cylinders', 'Appliances', 'Regulators', 'Accessories']

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
  email: 'info@thegasboysmidrand.com',
  hours: 'Monday – Friday: 8:00am – 5:00pm',
  saturday: 'Saturday: By appointment',
  sunday: 'Sunday: Closed',
  mapUrl: 'https://maps.google.com/?q=218+Whisken+Road,+Crowthorne,+Midrand',
  whatsapp: '27640263510',
}
