
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RequestStatus, UserRole } from "@/types";
import { analyticsData, maintenanceRequests, users } from "@/utils/dummyData";
import { BarChart, CalendarCheck, CheckCircle, ClipboardList, Clock, Users as UsersIcon } from "lucide-react";
import StatCard from "@/components/dashboard/StatCard";
import MaintenanceRequestCard from "@/components/dashboard/MaintenanceRequestCard";
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import MapView from "@/components/dashboard/MapView";

const Dashboard = () => {
  const [userRole] = useState<UserRole>(UserRole.ADMIN); // In a real app this would come from auth context
  const [chartData, setChartData] = useState<any[]>([]);

  // Transform analytics data for charts
  useEffect(() => {
    const categoryData = Object.entries(analyticsData.requestsByCategory).map(([category, count]) => ({
      name: category.charAt(0).toUpperCase() + category.slice(1),
      count
    }));
    
    setChartData(categoryData);
  }, []);

  // Format location data for map view
  const mapLocations = [
    // Add technician locations
    ...users
      .filter(user => user.role === UserRole.TECHNICIAN && user.location)
      .map(tech => ({
        id: tech.id,
        name: tech.name,
        lat: tech.location!.lat,
        lng: tech.location!.lng,
        type: 'technician' as const
      })),
    
    // Add request locations
    ...maintenanceRequests
      .filter(req => req.location?.lat && req.location?.lng)
      .map(req => ({
        id: req.id,
        name: req.title,
        lat: req.location.lat!,
        lng: req.location.lng!,
        type: 'request' as const
      }))
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Overview of the maintenance requests and system status.</p>
      </div>

      {/* Stats cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Total Requests" 
          value={analyticsData.totalRequests} 
          icon={ClipboardList} 
          description="Overall maintenance requests" 
        />
        <StatCard 
          title="Resolved Requests" 
          value={analyticsData.resolvedRequests} 
          icon={CheckCircle} 
          description="Completed maintenance tasks" 
          trend={{ value: 12, isPositive: true }}
          iconColor="text-green-500"
        />
        <StatCard 
          title="Pending Requests" 
          value={analyticsData.pendingRequests} 
          icon={Clock} 
          description="Awaiting assignment or completion" 
          trend={{ value: 5, isPositive: false }}
          iconColor="text-yellow-500"
        />
        <StatCard 
          title="Average Resolution Time" 
          value={`${analyticsData.avgResolutionTime}h`} 
          icon={CalendarCheck} 
          description="Average time to complete requests" 
          trend={{ value: 8, isPositive: true }}
        />
      </div>

      {/* Dashboard content tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">
            <BarChart className="h-4 w-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="map">
            <CalendarCheck className="h-4 w-4 mr-2" />
            Map View
          </TabsTrigger>
          <TabsTrigger value="technicians">
            <UsersIcon className="h-4 w-4 mr-2" />
            Technicians
          </TabsTrigger>
          <TabsTrigger value="recent">
            <ClipboardList className="h-4 w-4 mr-2" />
            Recent Requests
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Chart */}
            <Card className="p-4">
              <h3 className="text-lg font-medium mb-4">Request Categories</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart
                    data={chartData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="hsl(var(--primary))" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </div>
            </Card>
            
            {/* Status breakdown */}
            <Card className="p-4">
              <h3 className="text-lg font-medium mb-4">Status Breakdown</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="flex items-center">
                    <span className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></span>
                    Pending
                  </span>
                  <span className="font-semibold">{analyticsData.requestsByStatus[RequestStatus.PENDING]}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: `${(analyticsData.requestsByStatus[RequestStatus.PENDING] / analyticsData.totalRequests) * 100}%` }}></div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="flex items-center">
                    <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                    In Progress
                  </span>
                  <span className="font-semibold">{analyticsData.requestsByStatus[RequestStatus.IN_PROGRESS]}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${(analyticsData.requestsByStatus[RequestStatus.IN_PROGRESS] / analyticsData.totalRequests) * 100}%` }}></div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="flex items-center">
                    <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                    Completed
                  </span>
                  <span className="font-semibold">{analyticsData.requestsByStatus[RequestStatus.COMPLETED]}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${(analyticsData.requestsByStatus[RequestStatus.COMPLETED] / analyticsData.totalRequests) * 100}%` }}></div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="flex items-center">
                    <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                    Declined
                  </span>
                  <span className="font-semibold">{analyticsData.requestsByStatus[RequestStatus.DECLINED]}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-red-500 h-2.5 rounded-full" style={{ width: `${(analyticsData.requestsByStatus[RequestStatus.DECLINED] / analyticsData.totalRequests) * 100}%` }}></div>
                </div>
              </div>
            </Card>
            
            {/* Recent requests */}
            <div className="col-span-2">
              <h3 className="text-lg font-medium mb-4">Recent Requests</h3>
              <div className="grid gap-4 md:grid-cols-2">
                {maintenanceRequests.slice(0, 4).map((request) => (
                  <MaintenanceRequestCard
                    key={request.id}
                    request={request}
                    userRole={userRole}
                  />
                ))}
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="map">
          <Card className="p-4">
            <h3 className="text-lg font-medium mb-4">Location Overview</h3>
            <MapView 
              locations={mapLocations}
              className="h-[500px]"
            />
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="flex items-center">
                <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                <span className="text-sm">Technician Location</span>
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                <span className="text-sm">Request Location</span>
              </div>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="technicians">
          <Card className="p-4">
            <h3 className="text-lg font-medium mb-4">Technician Status</h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {users.filter(user => user.role === UserRole.TECHNICIAN).map((technician) => (
                <Card key={technician.id} className="p-4 flex flex-col">
                  <div className="flex items-center mb-4">
                    {technician.avatar ? (
                      <img 
                        src={technician.avatar} 
                        alt={technician.name} 
                        className="w-12 h-12 rounded-full mr-3"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                        <UsersIcon className="h-6 w-6 text-primary" />
                      </div>
                    )}
                    <div>
                      <h4 className="font-semibold">{technician.name}</h4>
                      <p className="text-sm text-gray-500">{technician.email}</p>
                    </div>
                  </div>
                  
                  <div className="text-sm space-y-2 flex-1">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Assigned Requests:</span>
                      <span className="font-medium">{maintenanceRequests.filter(req => req.technicianId === technician.id).length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">In Progress:</span>
                      <span className="font-medium">{maintenanceRequests.filter(req => req.technicianId === technician.id && req.status === RequestStatus.IN_PROGRESS).length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Completed:</span>
                      <span className="font-medium">{maintenanceRequests.filter(req => req.technicianId === technician.id && req.status === RequestStatus.COMPLETED).length}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Current Status:</span>
                      <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">Available</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="recent">
          <h3 className="text-lg font-medium mb-4">All Recent Requests</h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {maintenanceRequests.map((request) => (
              <MaintenanceRequestCard
                key={request.id}
                request={request}
                userRole={userRole}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
