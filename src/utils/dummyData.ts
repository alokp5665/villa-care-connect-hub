
import { MaintenanceCategory, MaintenanceRequest, RequestStatus, User, UserRole } from "@/types";

// Generate random users for each role
export const users: User[] = [
  // Admin
  {
    id: "admin-1",
    name: "Ahmed Al Mansour",
    email: "ahmed@villacare.com",
    phone: "+971501234567",
    role: UserRole.ADMIN,
    avatar: "https://i.pravatar.cc/150?img=1",
    createdAt: new Date('2023-01-01')
  },
  // Manager
  {
    id: "manager-1",
    name: "Sarah Johnson",
    email: "sarah@villacare.com",
    phone: "+971502345678",
    role: UserRole.MANAGER,
    avatar: "https://i.pravatar.cc/150?img=2",
    createdAt: new Date('2023-02-15')
  },
  // Technicians
  {
    id: "tech-1",
    name: "Mohammed Ali",
    email: "mohammed@villacare.com",
    phone: "+971503456789",
    role: UserRole.TECHNICIAN,
    avatar: "https://i.pravatar.cc/150?img=3",
    createdAt: new Date('2023-03-10'),
    location: {
      lat: 25.276987,
      lng: 55.296249
    }
  },
  {
    id: "tech-2",
    name: "Ravi Patel",
    email: "ravi@villacare.com",
    phone: "+971504567890",
    role: UserRole.TECHNICIAN,
    avatar: "https://i.pravatar.cc/150?img=4",
    createdAt: new Date('2023-03-15'),
    location: {
      lat: 25.266987,
      lng: 55.306249
    }
  },
  // Customers
  {
    id: "cust-1",
    name: "Fatima Al Mazrouei",
    email: "fatima@example.com",
    phone: "+971505678901",
    role: UserRole.CUSTOMER,
    avatar: "https://i.pravatar.cc/150?img=5",
    createdAt: new Date('2023-04-01')
  },
  {
    id: "cust-2",
    name: "John Smith",
    email: "john@example.com",
    phone: "+971506789012",
    role: UserRole.CUSTOMER,
    avatar: "https://i.pravatar.cc/150?img=6",
    createdAt: new Date('2023-04-15')
  },
  {
    id: "cust-3",
    name: "Aisha Abdullah",
    email: "aisha@example.com",
    phone: "+971507890123",
    role: UserRole.CUSTOMER,
    avatar: "https://i.pravatar.cc/150?img=7",
    createdAt: new Date('2023-05-01')
  }
];

// Generate maintenance requests
export const maintenanceRequests: MaintenanceRequest[] = [
  {
    id: "req-001",
    title: "Air conditioning not working",
    description: "The AC in the master bedroom is not cooling properly and making strange noises.",
    category: MaintenanceCategory.HVAC,
    status: RequestStatus.IN_PROGRESS,
    priority: 4,
    customerId: "cust-1",
    customerName: "Fatima Al Mazrouei",
    technicianId: "tech-1",
    technicianName: "Mohammed Ali",
    createdAt: new Date('2023-06-15T10:30:00'),
    updatedAt: new Date('2023-06-15T14:45:00'),
    scheduledFor: new Date('2023-06-16T09:00:00'),
    location: {
      address: "Villa 42, Palm Jumeirah",
      city: "Dubai",
      lat: 25.116407,
      lng: 55.138718
    },
    images: [
      "https://images.unsplash.com/photo-1628814937585-0d9b4cebc15c?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YWlyJTIwY29uZGl0aW9uZXJ8ZW58MHx8MHx8&w=400&q=80"
    ],
    notes: [
      "Technician reported that the compressor needs replacement."
    ]
  },
  {
    id: "req-002",
    title: "Water leak in bathroom",
    description: "There is water leaking from under the sink in the guest bathroom.",
    category: MaintenanceCategory.PLUMBING,
    status: RequestStatus.PENDING,
    priority: 5,
    customerId: "cust-2",
    customerName: "John Smith",
    createdAt: new Date('2023-06-15T15:20:00'),
    updatedAt: new Date('2023-06-15T15:20:00'),
    location: {
      address: "Apartment 305, Marina Heights",
      city: "Dubai",
      lat: 25.080823,
      lng: 55.143887
    },
    images: [
      "https://images.unsplash.com/photo-1585704032915-c3400ca199cb?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8d2F0ZXIlMjBsZWFrfGVufDB8fDB8fA%3D%3D&w=400&q=80"
    ]
  },
  {
    id: "req-003",
    title: "Electricity tripping",
    description: "The main circuit breaker keeps tripping when multiple appliances are used.",
    category: MaintenanceCategory.ELECTRICAL,
    status: RequestStatus.COMPLETED,
    priority: 4,
    customerId: "cust-3",
    customerName: "Aisha Abdullah",
    technicianId: "tech-2",
    technicianName: "Ravi Patel",
    createdAt: new Date('2023-06-14T08:15:00'),
    updatedAt: new Date('2023-06-14T17:30:00'),
    scheduledFor: new Date('2023-06-14T13:00:00'),
    completedAt: new Date('2023-06-14T17:00:00'),
    location: {
      address: "Villa 15, Arabian Ranches",
      city: "Dubai",
      lat: 25.027615,
      lng: 55.262074
    },
    notes: [
      "Replaced faulty circuit breaker and tested with all appliances running."
    ]
  },
  {
    id: "req-004",
    title: "Front door lock broken",
    description: "The electronic lock on the front door isn't working with the key card.",
    category: MaintenanceCategory.SECURITY,
    status: RequestStatus.DECLINED,
    priority: 3,
    customerId: "cust-1",
    customerName: "Fatima Al Mazrouei",
    createdAt: new Date('2023-06-10T14:30:00'),
    updatedAt: new Date('2023-06-11T09:15:00'),
    location: {
      address: "Villa 42, Palm Jumeirah",
      city: "Dubai",
      lat: 25.116407,
      lng: 55.138718
    },
    notes: [
      "Issue is covered under separate security system contract."
    ]
  },
  {
    id: "req-005",
    title: "Swimming pool pump noisy",
    description: "The pool pump is making a loud grinding noise.",
    category: MaintenanceCategory.APPLIANCE,
    status: RequestStatus.PENDING,
    priority: 2,
    customerId: "cust-2",
    customerName: "John Smith",
    createdAt: new Date('2023-06-15T11:45:00'),
    updatedAt: new Date('2023-06-15T11:45:00'),
    location: {
      address: "Villa 23, Meadows",
      city: "Dubai",
      lat: 25.068671,
      lng: 55.212345
    }
  },
  {
    id: "req-006",
    title: "Ceiling fan installation",
    description: "Need to install a new ceiling fan in the living room.",
    category: MaintenanceCategory.ELECTRICAL,
    status: RequestStatus.COMPLETED,
    priority: 2,
    customerId: "cust-3",
    customerName: "Aisha Abdullah",
    technicianId: "tech-1",
    technicianName: "Mohammed Ali",
    createdAt: new Date('2023-06-12T09:30:00'),
    updatedAt: new Date('2023-06-12T16:45:00'),
    scheduledFor: new Date('2023-06-12T14:00:00'),
    completedAt: new Date('2023-06-12T16:30:00'),
    location: {
      address: "Villa 15, Arabian Ranches",
      city: "Dubai",
      lat: 25.027615,
      lng: 55.262074
    },
    images: [
      "https://images.unsplash.com/photo-1600607688066-89c568ad1d8a?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y2VpbGluZyUyMGZhbnxlbnwwfHwwfHw%3D&w=400&q=80"
    ]
  }
];

