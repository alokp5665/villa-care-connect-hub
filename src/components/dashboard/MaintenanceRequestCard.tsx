
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { MaintenanceRequest, RequestStatus, UserRole } from "@/types";
import { CalendarClock, MapPin, MoreVertical, UserRound } from "lucide-react";
import { useState } from "react";

interface MaintenanceRequestCardProps {
  request: MaintenanceRequest;
  userRole: UserRole;
  className?: string;
  onStatusChange?: (id: string, status: RequestStatus) => void;
}

const MaintenanceRequestCard = ({ 
  request, 
  userRole, 
  className,
  onStatusChange 
}: MaintenanceRequestCardProps) => {
  const { toast } = useToast();
  const [currentRequest, setCurrentRequest] = useState(request);

  // Format date to readable string
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    }).format(date);
  };

  // Status badge color
  const getStatusBadgeClass = (status: RequestStatus) => {
    switch (status) {
      case RequestStatus.PENDING:
        return "status-badge-pending";
      case RequestStatus.IN_PROGRESS:
        return "status-badge-in-progress";
      case RequestStatus.COMPLETED:
        return "status-badge-completed";
      case RequestStatus.DECLINED:
        return "status-badge-declined";
      default:
        return "";
    }
  };

  // Handle status change
  const handleStatusChange = (status: RequestStatus) => {
    setCurrentRequest({
      ...currentRequest,
      status
    });
    
    if (onStatusChange) {
      onStatusChange(currentRequest.id, status);
    }
    
    toast({
      title: "Status updated",
      description: `Request status changed to ${status}`,
    });
  };

  // View details action
  const handleViewDetails = () => {
    toast({
      title: "View details",
      description: `Viewing details for request: ${currentRequest.id}`,
    });
  };

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader className="pb-3 flex flex-row justify-between items-start">
        <div>
          <CardTitle className="text-xl">{currentRequest.title}</CardTitle>
          <div className="flex items-center mt-1 text-sm text-gray-500">
            <span className={cn("status-badge", getStatusBadgeClass(currentRequest.status))}>
              {currentRequest.status.replace('-', ' ')}
            </span>
            <span className="mx-2">•</span>
            <span className="capitalize">{currentRequest.category}</span>
            <span className="mx-2">•</span>
            <span>Priority: {currentRequest.priority}</span>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleViewDetails}>View details</DropdownMenuItem>
            
            {/* Status change options based on user role */}
            {(userRole === UserRole.ADMIN || userRole === UserRole.MANAGER) && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  disabled={currentRequest.status === RequestStatus.PENDING}
                  onClick={() => handleStatusChange(RequestStatus.PENDING)}
                >
                  Mark as Pending
                </DropdownMenuItem>
                <DropdownMenuItem
                  disabled={currentRequest.status === RequestStatus.IN_PROGRESS}
                  onClick={() => handleStatusChange(RequestStatus.IN_PROGRESS)}
                >
                  Mark as In Progress
                </DropdownMenuItem>
                <DropdownMenuItem
                  disabled={currentRequest.status === RequestStatus.COMPLETED}
                  onClick={() => handleStatusChange(RequestStatus.COMPLETED)}
                >
                  Mark as Completed
                </DropdownMenuItem>
                <DropdownMenuItem
                  disabled={currentRequest.status === RequestStatus.DECLINED}
                  onClick={() => handleStatusChange(RequestStatus.DECLINED)}
                >
                  Mark as Declined
                </DropdownMenuItem>
              </>
            )}
            
            {userRole === UserRole.TECHNICIAN && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  disabled={currentRequest.status === RequestStatus.IN_PROGRESS}
                  onClick={() => handleStatusChange(RequestStatus.IN_PROGRESS)}
                >
                  Start Work
                </DropdownMenuItem>
                <DropdownMenuItem
                  disabled={currentRequest.status === RequestStatus.COMPLETED}
                  onClick={() => handleStatusChange(RequestStatus.COMPLETED)}
                >
                  Mark as Completed
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="pb-3 pt-0">
        <p className="text-sm text-gray-700 line-clamp-2 mb-4">{currentRequest.description}</p>
        
        <div className="flex flex-col space-y-2 text-sm">
          <div className="flex items-center text-gray-600">
            <UserRound className="h-4 w-4 mr-2 flex-shrink-0" />
            <span>Customer: {currentRequest.customerName}</span>
          </div>
          {currentRequest.technicianName && (
            <div className="flex items-center text-gray-600">
              <UserRound className="h-4 w-4 mr-2 flex-shrink-0" />
              <span>Technician: {currentRequest.technicianName}</span>
            </div>
          )}
          <div className="flex items-center text-gray-600">
            <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
            <span>{currentRequest.location.address}, {currentRequest.location.city}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <CalendarClock className="h-4 w-4 mr-2 flex-shrink-0" />
            <span>Created: {formatDate(new Date(currentRequest.createdAt))}</span>
          </div>
          {currentRequest.scheduledFor && (
            <div className="flex items-center text-gray-600">
              <CalendarClock className="h-4 w-4 mr-2 flex-shrink-0" />
              <span>Scheduled: {formatDate(new Date(currentRequest.scheduledFor))}</span>
            </div>
          )}
        </div>
        
        {currentRequest.images && currentRequest.images.length > 0 && (
          <div className="mt-4">
            <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-thin">
              {currentRequest.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Request ${currentRequest.id} image ${index + 1}`}
                  className="h-20 w-20 object-cover rounded-md"
                />
              ))}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-2 flex justify-between">
        <Button variant="outline" size="sm" onClick={handleViewDetails}>
          View Details
        </Button>
        
        {userRole === UserRole.TECHNICIAN && currentRequest.status === RequestStatus.PENDING && (
          <Button size="sm" onClick={() => handleStatusChange(RequestStatus.IN_PROGRESS)}>
            Accept Request
          </Button>
        )}
        
        {(userRole === UserRole.ADMIN || userRole === UserRole.MANAGER) && currentRequest.status === RequestStatus.PENDING && (
          <Button size="sm" onClick={() => handleStatusChange(RequestStatus.IN_PROGRESS)}>
            Assign Technician
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default MaintenanceRequestCard;
