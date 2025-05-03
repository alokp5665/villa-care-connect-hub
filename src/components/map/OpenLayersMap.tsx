
import { useEffect, useRef } from "react";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { fromLonLat } from "ol/proj";
import { Feature } from "ol";
import Point from "ol/geom/Point";
import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import { Style, Icon } from "ol/style";
import 'ol/ol.css';

interface Location {
  id: string;
  name: string;
  lat: number;
  lng: number;
  type?: 'technician' | 'request';
}

interface OpenLayersMapProps {
  className?: string;
  locations?: Location[];
  center?: { lat: number; lng: number };
  zoom?: number;
}

const OpenLayersMap = ({ 
  className, 
  locations = [], 
  center = { lat: 25.204849, lng: 55.270783 }, // Dubai as default center
  zoom = 10
}: OpenLayersMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<Map | null>(null);
  
  useEffect(() => {
    if (!mapRef.current) return;
    
    // Initialize the map
    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        center: fromLonLat([center.lng, center.lat]),
        zoom: zoom
      })
    });
    
    mapInstanceRef.current = map;
    
    // Add markers for locations
    if (locations.length > 0) {
      const features = locations.map(location => {
        const feature = new Feature({
          geometry: new Point(fromLonLat([location.lng, location.lat])),
          name: location.name,
          id: location.id,
          type: location.type
        });
        
        // Different styles for technicians and requests
        const iconStyle = new Style({
          image: new Icon({
            src: location.type === 'technician' 
              ? 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/icons/person-fill.svg'
              : 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/icons/tools.svg',
            scale: 1.5,
          })
        });
        
        feature.setStyle(iconStyle);
        return feature;
      });
      
      const vectorSource = new VectorSource({
        features: features
      });
      
      const vectorLayer = new VectorLayer({
        source: vectorSource
      });
      
      map.addLayer(vectorLayer);
    }
    
    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.setTarget(undefined);
        mapInstanceRef.current = null;
      }
    };
  }, [center.lat, center.lng, zoom, locations]);
  
  return (
    <div 
      ref={mapRef} 
      className={`w-full h-64 rounded-lg border border-gray-200 ${className || ''}`}
      aria-label="Map showing locations of technicians and maintenance requests"
    />
  );
};

export default OpenLayersMap;
