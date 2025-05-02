
// User roles
export enum UserRole {
  ADMIN = "admin",
  CUSTOMER = "customer",
  TECHNICIAN = "technician",
  MANAGER = "manager"
}

// Request status
export enum RequestStatus {
  PENDING = "pending",
  IN_PROGRESS = "in-progress",
  COMPLETED = "completed",
  DECLINED = "declined"
}

// Maintenance category
export enum MaintenanceCategory {
  ELECTRICAL = "electrical",
  PLUMBING = "plumbing",
  HVAC = "hvac",
  GENERAL = "general",
  APPLIANCE = "appliance",
  SECURITY = "security",
  OTHER = "other"
}

// User interface
export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  avatar?: string;
  createdAt: Date;
  location?: {
    lat: number;
    lng: number;
  };
}

// Maintenance request interface
export interface MaintenanceRequest {
  id: string;
  title: string;
  description: string;
  category: MaintenanceCategory;
  status: RequestStatus;
  priority: number; // 1-5, 5 being highest
  customerId: string;
  customerName: string;
  technicianId?: string;
  technicianName?: string;
  createdAt: Date;
  updatedAt: Date;
  scheduledFor?: Date;
  completedAt?: Date;
  location: {
    address: string;
    city: string;
    lat?: number;
    lng?: number;
  };
  images?: string[];
  notes?: string[];
}

// Message interface for chat
export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: UserRole;
  content: string;
  timestamp: Date;
  readAt?: Date;
}

// Analytics data
export interface AnalyticsData {
  totalRequests: number;
  resolvedRequests: number;
  pendingRequests: number;
  avgResolutionTime: number; // in hours
  requestsByCategory: Record<MaintenanceCategory, number>;
  requestsByStatus: Record<RequestStatus, number>;
}
