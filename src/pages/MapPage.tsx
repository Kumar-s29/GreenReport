import React from 'react';
import MapComponent from '../components/MapComponent';

const MapPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 sm:py-12 animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Garbage Map</h1>
        <p className="text-gray-600">
          Interactive map showing all reported garbage locations.
        </p>
      </div>
      
      <div className="mb-8">
        <MapComponent height="600px" />
      </div>
      
      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-medium text-gray-800 mb-4">Map Legend</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex items-center">
            <div className="w-6 h-6 mr-2">
              <img src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png" alt="Red marker" className="h-full" />
            </div>
            <span className="text-gray-700">Pending cleanup</span>
          </div>
          <div className="flex items-center">
            <div className="w-6 h-6 mr-2">
              <img src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png" alt="Orange marker" className="h-full" />
            </div>
            <span className="text-gray-700">Cleanup in progress</span>
          </div>
          <div className="flex items-center">
            <div className="w-6 h-6 mr-2">
              <img src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png" alt="Green marker" className="h-full" />
            </div>
            <span className="text-gray-700">Cleanup completed</span>
          </div>
        </div>
        <div className="mt-4 text-sm text-gray-600">
          <p>Click on any marker to view details including the image, description, and status.</p>
        </div>
      </div>
    </div>
  );
};

export default MapPage;