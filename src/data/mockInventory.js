export const initialInventoryStats = {
  totalAssetsValue: 2850000,
  totalStockItems: 148,
  lowStockItemsCount: 6,
  registeredSuppliersCount: 24
};

export const initialInventoryItems = [
  {
    id: 'INV-101',
    name: 'A4 Printing Paper Reams (75 GSM)',
    category: 'Stationery',
    sku: 'STA-A4-75G',
    quantity: 14,
    minThreshold: 30, // Low stock!
    unit: 'Boxes',
    costPerUnit: 1250,
    supplier: 'Tamil Nadu Newsprint & Papers Ltd',
    location: 'Central Admin Store Rm 102',
    status: 'Low Stock'
  },
  {
    id: 'INV-102',
    name: 'Chemistry Titration Burette 50ml Borosil',
    category: 'Science Laboratory',
    sku: 'LAB-CHE-BUR50',
    quantity: 8,
    minThreshold: 20, // Low stock!
    unit: 'Pieces',
    costPerUnit: 480,
    supplier: 'Scientific Supplies & Glassware Chennai',
    location: 'Chemistry Lab Cabinet 3',
    status: 'Low Stock'
  },
  {
    id: 'INV-103',
    name: 'Football Cosco Tournament Size 5',
    category: 'Sports & Athletics',
    sku: 'SPT-FTB-COS5',
    quantity: 4,
    minThreshold: 15, // Low stock!
    unit: 'Units',
    costPerUnit: 950,
    supplier: 'Chennai Sports Mart, Wallajah Road',
    location: 'Sports Room Bay 1',
    status: 'Low Stock'
  },
  {
    id: 'INV-104',
    name: 'Whiteboard Dry Erase Markers (Assorted Colors)',
    category: 'Classroom Supplies',
    sku: 'CLS-WBM-AST',
    quantity: 85,
    minThreshold: 40,
    unit: 'Boxes (10 pk)',
    costPerUnit: 250,
    supplier: 'Camlin Stationery Depot',
    location: 'Stationery Store Rm 101',
    status: 'In Stock'
  },
  {
    id: 'INV-105',
    name: 'Student Science Record Notebooks (Ruled + Unruled)',
    category: 'Academic Books',
    sku: 'ACA-SCI-REC192',
    quantity: 340,
    minThreshold: 100,
    unit: 'Notebooks',
    costPerUnit: 65,
    supplier: 'Saravana Book Traders',
    location: 'Textbook Store Warehouse',
    status: 'In Stock'
  },
  {
    id: 'INV-106',
    name: 'Epson Interactive Projector Lamp Bulb',
    category: 'Smart Classroom IT',
    sku: 'IT-PRJ-EPS09',
    quantity: 2,
    minThreshold: 5, // Low stock!
    unit: 'Units',
    costPerUnit: 4800,
    supplier: 'Apex Infotech Solutions',
    location: 'Server Room IT Locker',
    status: 'Low Stock'
  }
];

export const initialSuppliers = [
  { id: 'SUP-01', name: 'Tamil Nadu Newsprint & Papers Ltd', contactPerson: 'Mr. Ramanathan', phone: '+91 94440 18273', category: 'Paper & Stationery' },
  { id: 'SUP-02', name: 'Scientific Supplies & Glassware Chennai', contactPerson: 'Mr. S. Gopal', phone: '+91 98401 92837', category: 'Laboratory Equipment' },
  { id: 'SUP-03', name: 'Chennai Sports Mart', contactPerson: 'Mr. M. Imran', phone: '+91 97910 88271', category: 'Sports Goods' },
  { id: 'SUP-04', name: 'Apex Infotech Solutions', contactPerson: 'Mrs. Rekha Jain', phone: '+91 98410 33921', category: 'IT & Smart Hardware' }
];
