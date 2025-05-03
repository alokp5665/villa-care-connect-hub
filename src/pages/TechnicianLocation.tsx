
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MapView from "@/components/dashboard/MapView";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const TechnicianLocation = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { requestId } = useParams();
  
  // In a real app, these would be fetched from an API
  const [technician, setTechnician] = useState({
    id: "tech-123",
    name: "John Doe",
    phone: "+971 50 123 4567",
    lat: 25.204849,
    lng: 55.270783
  });
  
  const [request, setRequest] = useState({
    id: requestId || "req-456",
    title: "AC Maintenance",
    address: "Villa 123, Community XYZ",
    lat: 25.209849, // Slightly different location for the request
    lng: 55.275783
  });
  
  useEffect(() => {
    // In a real app, this would fetch the technician's location at intervals
    const interval = setInterval(() => {
      // Simulate movement by slightly changing coordinates
      setTechnician(prev => ({
        ...prev,
        lat: prev.lat + (Math.random() - 0.5) * 0.005,
        lng: prev.lng + (Math.random() - 0.5) * 0.005
      }));
      
      toast({
        title: "Location Updated",
        description: "Technician location has been refreshed",
        duration: 2000
      });
    }, 30000); // Update every 30 seconds
    
    return () => clearInterval(interval);
  }, [toast]);
  
  const locations = [
    {
      id: technician.id,
      name: technician.name,
      lat: technician.lat,
      lng: technician.lng,
      type: 'technician' as const
    },
    {
      id: request.id,
      name: request.title,
      lat: request.lat,
      lng: request.lng,
      type: 'request' as const
    }
  ];
  
  // Center the map between the technician and request locations
  const center = {
    lat: (technician.lat + request.lat) / 2,
    lng: (technician.lng + request.lng) / 2
  };
  
  return (
    <div className="container mx-auto p-4">
      <Button 
        variant="outline" 
        className="mb-4"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Request
      </Button>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Technician Location</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <MapView 
              locations={locations}
              center={center}
              zoom={13}
              className="h-80"
            />
          </div>
          
          <div className="mt-4">
            <h3 className="text-lg font-semibold">{technician.name}</h3>
            <p className="text-gray-500">Phone: {technician.phone}</p>
            <p className="text-sm text-gray-400 mt-2">
              Current status: <span className="text-green-500 font-medium">En route</span>
            </p>
            <p className="text-sm text-gray-400">
              Estimated arrival: <span className="font-medium">25 minutes</span>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TechnicianLocation;
