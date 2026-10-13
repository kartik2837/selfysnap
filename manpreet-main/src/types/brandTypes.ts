export interface Brand {
  _id: string;
  seller?: {
    _id: string;
    sellerName: string;
    email: string;
    businessDetails?: { businessName: string };
  };
  name: string;
  certificateUrl: string;
  certificateNumber: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  rejectionReason?: string;
  approvedBy?: { name: string; email: string };
  approvedAt?: string;
  createdAt: string;
}