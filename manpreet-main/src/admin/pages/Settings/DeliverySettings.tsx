// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";

// // ✅ Value imports
// import {
//   fetchDeliverySettings,
//   updateDeliverySettings,
//   resetStatus,
// } from "../../../Redux Toolkit/Admin/deliverySettingsSlice";

// // ✅ Type imports
// import type { DeliverySettings } from "../../../Redux Toolkit/Admin/deliverySettingsSlice";
// import type { AppDispatch, RootState } from "../../../Redux Toolkit/Store";

// export default function DeliverySettingsPage() {
//   const dispatch = useDispatch<AppDispatch>();

//   // ✅ Safe selector (agar slice register nahi hai to crash nahi hoga)
//   const deliveryState = useSelector(
//     (state: RootState) => state.deliverySettings
//   );

//   const settings = deliveryState?.settings ?? null;
//   const loading = deliveryState?.loading ?? false;
//   const updating = deliveryState?.updating ?? false;
//   const success = deliveryState?.success ?? false;
//   const error = deliveryState?.error ?? null;

//   const [form, setForm] = useState<DeliverySettings>({
//     deliveryFee: 50,
//     freeDeliveryThreshold: 1000,
//     codFee: 20,
//     codEnabled: true,
//     codMaxPrice: 10000,
//     taxPercent: 0,
//   });

//   // 1️⃣ Fetch settings on mount
//   useEffect(() => {
//     dispatch(fetchDeliverySettings());
//   }, [dispatch]);

//   // 2️⃣ Settings आने पर form भरो
//   useEffect(() => {
//     if (settings) {
//       setForm({
//         deliveryFee: settings.deliveryFee ?? 50,
//         freeDeliveryThreshold: settings.freeDeliveryThreshold ?? 1000,
//         codFee: settings.codFee ?? 20,
//         codEnabled: settings.codEnabled ?? true,
//         codMaxPrice: settings.codMaxPrice ?? 10000,
//         taxPercent: settings.taxPercent ?? 0,
//       });
//     }
//   }, [settings]);

//   // 3️⃣ Success message auto-hide
//   useEffect(() => {
//     if (success) {
//       const timer = setTimeout(() => dispatch(resetStatus()), 2500);
//       return () => clearTimeout(timer);
//     }
//   }, [success, dispatch]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value, type, checked } = e.target;
//     setForm((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : Number(value),
//     }));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     dispatch(updateDeliverySettings(form));
//   };

//   if (loading) {
//     return (
//       <div className="p-6 text-center text-gray-600">
//         Loading settings...
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 max-w-3xl mx-auto">
//       <h1 className="text-2xl font-bold mb-6">
//         Delivery &amp; COD Settings
//       </h1>

//       {/* ✅ Success Message */}
//       {success && (
//         <div className="mb-4 p-3 bg-green-100 text-green-700 rounded border border-green-300">
//           ✅ Settings updated successfully!
//         </div>
//       )}

//       {/* ❌ Error Message */}
//       {error && (
//         <div className="mb-4 p-3 bg-red-100 text-red-700 rounded border border-red-300">
//           ❌ {error}
//         </div>
//       )}

//       <form
//         onSubmit={handleSubmit}
//         className="space-y-5 bg-white p-6 rounded-lg shadow"
//       >
//         {/* Delivery Fee */}
//         <div>
//           <label className="block font-medium mb-1">
//             Delivery Fee (₹)
//           </label>
//           <input
//             type="number"
//             name="deliveryFee"
//             value={form.deliveryFee}
//             onChange={handleChange}
//             min={0}
//             className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         {/* Free Delivery Threshold */}
//         <div>
//           <label className="block font-medium mb-1">
//             Free Delivery Above (₹)
//           </label>
//           <input
//             type="number"
//             name="freeDeliveryThreshold"
//             value={form.freeDeliveryThreshold}
//             onChange={handleChange}
//             min={0}
//             className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <p className="text-xs text-gray-500 mt-1">
//             इस amount से ऊपर के order पर delivery FREE होगी
//           </p>
//         </div>

//         {/* COD Fee */}
//         <div>
//           <label className="block font-medium mb-1">
//             COD Fee (₹)
//           </label>
//           <input
//             type="number"
//             name="codFee"
//             value={form.codFee}
//             onChange={handleChange}
//             min={0}
//             className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <p className="text-xs text-gray-500 mt-1">
//             Cash on Delivery चुनने पर ये extra charge लगेगा
//           </p>
//         </div>

