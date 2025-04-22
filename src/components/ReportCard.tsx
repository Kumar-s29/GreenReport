import React, { useState } from "react";
import { ReportData } from "../services/reportService";
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  MapPin,
  Trash2,
} from "lucide-react";
import axios from "axios";

interface ReportCardProps {
  report: ReportData;
  className?: string;
  onDelete: (id: string) => void; // Pass delete handler from parent
}

const ReportCard: React.FC<ReportCardProps> = ({
  report,
  className = "",
  onDelete,
}) => {
  const [isDeleting, setIsDeleting] = useState(false); // Track delete state for loading indicator
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Error message state

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

  const handleDelete = async (_id) => {
    try {
      setIsDeleting(true); // Set loading state
      setErrorMessage(null); // Reset any previous errors
      // Ensure you're using the correct `id` field (use `_id` if you're using MongoDB/Mongoose)
      await axios.delete(`http://localhost:5000/api/reports/${report._id}`);
      onDelete(report._id); // Notify parent component to update the UI
    } catch (error) {
      setErrorMessage("Error deleting report. Please try again."); // Display error message
    } finally {
      setIsDeleting(false); // Reset loading state
    }
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 ${className}`}
    >
      <div className="relative h-48">
        <img
          src={`http://localhost:5000${report.imageUrl}`}
          alt="Garbage report"
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2">{getStatusBadge()}</div>
        <button
          onClick={handleDelete}
          className="absolute top-2 left-2 bg-red-500 text-white p-2 rounded-full"
          disabled={isDeleting} // Disable button when deleting
        >
          {isDeleting ? <span>Deleting...</span> : <Trash2 size={16} />}
        </button>
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

        {/* Display error message if there is one */}
        {errorMessage && (
          <div className="text-red-500 text-sm mt-2">{errorMessage}</div>
        )}
      </div>
    </div>
  );
};

export default ReportCard;
