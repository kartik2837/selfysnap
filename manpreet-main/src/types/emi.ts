export interface EmiPlan {
  bankCode: string;
  bankName: string;
  tenure: number;
  interestRate: number;
  emiAmount: number;    // paise me
  totalPayable: number; // paise me
  isNoCost: boolean;
}

export interface EmiPlansResponse {
  success: boolean;
  plans: EmiPlan[];
}

export interface EmiBadgeProps {
  price: number; // rupees me
}

export interface EmiModalProps {
  price: number; // rupees me
  onClose: () => void;
}