//         {/* Enable COD */}
//         <div className="flex items-center gap-3 p-3 bg-gray-50 rounded">
//           <input
//             id="codEnabled"
//             type="checkbox"
//             name="codEnabled"
//             checked={form.codEnabled}
//             onChange={handleChange}
//             className="h-5 w-5 cursor-pointer"
//           />
//           <label
//             htmlFor="codEnabled"
//             className="font-medium cursor-pointer"
//           >
//             Enable COD (Cash on Delivery)
//           </label>
//         </div>

//         {/* COD Max Price – 🔥 MAIN FEATURE */}
//         <div>
//           <label className="block font-medium mb-1">
//             COD Allowed Only Below (₹)
//           </label>
//           <input
//             type="number"
//             name="codMaxPrice"
//             value={form.codMaxPrice}
//             onChange={handleChange}
//             min={0}
//             className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <p className="text-xs text-red-500 mt-1">
//             ⚠️ इस amount से ऊपर का order → COD automatically DISABLE
//             हो जाएगा (सिर्फ prepaid)
//           </p>
//         </div>

//         {/* Tax Percent */}
//         <div>
//           <label className="block font-medium mb-1">
//             Tax Percent (%)
//           </label>
//           <input
//             type="number"
//             name="taxPercent"
//             value={form.taxPercent}
//             onChange={handleChange}
//             min={0}
//             max={100}
//             className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         {/* Submit */}
//         <button
//           type="submit"
//           disabled={updating}
//           className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
//         >
//           {updating ? "Saving..." : "Save Settings"}
//         </button>
//       </form>
//     </div>
//   );
// }




















import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// ✅ Value imports
import {
  fetchDeliverySettings,
  updateDeliverySettings,
  resetStatus,
} from "../../../Redux Toolkit/Admin/deliverySettingsSlice";

// ✅ Type imports
import type { DeliverySettings } from "../../../Redux Toolkit/Admin/deliverySettingsSlice";
import type { AppDispatch, RootState } from "../../../Redux Toolkit/Store";

/* 🔥 Icons */
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PaymentsIcon from "@mui/icons-material/Payments";
import RedeemIcon from "@mui/icons-material/Redeem";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";
import PercentIcon from "@mui/icons-material/Percent";
import SaveIcon from "@mui/icons-material/Save";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import RefreshIcon from "@mui/icons-material/Refresh";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import SettingsIcon from "@mui/icons-material/Settings";

