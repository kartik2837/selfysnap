// import { useEffect } from 'react';

// interface EmiWidgetProps {
//   price: number; // Rupees me (e.g. 11000)
// }

// const EmiBadge = ({ price }: EmiWidgetProps) => {
//   useEffect(() => {
//     if (!price || price < 5000) return;   // 🔥 3000 → 5000

//     const WIDGET_ID = 'razorpay-affordability-widget';

//     const initWidget = () => {
//       const existing = document.getElementById(WIDGET_ID);
//       if (existing) existing.innerHTML = '';

//       try {
//         // @ts-ignore
//         const widgetConfig = {
//           key: 'rzp_live_SAkK1UBHwykxcB',
//           amount: price * 100,
//         };

//         // @ts-ignore
//         const rzpAffordabilitySuite = new window.RazorpayAffordabilitySuite(
//           widgetConfig
//         );
//         rzpAffordabilitySuite.render();
//       } catch (err) {
//         console.error('EMI Widget render error:', err);
//       }
//     };

//     const scriptId = 'rzp-affordability-script';
//     if (!document.getElementById(scriptId)) {
//       const script = document.createElement('script');
//       script.id = scriptId;
//       script.src =
//         'https://cdn.razorpay.com/widgets/affordability/affordability.js';
//       script.async = true;
//       script.onload = () => {
//         console.log('✅ Razorpay widget script loaded');
//         initWidget();
//       };
//       script.onerror = () => console.error('❌ Widget script load failed');
//       document.head.appendChild(script);
//     } else {
//       initWidget();
//     }
//   }, [price]);

//   if (!price || price < 5000) return null;   // 🔥 3000 → 5000

//   return <div id="razorpay-affordability-widget" className="mt-4" />;
// };

// export default EmiBadge;






import { useState } from 'react';
import CreditCardIcon from '@mui/icons-material/CreditCard';

interface EmiPlan {
  bankCode: string;
  bankName: string;
  tenure: number;
  interestRate: number;
  emiAmount: number;
  totalPayable: number;
}

interface EmiBadgeProps {
  price: number;
  onSelectPlan?: (plan: EmiPlan | null) => void;
}

const BANKS = [
  { code: 'ICIC', name: 'ICICI Bank' },
  { code: 'UTIB', name: 'Axis Bank' },
  { code: 'AMEX', name: 'American Express' },
  { code: 'RATN', name: 'RBL Bank' },
  { code: 'KKBK', name: 'Kotak Mahindra Bank' },
  { code: 'INDB', name: 'IndusInd Bank' },
  { code: 'HSBC', name: 'HSBC Bank' },
  { code: 'SCBL', name: 'Standard Chartered' },
  { code: 'YESB', name: 'Yes Bank' },
  { code: 'BARB', name: 'BOBCARD' },
  { code: 'FDRL', name: 'Federal Bank' },
  { code: 'IDFB', name: 'IDFC First Bank' },
  { code: 'AUBL', name: 'AU Small Finance Bank' },
];

const TENURES = [3, 6, 9, 12];
const RATES: Record<number, number> = { 3: 13, 6: 14, 9: 14.5, 12: 15 };

const calcEmi = (principal: number, months: number, annualRate: number): number => {
  const monthlyRate = annualRate / 12 / 100;
  if (monthlyRate === 0) return Math.round(principal / months);
  return Math.round(
    (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1)
  );
};

