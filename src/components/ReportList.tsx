import React, { useEffect, useState } from "react";
import { ReportData, useReportService } from "../services/reportService";
import ReportCard from "./ReportCard";
import { AlertTriangle, CheckCircle, Clock, FilterX } from "lucide-react";

interface ReportListProps {
  limit?: number;
  showFilter?: boolean;
}

const ReportList: React.FC<ReportListProps> = ({
  limit,
  showFilter = true,
}) => {
  const [reports, setReports] = useState<ReportData[]>([]);
  const [filteredReports, setFilteredReports] = useState<ReportData[]>([]);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const reportService = useReportService();

  useEffect(() => {
    const fetchReports = async () => {
      setIsLoading(true);
      try {
        const fetchedReports = limit
          ? await reportService.getRecentReports(limit)
          : await reportService.getReports();

        setReports(fetchedReports);
        setFilteredReports(fetchedReports);
      } catch (error) {
        console.error("Error fetching reports:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReports();
  }, [limit]);

  useEffect(() => {
    if (activeFilter) {
      setFilteredReports(
        reports.filter((report) => report.status === activeFilter)
      );
    } else {
      setFilteredReports(reports);
    }
  }, [activeFilter, reports]);

  return (
    <div>
      {showFilter && (
        <div className="mb-6 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveFilter(null)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeFilter === null
                ? "bg-gray-800 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            All Reports
          </button>
          <button
            onClick={() => setActiveFilter("pending")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1.5 ${
              activeFilter === "pending"
                ? "bg-error-500 text-white"
                : "bg-error-100 text-error-800 hover:bg-error-200"
            }`}
          >
            <AlertTriangle size={16} />
            Pending
          </button>
          <button
            onClick={() => setActiveFilter("in-progress")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1.5 ${
              activeFilter === "in-progress"
                ? "bg-warning-500 text-white"
                : "bg-warning-100 text-warning-800 hover:bg-warning-200"
            }`}
          >
            <Clock size={16} />
            In Progress
          </button>
          <button
            onClick={() => setActiveFilter("completed")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1.5 ${
              activeFilter === "completed"
                ? "bg-success-500 text-white"
                : "bg-success-100 text-success-800 hover:bg-success-200"
            }`}
          >
            <CheckCircle size={16} />
            Completed
          </button>
        </div>
      )}

      {isLoading ? (
        <div className="py-20 flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600">Loading reports...</p>
          </div>
        </div>
      ) : filteredReports.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReports.map((report) => (
            <ReportCard key={report.id} report={report} />
          ))}
        </div>
      ) : (
        <div className="py-16 flex flex-col items-center justify-center bg-gray-50 rounded-lg border border-gray-200">
          <FilterX size={48} className="text-gray-400 mb-3" />
          <h3 className="text-lg font-medium text-gray-700">
            No reports found
          </h3>
          <p className="text-gray-500 mt-1 text-center max-w-md">
            {activeFilter
              ? `There are no ${activeFilter} reports available.`
              : "There are no reports available yet."}
          </p>
          {activeFilter && (
            <button
              onClick={() => setActiveFilter(null)}
              className="mt-4 px-4 py-2 text-sm font-medium text-primary-600 bg-primary-50 rounded-md hover:bg-primary-100 transition-colors"
            >
              View all reports
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ReportList;
