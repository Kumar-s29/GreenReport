import React from "react";
import ReportList from "../components/ReportList";

const ReportsListPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 sm:py-12 animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {/* Garbage Reports */}
        </h1>
        <p className="text-gray-600">
          {/* Browse all submitted reports and track cleanup progress. */}
        </p>
      </div>

      <ReportList />
    </div>
  );
};

export default ReportsListPage;