const EmiBadge = ({ price, onSelectPlan }: EmiBadgeProps) => {
  const [selectedBank, setSelectedBank] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<EmiPlan | null>(null);

  if (!price || price < 5000) return null;

  const allPlans: EmiPlan[] = [];
  for (const bank of BANKS) {
    for (const tenure of TENURES) {
      const rate = RATES[tenure];
      const emi = calcEmi(price, tenure, rate);
      allPlans.push({
        bankCode: bank.code,
        bankName: bank.name,
        tenure,
        interestRate: rate,
        emiAmount: emi,
        totalPayable: emi * tenure,
      });
    }
  }

  const bankPlans = selectedBank
    ? allPlans.filter((p) => p.bankCode === selectedBank)
    : [];

  const lowestEmi = allPlans.reduce((min, p) =>
    p.emiAmount < min.emiAmount ? p : min
  );

  const handleSelectPlan = (plan: EmiPlan) => {
    setSelectedPlan(plan);
    setSelectedBank(null);
    if (onSelectPlan) {
      try {
        onSelectPlan(plan);
      } catch (e) {
        console.error('onSelectPlan error:', e);
      }
    }
  };

  const handleClearPlan = () => {
    setSelectedPlan(null);
    if (onSelectPlan) {
      try {
        onSelectPlan(null);
      } catch (e) {
        console.error('onSelectPlan error:', e);
      }
    }
  };

  return (
    <div className="mt-4 border border-blue-200 rounded-xl overflow-hidden bg-white">
      {/* Header */}
      <div className="p-3 bg-blue-50 flex items-center gap-3">
        <div className="bg-blue-500 rounded-lg p-2 flex-shrink-0">
          <CreditCardIcon sx={{ color: 'white', fontSize: 20 }} />
        </div>
        <div className="flex-1">
          <p className="text-xs text-gray-600 font-semibold">
            EMI available on {BANKS.length} banks
          </p>
          <p className="text-sm font-bold text-gray-800">
            From{' '}
            <span className="text-blue-600">
              ₹{lowestEmi.emiAmount.toLocaleString('en-IN')}/month
            </span>
          </p>
        </div>
      </div>

      {/* Selected Plan Chip */}
      {selectedPlan && (
        <div className="px-3 py-2 bg-green-50 border-t border-green-200 flex items-center gap-2">
          <span className="text-xs text-green-700 font-semibold">✓</span>
          <span className="text-xs font-bold text-green-800 flex-1">
            {selectedPlan.bankName} — {selectedPlan.tenure}M — ₹
            {selectedPlan.emiAmount.toLocaleString('en-IN')}/mo
          </span>
          <button
            type="button"
            onClick={handleClearPlan}
            className="text-red-600 font-bold text-sm hover:text-red-800"
          >
            ✕
          </button>
        </div>
      )}

      {/* Banks list */}
      {!selectedBank && (
        <div className="p-3 border-t border-blue-100">
          <p className="text-xs text-gray-500 font-semibold mb-2">
            {selectedPlan ? 'Change bank:' : 'Select a bank:'}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {BANKS.map((bank) => (
              <button
                type="button"
                key={bank.code}
                onClick={() => setSelectedBank(bank.code)}
                className="text-xs font-semibold text-gray-700 bg-gray-100 px-2.5 py-1 rounded-full border border-gray-200 hover:bg-blue-100 hover:border-blue-300 transition-all"
              >
                {bank.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Plans for selected bank */}
      {selectedBank && (
        <div className="border-t border-blue-100">
          <div className="p-2 flex items-center gap-2 bg-blue-50 border-b border-blue-100">
            <button
              type="button"
              onClick={() => setSelectedBank(null)}
              className="text-xs font-bold text-blue-600 hover:underline"
            >
              ← Back
            </button>
            <p className="text-sm font-bold text-gray-800">
              {BANKS.find((b) => b.code === selectedBank)?.name}
            </p>
          </div>
          <div className="p-3 space-y-2">
            {bankPlans.map((plan) => (
              <button
                type="button"
                key={`${plan.bankCode}-${plan.tenure}`}
                onClick={() => handleSelectPlan(plan)}
                className="w-full flex items-center justify-between p-2.5 border border-gray-200 rounded-lg text-sm hover:border-blue-300 hover:bg-blue-50 transition-all"
              >
                <span className="font-semibold text-gray-700">
                  {plan.tenure} months
                </span>
                <span className="font-bold text-gray-900">
                  ₹{plan.emiAmount.toLocaleString('en-IN')}/mo
                </span>
                <span className="text-gray-500 text-xs">
                  @ {plan.interestRate}%
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EmiBadge;  