export interface DashboardStats {
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  lowStockCount: number;
}

export interface SalesData {
  _id: string;
  totalSales: number;
  orderCount: number;
}

export interface ProductStock {
  _id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  quantity: number;
}

export interface CategorySummary {
  _id: string;
  totalStock: number;
  totalValue: number;
}

export interface InventoryReportData {
  products: ProductStock[];
  categorySummary: CategorySummary;
}