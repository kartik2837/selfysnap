import { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Box, Button, Divider, CircularProgress } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import type { EmiPlan, EmiPlansResponse, EmiModalProps } from '../../types/emi';

const EmiModal = ({ price, onClose }: EmiModalProps) => {
  const [plans, setPlans] = useState<EmiPlan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<EmiPlan | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPlans = async (): Promise<void> => {
      try {
        const { data } = await axios.get<EmiPlansResponse>(
          `/api/payment/emi-plans?amount=${price * 100}`
        );
        setPlans(data.plans || []);
      } catch (err) {
        console.error('EMI plans error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPlans();
  }, [price]);

  // Bank-wise group
  const groupedPlans: Record<string, EmiPlan[]> = plans.reduce(
    (acc, plan) => {
      if (!acc[plan.bankName]) acc[plan.bankName] = [];
      acc[plan.bankName].push(plan);
      return acc;
    },
    {} as Record<string, EmiPlan[]>
  );

  return (
    <Modal open={true} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '95%', sm: 520 },
          maxHeight: '85vh',
          bgcolor: 'white',
          borderRadius: 2,
          boxShadow: 24,
          display: 'flex',
          flexDirection: 'column',
          outline: 'none',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <CreditCardIcon sx={{ color: '#2874f0' }} />
            <h3 className="font-bold text-lg m-0">EMI Plans</h3>
          </div>
          <Button onClick={onClose} sx={{ minWidth: 'auto', p: 0.5 }}>
            <CloseIcon />
          </Button>
        </div>

        {/* Price Banner */}
        <div className="px-4 py-3 bg-gray-50 border-b">
          <p className="text-sm text-gray-600">
            Product Price:{' '}
            <span className="font-bold text-gray-900 text-base">
              ₹{price.toLocaleString('en-IN')}
            </span>
          </p>
        </div>

        {/* Plans List */}
        <div className="flex-1 overflow-y-auto p-4">
          {loading ? (
            <div className="flex justify-center py-10">
              <CircularProgress />
            </div>
          ) : plans.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              <p className="font-semibold">No EMI plans available</p>
              <p className="text-xs mt-1">
                EMI is available on orders above ₹3,000
              </p>
            </div>
          ) : (
            Object.entries(groupedPlans).map(([bankName, bankPlans]) => (
              <div key={bankName} className="mb-4">
                <p className="text-sm font-bold text-blue-600 mb-2">
                  {bankName}
                </p>
                <div className="space-y-2">
                  {bankPlans.map((plan) => {
                    const isSelected =
                      selectedPlan?.bankCode === plan.bankCode &&
                      selectedPlan?.tenure === plan.tenure;
                    return (
                      <div
                        key={`${plan.bankCode}-${plan.tenure}`}
                        onClick={() => setSelectedPlan(plan)}
                        className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                          isSelected
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-blue-300'
                        }`}
                      >
                        <input
                          type="radio"
                          checked={isSelected}
                          onChange={() => setSelectedPlan(plan)}
                        />
                        <div className="flex-1 flex items-center justify-between text-sm">
                          <span className="font-semibold">
                            {plan.tenure} months
                          </span>
                          <span className="font-bold text-gray-800">
                            ₹{(plan.emiAmount / 100).toFixed(0)}/mo
                          </span>
                          <span className="text-gray-500 text-xs">
                            @ {plan.interestRate}%
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {selectedPlan && (
          <>
            <Divider />
            <div className="p-4 bg-gray-50">
              <div className="text-sm text-gray-700 mb-3">
                <p className="font-semibold">
                  {selectedPlan.bankName} — {selectedPlan.tenure} months
                </p>
                <p className="text-xs mt-1">
                  Monthly EMI:{' '}
                  <span className="font-bold">
                    ₹{(selectedPlan.emiAmount / 100).toFixed(0)}
                  </span>
                </p>
                <p className="text-xs">
                  Total Payable:{' '}
                  <span className="font-bold">
                    ₹{(selectedPlan.totalPayable / 100).toFixed(0)}
                  </span>
                </p>
              </div>
              <Button
                fullWidth
                variant="contained"
                onClick={onClose}
                sx={{
                  bgcolor: '#fb641b',
                  '&:hover': { bgcolor: '#e55a15' },
                  fontWeight: 'bold',
                }}
              >
                Continue with EMI
              </Button>
            </div>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default EmiModal;