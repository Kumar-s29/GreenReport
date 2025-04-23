import axios from "axios";

export interface ReportData {
  id?: string;
  imageUrl: string;
  location: {
    lat: number;
    lng: number;
  };
  description: string;
  status: "pending" | "in_progress" | "completed";
  createdAt?: string;
}

// Use environment variable for flexibility
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export const useReportService = () => {
  const getReports = async (): Promise<ReportData[]> => {
    try {
      const response = await axios.get(API_BASE_URL + "/reports");
      return response.data;
    } catch (error) {
      console.error("Error fetching reports:", error);
      throw error;
    }
  };

  const getRecentReports = async (limit: number): Promise<ReportData[]> => {
    try {
      const response = await axios.get(
        `${API_BASE_URL + "/reports"}?limit=${limit}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching recent reports:", error);
      throw error;
    }
  };

  const addReport = async (formData: FormData): Promise<ReportData> => {
    try {
      const response = await axios.post(API_BASE_URL + "/reports", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error adding report:", error);
      throw error;
    }
  };

  return {
    getReports,
    getRecentReports,
    addReport,
  };
};
