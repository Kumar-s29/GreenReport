import React from "react";
import { Link } from "react-router-dom";
import { Camera, Locate, Map, ClipboardList } from "lucide-react";
import MapComponent from "../components/MapComponent";
import ReportList from "../components/ReportList";

const HomePage: React.FC = () => {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-600 to-primary-700 text-white">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="container mx-auto px-4 py-16 sm:py-24 relative z-10">
          <div className="text-center sm:text-left max-w-2xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Report Garbage & Keep Our Community Clean
            </h1>
            <p className="text-lg sm:text-xl opacity-90 mb-8">
              Help create a cleaner environment by reporting garbage in your
              area. Upload photos, share locations, and track cleanup progress.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/report"
                className="px-6 py-3 bg-white text-primary-600 rounded-md font-medium hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl"
              >
                Report Garbage
              </Link>
              <Link
                to="/map"
                className="px-6 py-3 bg-transparent border border-white text-white rounded-md font-medium hover:bg-white/10 transition-colors"
              >
                View Garbage Map
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center mb-4">
                <Camera size={32} className="text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Take a Photo</h3>
              <p className="text-gray-600">
                Snap a picture of the garbage you've spotted in your area.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center mb-4">
                <Locate size={32} className="text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Share Location</h3>
              <p className="text-gray-600">
                Use our geolocation feature to mark exactly where the garbage is
                located.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center mb-4">
                <Map size={32} className="text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Track on Map</h3>
              <p className="text-gray-600">
                See all reports on an interactive map and monitor cleanup
                progress.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Garbage Reports Map</h2>
            <Link
              to="/map"
              className="mt-4 md:mt-0 text-primary-600 hover:text-primary-700 font-medium flex items-center"
            >
              View Full Map <Map size={18} className="ml-1" />
            </Link>
          </div>
          <MapComponent height="400px" showFilter={false} />
        </div>
      </section>

      {/* Recent Reports Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Recent Reports</h2>
            <Link
              to="/reports"
              className="mt-4 md:mt-0 text-primary-600 hover:text-primary-700 font-medium flex items-center"
            >
              View All Reports <ClipboardList size={18} className="ml-1" />
            </Link>
          </div>
          <ReportList limit={3} showFilter={false} />
        </div>
      </section>
    </div>
  );
};

export default HomePage;