// Generate analytics data from the requests
export const analyticsData = {
  totalRequests: maintenanceRequests.length,
  resolvedRequests: maintenanceRequests.filter(req => req.status === RequestStatus.COMPLETED).length,
  pendingRequests: maintenanceRequests.filter(req => req.status === RequestStatus.PENDING || req.status === RequestStatus.IN_PROGRESS).length,
  avgResolutionTime: 12.5, // in hours
  requestsByCategory: {
    [MaintenanceCategory.ELECTRICAL]: maintenanceRequests.filter(req => req.category === MaintenanceCategory.ELECTRICAL).length,
    [MaintenanceCategory.PLUMBING]: maintenanceRequests.filter(req => req.category === MaintenanceCategory.PLUMBING).length,
    [MaintenanceCategory.HVAC]: maintenanceRequests.filter(req => req.category === MaintenanceCategory.HVAC).length,
    [MaintenanceCategory.GENERAL]: maintenanceRequests.filter(req => req.category === MaintenanceCategory.GENERAL).length,
    [MaintenanceCategory.APPLIANCE]: maintenanceRequests.filter(req => req.category === MaintenanceCategory.APPLIANCE).length,
    [MaintenanceCategory.SECURITY]: maintenanceRequests.filter(req => req.category === MaintenanceCategory.SECURITY).length,
    [MaintenanceCategory.OTHER]: maintenanceRequests.filter(req => req.category === MaintenanceCategory.OTHER).length,
  },
  requestsByStatus: {
    [RequestStatus.PENDING]: maintenanceRequests.filter(req => req.status === RequestStatus.PENDING).length,
    [RequestStatus.IN_PROGRESS]: maintenanceRequests.filter(req => req.status === RequestStatus.IN_PROGRESS).length,
    [RequestStatus.COMPLETED]: maintenanceRequests.filter(req => req.status === RequestStatus.COMPLETED).length,
    [RequestStatus.DECLINED]: maintenanceRequests.filter(req => req.status === RequestStatus.DECLINED).length,
  }
};

// Function to get user by role
export const getUsersByRole = (role: UserRole): User[] => {
  return users.filter(user => user.role === role);
};

// Function to get requests by status
export const getRequestsByStatus = (status: RequestStatus): MaintenanceRequest[] => {
  return maintenanceRequests.filter(request => request.status === status);
};

// Function to get requests by customer
export const getRequestsByCustomer = (customerId: string): MaintenanceRequest[] => {
  return maintenanceRequests.filter(request => request.customerId === customerId);
};

// Function to get requests assigned to technician
export const getRequestsByTechnician = (technicianId: string): MaintenanceRequest[] => {
  return maintenanceRequests.filter(request => request.technicianId === technicianId);
};
