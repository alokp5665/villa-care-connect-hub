
import OpenLayersMap from "../map/OpenLayersMap";

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

const MapView = (props: MapViewProps) => {
  return <OpenLayersMap {...props} />;
};

export default MapView;