export default function DeliverySettingsPage() {
  const dispatch = useDispatch<AppDispatch>();

  const deliveryState = useSelector(
    (state: RootState) => state.deliverySettings
  );

  const settings = deliveryState?.settings ?? null;
  const loading = deliveryState?.loading ?? false;
  const updating = deliveryState?.updating ?? false;
  const success = deliveryState?.success ?? false;
  const error = deliveryState?.error ?? null;

  const [form, setForm] = useState<DeliverySettings>({
    deliveryFee: 50,
    freeDeliveryThreshold: 1000,
    codFee: 20,
    codEnabled: true,
    codMaxPrice: 10000,
    taxPercent: 0,
  });

  useEffect(() => {
    dispatch(fetchDeliverySettings());
  }, [dispatch]);

  useEffect(() => {
    if (settings) {
      setForm({
        deliveryFee: settings.deliveryFee ?? 50,
        freeDeliveryThreshold: settings.freeDeliveryThreshold ?? 1000,
        codFee: settings.codFee ?? 20,
        codEnabled: settings.codEnabled ?? true,
        codMaxPrice: settings.codMaxPrice ?? 10000,
        taxPercent: settings.taxPercent ?? 0,
      });
    }
  }, [settings]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => dispatch(resetStatus()), 3000);
      return () => clearTimeout(timer);
    }
  }, [success, dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : Number(value),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(updateDeliverySettings(form));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          <LocalShippingIcon
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-blue-600"
            sx={{ fontSize: 24 }}
          />
        </div>
        <p className="mt-4 text-gray-600 font-semibold">
          Loading settings...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* ═══════════════ HEADER ═══════════════ */}
        <div className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-6 md:p-8 mb-6 overflow-hidden shadow-2xl">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-white rounded-full blur-3xl opacity-10"></div>
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white rounded-full blur-3xl opacity-10"></div>

          <div className="relative flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur border border-white/30 flex items-center justify-center">
                <SettingsIcon sx={{ fontSize: 30, color: "white" }} />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white">
                  Delivery & COD Settings
                </h1>
                <p className="text-white/80 text-sm mt-1">
                  Configure delivery fees, COD limits, and taxes
                </p>
              </div>
            </div>

            <button
              onClick={() => dispatch(fetchDeliverySettings())}
              className="flex items-center gap-2 bg-white/20 backdrop-blur hover:bg-white/30 text-white px-4 py-2.5 rounded-xl font-semibold text-sm transition-all border border-white/30"
            >
              <RefreshIcon sx={{ fontSize: 18 }} />
              Refresh
            </button>
          </div>
        </div>

        {/* ═══════════════ ALERTS ═══════════════ */}
        {success && (
          <div className="mb-6 flex items-center gap-3 p-4 bg-green-50 border-l-4 border-green-500 rounded-xl shadow-sm animate-slideDown">
            <CheckCircleIcon className="text-green-600" />
            <div>
              <p className="font-bold text-green-800 text-sm">
                Settings Updated Successfully!
              </p>
              <p className="text-green-600 text-xs mt-0.5">
                New settings have been applied immediately
              </p>
            </div>
          </div>
        )}

        {error && (
          <div className="mb-6 flex items-center gap-3 p-4 bg-red-50 border-l-4 border-red-500 rounded-xl shadow-sm animate-slideDown">
            <ErrorIcon className="text-red-600" />
            <div>
              <p className="font-bold text-red-800 text-sm">
                Error Occurred
              </p>
              <p className="text-red-600 text-xs mt-0.5">{error}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* ═══════════════ DELIVERY SECTION ═══════════════ */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                  <LocalShippingIcon sx={{ fontSize: 20, color: "white" }} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-800">
                    Delivery Charges
                  </h2>
                  <p className="text-xs text-gray-500">
                    Set shipping fees and free delivery limit
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Delivery Fee */}
              <div>
                <label className="flex items-center gap-2 font-semibold text-gray-700 mb-2 text-sm">
                  <MoneyOffIcon
                    sx={{ fontSize: 16 }}
                    className="text-blue-600"
                  />
                  Delivery Fee (₹)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">
                    ₹
                  </span>
                  <input
                    type="number"
                    name="deliveryFee"
                    value={form.deliveryFee}
                    onChange={handleChange}
                    min={0}
                    className="w-full pl-9 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all font-semibold text-gray-800"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Standard delivery fee applied to every order
                </p>
              </div>

              {/* Free Delivery Threshold */}
              <div>
                <label className="flex items-center gap-2 font-semibold text-gray-700 mb-2 text-sm">
                  <RedeemIcon
                    sx={{ fontSize: 16 }}
                    className="text-green-600"
                  />
                  Free Delivery Above (₹)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">
                    ₹
                  </span>
                  <input
                    type="number"
                    name="freeDeliveryThreshold"
                    value={form.freeDeliveryThreshold}
                    onChange={handleChange}
                    min={0}
                    className="w-full pl-9 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:bg-white transition-all font-semibold text-gray-800"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Orders above this amount get{" "}
                  <span className="text-green-600 font-bold">
                    FREE delivery
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* ═══════════════ COD SECTION ═══════════════ */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-orange-50 to-red-50 px-6 py-4 border-b border-gray-100">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                    <PaymentsIcon sx={{ fontSize: 20, color: "white" }} />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-gray-800">
                      Cash on Delivery (COD)
                    </h2>
                    <p className="text-xs text-gray-500">
                      Enable COD and set limits
                    </p>
                  </div>
                </div>

                {/* Toggle Switch */}
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="codEnabled"
                    checked={form.codEnabled}
                    onChange={handleChange}
                    className="sr-only peer"
                  />
                  <div className="w-14 h-7 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-orange-500 peer-checked:to-red-600"></div>
                  <span className="ml-3 text-sm font-bold text-gray-700">
                    {form.codEnabled ? "Enabled" : "Disabled"}
                  </span>
                </label>
              </div>
            </div>

            <div
              className={`p-6 grid grid-cols-1 md:grid-cols-2 gap-6 transition-opacity ${
                !form.codEnabled ? "opacity-50 pointer-events-none" : ""
              }`}
            >
              {/* COD Fee */}
              <div>
                <label className="flex items-center gap-2 font-semibold text-gray-700 mb-2 text-sm">
                  <PaymentsIcon
                    sx={{ fontSize: 16 }}
                    className="text-orange-600"
                  />
                  COD Fee (₹)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">
                    ₹
                  </span>
                  <input
                    type="number"
                    name="codFee"
                    value={form.codFee}
                    onChange={handleChange}
                    min={0}
                    disabled={!form.codEnabled}
                    className="w-full pl-9 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:bg-white transition-all font-semibold text-gray-800 disabled:cursor-not-allowed"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Extra charge when customer selects COD
                </p>
              </div>

              {/* COD Max Price */}
              <div>
                <label className="flex items-center gap-2 font-semibold text-gray-700 mb-2 text-sm">
                  <WarningAmberIcon
                    sx={{ fontSize: 16 }}
                    className="text-red-600"
                  />
                  COD Allowed Below (₹)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">
                    ₹
                  </span>
                  <input
                    type="number"
                    name="codMaxPrice"
                    value={form.codMaxPrice}
                    onChange={handleChange}
                    min={0}
                    disabled={!form.codEnabled}
                    className="w-full pl-9 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-red-500 focus:bg-white transition-all font-semibold text-gray-800 disabled:cursor-not-allowed"
                  />
                </div>

                {/* Warning Box */}
                <div className="mt-3 flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <WarningAmberIcon
                    sx={{ fontSize: 16 }}
                    className="text-red-500 mt-0.5 flex-shrink-0"
                  />
                  <p className="text-xs text-red-700 font-medium">
                    Orders above this amount will have COD{" "}
                    <strong>automatically disabled</strong> — only prepaid
                    allowed
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ═══════════════ TAX SECTION ═══════════════ */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 px-6 py-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                  <PercentIcon sx={{ fontSize: 20, color: "white" }} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-800">
                    Tax Settings
                  </h2>
                  <p className="text-xs text-gray-500">
                    Configure GST / tax percentage
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="max-w-md">
                <label className="flex items-center gap-2 font-semibold text-gray-700 mb-2 text-sm">
                  <PercentIcon
                    sx={{ fontSize: 16 }}
                    className="text-purple-600"
                  />
                  Tax Percent (%)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="taxPercent"
                    value={form.taxPercent}
                    onChange={handleChange}
                    min={0}
                    max={100}
                    className="w-full pl-4 pr-10 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 focus:bg-white transition-all font-semibold text-gray-800"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">
                    %
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Tax percentage applied to orders (0-100)
                </p>
              </div>
            </div>
          </div>

          {/* ═══════════════ SUMMARY PREVIEW ═══════════════ */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <InfoOutlinedIcon
                sx={{ fontSize: 20 }}
                className="text-blue-600"
              />
              <h3 className="font-bold text-gray-800 text-sm">
                Current Configuration Summary
              </h3>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl p-3 border border-gray-200">
                <p className="text-[10px] text-gray-500 font-semibold uppercase">
                  Delivery Fee
                </p>
                <p className="text-lg font-bold text-blue-600">
                  ₹{form.deliveryFee}
                </p>
              </div>
              <div className="bg-white rounded-xl p-3 border border-gray-200">
                <p className="text-[10px] text-gray-500 font-semibold uppercase">
                  Free Above
                </p>
                <p className="text-lg font-bold text-green-600">
                  ₹{form.freeDeliveryThreshold}
                </p>
              </div>
              <div className="bg-white rounded-xl p-3 border border-gray-200">
                <p className="text-[10px] text-gray-500 font-semibold uppercase">
                  COD Status
                </p>
                <p
                  className={`text-lg font-bold ${
                    form.codEnabled ? "text-orange-600" : "text-red-600"
                  }`}
                >
                  {form.codEnabled ? "✓ ON" : "✗ OFF"}
                </p>
              </div>
              <div className="bg-white rounded-xl p-3 border border-gray-200">
                <p className="text-[10px] text-gray-500 font-semibold uppercase">
                  COD Fee
                </p>
                <p className="text-lg font-bold text-orange-600">
                  ₹{form.codFee}
                </p>
              </div>
              <div className="bg-white rounded-xl p-3 border border-gray-200">
                <p className="text-[10px] text-gray-500 font-semibold uppercase">
                  COD Max
                </p>
                <p className="text-lg font-bold text-red-600">
                  ₹{form.codMaxPrice}
                </p>
              </div>
              <div className="bg-white rounded-xl p-3 border border-gray-200">
                <p className="text-[10px] text-gray-500 font-semibold uppercase">
                  Tax
                </p>
                <p className="text-lg font-bold text-purple-600">
                  {form.taxPercent}%
                </p>
              </div>
            </div>
          </div>

          {/* ═══════════════ SAVE BUTTON ═══════════════ */}
          <div className="sticky bottom-4 z-10">
            <button
              type="submit"
              disabled={updating}
              className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white py-4 rounded-2xl font-bold text-base shadow-2xl shadow-blue-500/40 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3"
            >
              {updating ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Saving Settings...
                </>
              ) : (
                <>
                  <SaveIcon sx={{ fontSize: 22 }} />
                  Save All Settings
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}