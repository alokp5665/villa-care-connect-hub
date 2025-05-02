
import { cn } from "@/lib/utils";
import { UserRole } from "@/types";
import { 
  Bell, 
  Calendar, 
  ChevronLeft, 
  Home, 
  LayoutDashboard, 
  LogOut, 
  MessageSquare, 
  Settings, 
  Tool, 
  UserRound, 
  Users 
} from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

interface SidebarProps {
  className?: string;
  userRole?: UserRole;
}

export const Sidebar = ({ className, userRole = UserRole.ADMIN }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  // Define navigation links based on user role
  const navigationLinks = [
    { title: 'Dashboard', icon: LayoutDashboard, href: '/dashboard', roles: [UserRole.ADMIN, UserRole.MANAGER, UserRole.TECHNICIAN, UserRole.CUSTOMER] },
    { title: 'Maintenance Requests', icon: Tool, href: '/requests', roles: [UserRole.ADMIN, UserRole.MANAGER, UserRole.TECHNICIAN, UserRole.CUSTOMER] },
    { title: 'Users', icon: Users, href: '/users', roles: [UserRole.ADMIN, UserRole.MANAGER] },
    { title: 'Schedule', icon: Calendar, href: '/schedule', roles: [UserRole.ADMIN, UserRole.MANAGER, UserRole.TECHNICIAN] },
    { title: 'Messages', icon: MessageSquare, href: '/messages', roles: [UserRole.ADMIN, UserRole.MANAGER, UserRole.TECHNICIAN, UserRole.CUSTOMER] },
    { title: 'Notifications', icon: Bell, href: '/notifications', roles: [UserRole.ADMIN, UserRole.MANAGER, UserRole.TECHNICIAN, UserRole.CUSTOMER] },
    { title: 'Settings', icon: Settings, href: '/settings', roles: [UserRole.ADMIN, UserRole.MANAGER, UserRole.CUSTOMER] },
  ];

  // Filter links based on user role
  const filteredLinks = navigationLinks.filter(link => 
    link.roles.includes(userRole)
  );

  return (
    <div 
      className={cn(
        "flex flex-col h-screen bg-sidebar text-sidebar-foreground p-4 transition-all duration-300",
        collapsed ? "w-16" : "w-64",
        className
      )}
    >
      <div className="flex items-center justify-between mb-6">
        {!collapsed && (
          <div className="flex items-center">
            <Home className="h-6 w-6 text-sidebar-primary mr-2" />
            <h1 className="text-xl font-bold text-sidebar-foreground">Villa Care</h1>
          </div>
        )}
        <button 
          className="p-2 rounded-full hover:bg-sidebar-accent text-sidebar-foreground"
          onClick={() => setCollapsed(!collapsed)}
        >
          <ChevronLeft className={cn("h-5 w-5 transition-transform", collapsed && "rotate-180")} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <nav className="space-y-1">
          {filteredLinks.map((link) => {
            const isActive = location.pathname === link.href;
            
            return (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "flex items-center py-2 px-3 rounded-md transition-colors",
                  isActive 
                    ? "bg-sidebar-primary text-sidebar-primary-foreground" 
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
              >
                <link.icon className={cn("h-5 w-5", collapsed ? "mx-auto" : "mr-3")} />
                {!collapsed && <span>{link.title}</span>}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="pt-4 border-t border-sidebar-border mt-4">
        <div 
          className={cn(
            "flex items-center py-2 px-3 rounded-md text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors cursor-pointer",
            collapsed ? "justify-center" : "justify-start"
          )}
        >
          <UserRound className={cn("h-5 w-5", collapsed ? "mx-auto" : "mr-3")} />
          {!collapsed && <span>Profile</span>}
        </div>
        <div 
          className={cn(
            "flex items-center py-2 px-3 rounded-md text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors cursor-pointer",
            collapsed ? "justify-center" : "justify-start"
          )}
        >
          <LogOut className={cn("h-5 w-5", collapsed ? "mx-auto" : "mr-3")} />
          {!collapsed && <span>Sign Out</span>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
