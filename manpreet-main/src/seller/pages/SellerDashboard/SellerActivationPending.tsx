import { useNavigate } from "react-router-dom";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LogoutIcon from "@mui/icons-material/Logout";
import StorefrontIcon from "@mui/icons-material/Storefront";
import BlockIcon from "@mui/icons-material/Block";
import CancelIcon from "@mui/icons-material/Cancel";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ScheduleIcon from "@mui/icons-material/Schedule";
import DescriptionIcon from "@mui/icons-material/Description";
import VerifiedIcon from "@mui/icons-material/Verified";

interface ActivationPendingProps {
  sellerName?: string;
  sellerEmail?: string;
  accountStatus?: string;
}

const SUPPORT_PHONE = "+91 99922 88843";
const SUPPORT_PHONE_RAW = "9992288843";
const SUPPORT_EMAIL = "support@selfysnap.com";

const SellerActivationPending = ({
  sellerName = "Seller",
  sellerEmail = "",
  accountStatus = "PENDING_VERIFICATION",
}: ActivationPendingProps) => {
  const navigate = useNavigate();

  const getStatusConfig = () => {
    switch (accountStatus) {
      case "PENDING_VERIFICATION":
        return {
          title: "Verification in Progress",
          subtitle: "Your documents are being verified",
          gradient: "from-yellow-400 to-orange-500",
          accent: "text-orange-600",
          accentBg: "bg-orange-50",
          accentBorder: "border-orange-200",
          badge: "bg-yellow-100 text-yellow-800 border-yellow-200",
          icon: <HourglassEmptyIcon sx={{ fontSize: 40 }} />,
          time: "24-48 hours",
          message:
            "We're reviewing your business details. You'll receive an email notification once approved.",
        };
      case "SUSPENDED":
        return {
          title: "Account Suspended",
          subtitle: "Temporarily suspended",
          gradient: "from-orange-500 to-red-500",
          accent: "text-red-600",
          accentBg: "bg-red-50",
          accentBorder: "border-red-200",
          badge: "bg-orange-100 text-orange-800 border-orange-200",
          icon: <PauseCircleIcon sx={{ fontSize: 40 }} />,
          time: "Contact support",
          message:
            "Your account is temporarily suspended. Please contact our support team for more information.",
        };
      case "BANNED":
        return {
          title: "Account Banned",
          subtitle: "Permanently banned",
          gradient: "from-red-600 to-red-900",
          accent: "text-red-700",
          accentBg: "bg-red-50",
          accentBorder: "border-red-200",
          badge: "bg-red-100 text-red-800 border-red-200",
          icon: <BlockIcon sx={{ fontSize: 40 }} />,
          time: "Contact support",
          message:
            "Your account has been permanently banned due to policy violations. Please contact our support team.",
        };
      default:
        return {
          title: "Verification in Progress",
          subtitle: "Your documents are being verified",
          gradient: "from-yellow-400 to-orange-500",
          accent: "text-orange-600",
          accentBg: "bg-orange-50",
          accentBorder: "border-orange-200",
          badge: "bg-yellow-100 text-yellow-800 border-yellow-200",
          icon: <HourglassEmptyIcon sx={{ fontSize: 40 }} />,
          time: "24-48 hours",
          message:
            "We're reviewing your business details. You'll receive an email notification once approved.",
        };
    }
  };

  const status = getStatusConfig();
  const isPending = accountStatus === "PENDING_VERIFICATION";

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("userRole");
    navigate("/");
  };

  return (
    /* 🔥 FULL SCREEN — Dashboard style */
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-center">
      <div className="w-full max-w-6xl">
        {/* ═══ TOP BANNER ═══ */}
        <div
          className={`bg-gradient-to-r ${status.gradient} rounded-2xl px-6 py-4 mb-5 flex items-center justify-between shadow-lg relative overflow-hidden`}
        >
          <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />

          <div className="relative z-10 flex items-center gap-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-3 text-white">
              {status.icon}
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-white">
                {status.title}
              </h1>
              <p className="text-white/90 text-sm mt-0.5">
                {status.subtitle}
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="relative z-10 flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-bold text-sm px-4 py-2 rounded-xl transition-all"
          >
            <LogoutIcon sx={{ fontSize: 18 }} />
            Logout
          </button>
        </div>

        {/* ═══ DASHBOARD GRID ═══ */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* ─────────── LEFT COLUMN (2/3) ─────────── */}
          <div className="lg:col-span-2 space-y-5">
            {/* Seller Account Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                <StorefrontIcon sx={{ fontSize: 18, color: "#2874f0" }} />
                Seller Account
              </h2>

              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                  {sellerName.charAt(0).toUpperCase()}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-gray-800 truncate">
                    {sellerName}
                  </h3>
                  {sellerEmail && (
                    <p className="text-sm text-gray-500 truncate">
                      {sellerEmail}
                    </p>
                  )}
                  <div className="mt-2">
                    <span
                      className={`inline-flex items-center gap-1.5 ${status.badge} border text-xs font-bold px-3 py-1 rounded-full`}
                    >
                      {status.icon}
                      {accountStatus.replace(/_/g, " ")}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Message Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-start gap-3">
                <div
                  className={`${status.accentBg} rounded-xl p-3 flex-shrink-0`}
                >
                  <DescriptionIcon
                    sx={{ fontSize: 24 }}
                    className={status.accent}
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800 text-base mb-1">
                    What's happening?
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {status.message}
                  </p>

                  {isPending && (
                    <div
                      className={`mt-4 flex items-center gap-2 ${status.accentBg} border ${status.accentBorder} rounded-xl px-4 py-3`}
                    >
                      <ScheduleIcon
                        sx={{ fontSize: 20 }}
                        className={status.accent}
                      />
                      <p className="text-sm text-gray-700">
                        Expected approval in{" "}
                        <strong className={status.accent}>
                          {status.time}
                        </strong>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Steps — 3 columns */}
            {isPending && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">
                  What happens next?
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                    <div className="bg-blue-500 rounded-full w-8 h-8 flex items-center justify-center text-white text-sm font-bold mb-3">
                      1
                    </div>
                    <p className="font-bold text-gray-800 text-sm">
                      Document Verification
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      GST, PAN & Bank details check
                    </p>
                  </div>

                  <div className="bg-purple-50 border border-purple-100 rounded-xl p-4">
                    <div className="bg-purple-500 rounded-full w-8 h-8 flex items-center justify-center text-white text-sm font-bold mb-3">
                      2
                    </div>
                    <p className="font-bold text-gray-800 text-sm">
                      Email Notification
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      You'll get approval email
                    </p>
                  </div>

                  <div className="bg-green-50 border border-green-100 rounded-xl p-4">
                    <div className="bg-green-500 rounded-full w-8 h-8 flex items-center justify-center text-white text-sm font-bold mb-3">
                      3
                    </div>
                    <p className="font-bold text-gray-800 text-sm">
                      Start Selling
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      List products & earn
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ─────────── RIGHT COLUMN (1/3) ─────────── */}
          <div className="space-y-5">
            {/* Support Card */}
            <div className="bg-gradient-to-br from-orange-500 to-pink-500 rounded-2xl shadow-lg p-6 text-white relative overflow-hidden">
              <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
              <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-white/10 blur-2xl" />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-2">
                    <SupportAgentIcon sx={{ fontSize: 24 }} />
                  </div>
                  <div>
                    <h3 className="font-bold text-base">Need Help?</h3>
                    <p className="text-xs text-white/80">
                      We're here for you
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <a
                    href={`tel:+91${SUPPORT_PHONE_RAW}`}
                    className="flex items-center gap-3 bg-white/15 hover:bg-white/25 backdrop-blur-sm rounded-xl p-3 transition-all"
                  >
                    <div className="bg-green-500 rounded-lg p-2 flex-shrink-0">
                      <PhoneIcon sx={{ fontSize: 16 }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] uppercase tracking-wider text-white/70 font-semibold">
                        Call Us
                      </p>
                      <p className="text-xs font-bold truncate">
                        {SUPPORT_PHONE}
                      </p>
                    </div>
                  </a>

                  <a
                    href={`https://wa.me/91${SUPPORT_PHONE_RAW}?text=Hi, I need help (${sellerEmail})`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-white/15 hover:bg-white/25 backdrop-blur-sm rounded-xl p-3 transition-all"
                  >
                    <div className="bg-green-600 rounded-lg p-2 flex-shrink-0">
                      <WhatsAppIcon sx={{ fontSize: 16 }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] uppercase tracking-wider text-white/70 font-semibold">
                        WhatsApp
                      </p>
                      <p className="text-xs font-bold truncate">
                        Chat with us
                      </p>
                    </div>
                  </a>

                  <a
                    href={`mailto:${SUPPORT_EMAIL}?subject=Seller Query&body=Email: ${sellerEmail}`}
                    className="flex items-center gap-3 bg-white/15 hover:bg-white/25 backdrop-blur-sm rounded-xl p-3 transition-all"
                  >
                    <div className="bg-blue-500 rounded-lg p-2 flex-shrink-0">
                      <EmailIcon sx={{ fontSize: 16 }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] uppercase tracking-wider text-white/70 font-semibold">
                        Email Us
                      </p>
                      <p className="text-xs font-bold truncate">
                        {SUPPORT_EMAIL}
                      </p>
                    </div>
                  </a>
                </div>

                <p className="text-[10px] text-white/70 text-center mt-4">
                  Available 10 AM - 7 PM (Mon-Sat)
                </p>
              </div>
            </div>

            {/* Info Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <div className="flex items-center gap-2 mb-4">
                <VerifiedIcon sx={{ fontSize: 20, color: "#10b981" }} />
                <h3 className="font-bold text-gray-800 text-sm">
                  Why Verification?
                </h3>
              </div>

              <ul className="space-y-3 text-xs text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 font-bold mt-0.5">✓</span>
                  <span>Ensures safe transactions for buyers & sellers</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 font-bold mt-0.5">✓</span>
                  <span>Prevents fraud and fake sellers</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 font-bold mt-0.5">✓</span>
                  <span>Builds trust in the marketplace</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 font-bold mt-0.5">✓</span>
                  <span>Required by government regulations</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
       
      </div>
    </div>
  );
};

export default SellerActivationPending;