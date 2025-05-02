
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import MaintenanceRequestCard from "@/components/dashboard/MaintenanceRequestCard";
import { MaintenanceCategory, MaintenanceRequest, RequestStatus, UserRole } from "@/types";
import { maintenanceRequests } from "@/utils/dummyData";
import { Filter, Plus, Search, SlidersHorizontal } from "lucide-react";
import { useState } from "react";

const Requests = () => {
  const [activeRequests, setActiveRequests] = useState<MaintenanceRequest[]>(maintenanceRequests);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterPriority, setFilterPriority] = useState<string>("all");
  const [userRole] = useState<UserRole>(UserRole.ADMIN); // In a real app this would come from auth context
  
  const { toast } = useToast();
  
  // Handle status change
  const handleStatusChange = (id: string, status: RequestStatus) => {
    const updatedRequests = activeRequests.map(request =>
      request.id === id ? { ...request, status } : request
    );
    
    setActiveRequests(updatedRequests);
    
    toast({
      title: "Request updated",
      description: `Request ${id} status changed to ${status}`
    });
  };
  
  // Handle search and filter
  const applyFilters = () => {
    let filteredRequests = [...maintenanceRequests];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filteredRequests = filteredRequests.filter(
        request => 
          request.title.toLowerCase().includes(query) || 
          request.description.toLowerCase().includes(query) ||
          request.customerName.toLowerCase().includes(query)
      );
    }
    
    // Apply category filter
    if (filterCategory !== "all") {
      filteredRequests = filteredRequests.filter(
        request => request.category === filterCategory
      );
    }
    
    // Apply status filter
    if (filterStatus !== "all") {
      filteredRequests = filteredRequests.filter(
        request => request.status === filterStatus
      );
    }
    
    // Apply priority filter
    if (filterPriority !== "all") {
      filteredRequests = filteredRequests.filter(
        request => request.priority.toString() === filterPriority
      );
    }
    
    setActiveRequests(filteredRequests);
  };
  
  // Reset filters
  const resetFilters = () => {
    setSearchQuery("");
    setFilterCategory("all");
    setFilterStatus("all");
    setFilterPriority("all");
    setActiveRequests(maintenanceRequests);
  };
  
  // Handle new request (placeholder)
  const handleNewRequest = () => {
    toast({
      title: "New request",
      description: "Create new maintenance request form would open here."
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Maintenance Requests</h1>
          <p className="text-muted-foreground">Manage and track all maintenance requests.</p>
        </div>
        {(userRole === UserRole.ADMIN || userRole === UserRole.CUSTOMER) && (
          <Button onClick={handleNewRequest}>
            <Plus className="h-4 w-4 mr-2" />
            New Request
          </Button>
        )}
      </div>

      {/* Search and filter bar */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search requests..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyUp={(e) => e.key === "Enter" && applyFilters()}
            />
          </div>
          
          <div className="flex flex-wrap md:flex-nowrap gap-2">
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="min-w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {Object.values(MaintenanceCategory).map((category) => (
                  <SelectItem key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="min-w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                {Object.values(RequestStatus).map((status) => (
                  <SelectItem key={status} value={status}>
                    {status.replace('-', ' ')}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center">
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  More Filters
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Priority</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setFilterPriority("all")}>
                  All Priorities
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterPriority("5")}>
                  Critical (5)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterPriority("4")}>
                  High (4)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterPriority("3")}>
                  Medium (3)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterPriority("2")}>
                  Low (2)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterPriority("1")}>
                  Minor (1)
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button variant="secondary" onClick={applyFilters}>
              <Filter className="h-4 w-4 mr-2" />
              Apply Filters
            </Button>
            
            <Button variant="ghost" onClick={resetFilters}>
              Reset
            </Button>
          </div>
        </div>
      </Card>

      {/* Request tabs based on status */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Requests</TabsTrigger>
          <TabsTrigger value="pending">
            Pending
            <span className="ml-2 bg-yellow-100 text-yellow-800 text-xs rounded-full px-2 py-0.5">
              {maintenanceRequests.filter(req => req.status === RequestStatus.PENDING).length}
            </span>
          </TabsTrigger>
          <TabsTrigger value="in-progress">
            In Progress
            <span className="ml-2 bg-blue-100 text-blue-800 text-xs rounded-full px-2 py-0.5">
              {maintenanceRequests.filter(req => req.status === RequestStatus.IN_PROGRESS).length}
            </span>
          </TabsTrigger>
          <TabsTrigger value="completed">
            Completed
            <span className="ml-2 bg-green-100 text-green-800 text-xs rounded-full px-2 py-0.5">
              {maintenanceRequests.filter(req => req.status === RequestStatus.COMPLETED).length}
            </span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {activeRequests.length > 0 ? (
              activeRequests.map((request) => (
                <MaintenanceRequestCard
                  key={request.id}
                  request={request}
                  userRole={userRole}
                  onStatusChange={handleStatusChange}
                />
              ))
            ) : (
              <div className="col-span-full py-10 text-center">
                <p className="text-gray-500">No requests found matching your filters.</p>
                <Button variant="link" onClick={resetFilters}>
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="pending">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {activeRequests
              .filter(req => req.status === RequestStatus.PENDING)
              .map((request) => (
                <MaintenanceRequestCard
                  key={request.id}
                  request={request}
                  userRole={userRole}
                  onStatusChange={handleStatusChange}
                />
              ))}
          </div>
        </TabsContent>
        
        <TabsContent value="in-progress">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {activeRequests
              .filter(req => req.status === RequestStatus.IN_PROGRESS)
              .map((request) => (
                <MaintenanceRequestCard
                  key={request.id}
                  request={request}
                  userRole={userRole}
                  onStatusChange={handleStatusChange}
                />
              ))}
          </div>
        </TabsContent>
        
        <TabsContent value="completed">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {activeRequests
              .filter(req => req.status === RequestStatus.COMPLETED)
              .map((request) => (
                <MaintenanceRequestCard
                  key={request.id}
                  request={request}
                  userRole={userRole}
                  onStatusChange={handleStatusChange}
                />
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Requests;
