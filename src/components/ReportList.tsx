import React, { useState, useEffect } from "react";
import ReportCard from "../components/ReportCard"; // Assuming you have ReportCard as a single card component
import { useReportService } from "../services/reportService";

const ReportsListPage: React.FC = () => {
  const [reports, setReports] = useState<any[]>([]);
  const { getReports, deleteReport } = useReportService(); // Assuming deleteReport is a service to delete reports

  // Fetch reports on mount
  useEffect(() => {
    const fetchReports = async () => {
      const data = await getReports();
      setReports(data);
    };
    fetchReports();
  }, [getReports]);

  // Handle report deletion
  const handleDelete = async (id: string) => {
    try {
      await deleteReport(id); // Call backend to delete the report
      setReports((prevReports) =>
        prevReports.filter((report) => report.id !== id)
      ); // Remove report from UI
    } catch (error) {
      console.error("Error deleting report:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 sm:py-12 animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Garbage Reports
        </h1>
        <p className="text-gray-600">
          Browse all submitted reports and track cleanup progress.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {reports.map((report) => (
          <ReportCard key={report.id} report={report} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};

export default ReportsListPage;
