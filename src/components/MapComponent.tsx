import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Remove marker and dynamic data fetching logic

interface MapComponentProps {
  height?: string;
  initialCenter?: [number, number];
  initialZoom?: number;
}

const MapComponent: React.FC<MapComponentProps> = ({
  height = "500px",
  initialCenter = [40.7128, -74.006], // Default to NYC
  initialZoom = 12,
}) => {
  return (
    <div className="w-full">
      <div style={{ height }} className="rounded-lg overflow-hidden shadow-md">
        <MapContainer
          center={initialCenter}
          zoom={initialZoom}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </MapContainer>
      </div>
    </div>
  );
};

export default MapComponent;
