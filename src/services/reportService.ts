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

const API_BASE_URL = "http://localhost:5000/api/reports";

export const useReportService = () => {
  const getReports = async (): Promise<ReportData[]> => {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  };

  const getRecentReports = async (limit: number): Promise<ReportData[]> => {
    const response = await axios.get(`${API_BASE_URL}?limit=${limit}`);
    return response.data;
  };

  const addReport = async (formData: FormData): Promise<ReportData> => {
    const response = await axios.post(API_BASE_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  };

  return {
    getReports,
    getRecentReports,
    addReport, // ✅ Make sure this is included!
  };
};
