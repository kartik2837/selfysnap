// src/services/report.api.ts

import { api } from "../Config/Api";

export const fetchDashboard = async () => {
  const response = await api.get("/api/reports/dashboard");
  return response.data.data;
};

export const fetchSalesReport = async (startDate: string, endDate: string) => {
  const response = await api.get("/api/reports/sales", {
    params: { startDate, endDate },
  });
  return response.data.data;
};

export const fetchInventoryReport = async () => {
  const response = await api.get("/api/reports/inventory");
  return response.data.data;
};