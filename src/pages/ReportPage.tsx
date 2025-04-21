import React from 'react';
import ReportForm from '../components/ReportForm';

const ReportPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 sm:py-12 animate-fade-in">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Report Garbage</h1>
          <p className="text-gray-600">
            Help keep our community clean by reporting garbage in your area.
          </p>
        </div>
        
        <ReportForm />
        
        <div className="mt-8 bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h3 className="text-lg font-medium text-blue-800 mb-2">How it works:</h3>
          <ol className="list-decimal pl-5 text-blue-700 space-y-2">
            <li>Take a photo of the garbage</li>
            <li>Get your location using the "Get My Location" button</li>
            <li>Provide a brief description</li>
            <li>Submit your report</li>
          </ol>
          <p className="mt-4 text-sm text-blue-600">
            Once submitted, your report will be visible on the map and the reports list. 
            Cleanup teams will be notified of the location.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReportPage;