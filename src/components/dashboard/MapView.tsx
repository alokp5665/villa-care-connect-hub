
import { useEffect, useRef } from "react";

interface MapViewProps {
  className?: string;
  locations?: Array<{
    id: string;
    name: string;
    lat: number;
    lng: number;
    type?: 'technician' | 'request';
  }>;
  center?: { lat: number; lng: number };
  zoom?: number;
}

const MapView = ({ 
  className, 
  locations = [], 
  center = { lat: 25.204849, lng: 55.270783 }, // Dubai as default center
  zoom = 10
}: MapViewProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Placeholder for map initialization code
    // In a real implementation, this would initialize a mapping library like Leaflet, Mapbox or Google Maps
    
    if (mapRef.current) {
      // Simulated map initialization
      console.log("Map initialized with:", { center, zoom, locations });
      
      // Create placeholder map content
      const mapElement = mapRef.current;
      mapElement.innerHTML = `
        <div class="flex items-center justify-center h-full bg-gray-100 rounded-lg relative overflow-hidden">
          <div class="absolute inset-0 bg-cover bg-center opacity-50" style="background-image: url('https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/${center.lng},${center.lat},${zoom},0/600x400?access_token=pk.eyJ1IjoicGxhY2Vob2xkZXIiLCJhIjoiY2tleHBsYWNlaG9sZGVyMiJ9.placeholder')"></div>
          <div class="z-10 text-center p-4 bg-white/80 rounded-lg shadow-md">
            <h3 class="font-medium">Map View</h3>
            <p class="text-sm text-gray-500">This is a placeholder for the actual map integration</p>
            <p class="text-xs mt-2">Locations to display: ${locations.length}</p>
            <p class="text-xs">Center: ${center.lat.toFixed(6)}, ${center.lng.toFixed(6)}</p>
          </div>
        </div>
      `;
    }
    
    return () => {
      // Cleanup map instance when component unmounts
      if (mapRef.current) {
        mapRef.current.innerHTML = '';
      }
    };
  }, [center, zoom, locations]);
  
  return (
    <div
      ref={mapRef}
      className={`w-full h-64 rounded-lg border border-gray-200 ${className || ''}`}
      aria-label="Map showing locations of technicians and maintenance requests"
    ></div>
  );
};

export default MapView;
