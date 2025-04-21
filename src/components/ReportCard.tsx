import React from "react";
import { ReportData } from "../services/reportService";
import { AlertTriangle, CheckCircle, Clock, MapPin } from "lucide-react";

interface ReportCardProps {
  report: ReportData;
  className?: string;
}

const ReportCard: React.FC<ReportCardProps> = ({ report, className = "" }) => {
  const getStatusBadge = () => {
    switch (report.status) {
      case "pending":
        return (
          <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-error-100 text-error-800">
            <AlertTriangle size={12} />
            Pending
          </div>
        );
      case "in-progress":
        return (
          <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-warning-100 text-warning-800">
            <Clock size={12} />
            In Progress
          </div>
        );
      case "completed":
        return (
          <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-success-100 text-success-800">
            <CheckCircle size={12} />
            Completed
          </div>
        );
      default:
        return null;
    }
  };

  // Format timestamp with validation
  const formatDate = (timestamp: any) => {
    if (!timestamp) return "N/A"; // Return 'N/A' if the timestamp is missing or invalid
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp); // Convert using toDate() if available
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Check if latitude and longitude are valid before calling toFixed
  const formatLocation = () => {
    const lat = report.latitude ? report.latitude.toFixed(4) : "N/A";
    const lng = report.longitude ? report.longitude.toFixed(4) : "N/A";
    return `${lat}, ${lng}`;
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 ${className}`}
    >
      <div className="relative h-48">
        <img
          src={report.imageUrl}
          alt="Garbage report"
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2">{getStatusBadge()}</div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center text-sm text-gray-500">
            <MapPin size={16} className="mr-1" />
            <span>{formatLocation()}</span>
          </div>
          <div className="text-xs text-gray-500">
            {formatDate(report.timestamp)}
          </div>
        </div>
        <p className="text-gray-700 text-sm line-clamp-2 mb-2">
          {report.description}
        </p>
      </div>
    </div>
  );
};

export default ReportCard;
