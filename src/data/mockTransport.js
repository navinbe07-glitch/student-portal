export const initialTransportStats = {
  totalBuses: 14,
  activeRoutes: 12,
  studentsUsingTransport: 640,
  driversCount: 16
};

export const initialBuses = [
  {
    id: 'BUS-01',
    busNumber: 'Bus 01',
    vehicleNumber: 'TN-01-AB-4021',
    model: 'Ashok Leyland Falcon 42-Seater',
    driver: 'Mr. P. Subramani',
    driverPhone: '+91 98408 11223',
    attendant: 'Mrs. V. Selvi',
    route: 'Route 1 - T. Nagar & Kodambakkam',
    capacity: 42,
    studentsAssigned: 40,
    speedKmH: 28,
    status: 'In Transit',
    currentLocation: 'Near Panagal Park, North Usman Road',
    stops: ['T. Nagar Bus Terminus', 'Panagal Park', 'Kodambakkam Bridge', 'Power House', 'School Campus']
  },
  {
    id: 'BUS-02',
    busNumber: 'Bus 02',
    vehicleNumber: 'TN-01-AB-4022',
    model: 'Tata Starbus 48-Seater',
    driver: 'Mr. M. Devaraj',
    driverPhone: '+91 98408 22334',
    attendant: 'Mrs. K. Mangalam',
    route: 'Route 2 - Kilpauk & Chetpet',
    capacity: 48,
    studentsAssigned: 46,
    speedKmH: 0,
    status: 'Idle at Campus',
    currentLocation: 'School Transport Yard Bay 2',
    stops: ['Kellys Corner', 'Kilpauk Water Works', 'Chetpet Signal', 'School Campus']
  },
  {
    id: 'BUS-03',
    busNumber: 'Bus 03', // Arun Kumar's Bus!
    vehicleNumber: 'TN-01-AB-4023',
    model: 'Eicher Skyline Pro 40-Seater',
    driver: 'Mr. C. Arumugam',
    driverPhone: '+91 98407 12349',
    attendant: 'Mrs. M. Saraswathi',
    route: 'Route 3 - Anna Nagar & Shenoy Nagar',
    capacity: 40,
    studentsAssigned: 39,
    speedKmH: 34,
    status: 'In Transit',
    currentLocation: 'Roundtana Junction, 2nd Avenue',
    stops: ['Shanthi Colony', 'Roundtana Junction', 'Shenoy Nagar Metro', 'Aminjikarai Tollgate', 'School Campus']
  },
  {
    id: 'BUS-04',
    busNumber: 'Bus 04',
    vehicleNumber: 'TN-01-AB-4024',
    model: 'Ashok Leyland Sunshine 36-Seater',
    driver: 'Mr. K. Veerappan',
    driverPhone: '+91 98408 44556',
    attendant: 'Mrs. S. Gandhimathi',
    route: 'Route 4 - Adyar & Thiruvanmiyur',
    capacity: 36,
    studentsAssigned: 34,
    speedKmH: 22,
    status: 'In Transit',
    currentLocation: 'Adyar Signal, LB Road',
    stops: ['Thiruvanmiyur Bus Stand', 'Adyar Depot', 'Kotturpuram', 'School Campus']
  }
];
