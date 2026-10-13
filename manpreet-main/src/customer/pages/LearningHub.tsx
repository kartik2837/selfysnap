import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaVideo,
  FaArrowLeft,
  FaArrowRight,
  FaClock,
  FaEye,
  FaSearch,
  FaGraduationCap,
  FaAward,
  FaUsers,
  FaLaptop,
  FaPlay,
  FaMoneyBillWave,
  FaUserTie,
} from "react-icons/fa";

interface LearningItem {
  id: number;
  category: string;
  title: string;
  description: string;
  fullDescription: string;
  duration: string;
  level: string;
  views: string;
  color: string;
  videoUrl: string;
  steps: string[];
}

const LearningHub: React.FC = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "all", label: "All Videos", icon: <FaGraduationCap /> },
    { id: "seller", label: "Seller Videos", icon: <FaUserTie /> },
    { id: "payments", label: "Payments", icon: <FaMoneyBillWave /> },
  ];

  /* 🔥 3 VIDEOS */
  const learningItems: LearningItem[] = [
    {
      id: 1,
      category: "seller",
      title: "Seller Registration — Zero to First Product",
      description:
        "Complete guide: signup, KYC, dashboard tour, aur pehla product list karna.",
      fullDescription:
        "Is video me aap seekhenge ki Selfysnap pe seller kaise bante hain. Step-by-step process: website pe jaana, 'Become a Seller' button click karna, account create karna (naam, email, mobile), KYC complete karna (GST, PAN, bank details), documents upload karna. Admin 24-48 hours me verify karega. Uske baad dashboard ka poora tour aur pehla product list karne ka tarika.",
      duration: "18 min",
      level: "Beginner",
      views: "12.5K",
      color: "from-orange-500 to-red-500",
      videoUrl: "/seller.mp4",
      steps: [
        "selfysnap.com kholo aur 'Become a Seller' button dabao",
        "Account create karo — naam, email, mobile, password",
        "Email verify karo aur mobile OTP daalo",
        "KYC complete karo — GST number, PAN card, bank details",
        "Documents upload karo — GST certificate, PAN, cancelled cheque",
        "Admin verification ka wait karo (24-48 hours)",
        "Dashboard tour karo — Products, Orders, Payments, Analytics",
        "Pehla product add karo — title, description, images, price, stock",
        "Publish karo — product live ho jayega!",
      ],
    },
    {
      id: 2,
      category: "seller",
      title: "Selfysnap Complete Guide",
      description:
        "Selfysnap platform ka poora overview — seller journey, features aur dashboard.",
      fullDescription:
        "Is video me aap seekhenge Selfysnap platform ke baare me sab kuch. Seller kaise bante hain, dashboard kaise use karte hain, products kaise list karte hain, orders kaise handle karte hain, payments kaise milti hain — sab kuch step by step. Naye sellers ke liye complete guide.",
      duration: "12 min",
      level: "Beginner",
      views: "10.2K",
      color: "from-blue-500 to-cyan-500",
      videoUrl: "/selfysnap.mp4",
      steps: [
        "Selfysnap platform ka overview",
        "Seller account setup",
        "Dashboard tour",
        "Products list karna",
        "Orders handle karna",
        "Payments aur settlement",
        "Best practices",
        "Common mistakes",
        "Growth tips",
      ],
    },
    {
      id: 3,
      category: "payments",
      title: "Selfysnap Seller Payout — Request se Settlement Tak",
      description:
        "Payout request kaise kare, 7-day settlement, bank me credit — complete process.",
      fullDescription:
        "Is video me aap seekhenge poora payout process. Payments dashboard me Available Balance dikhega. 'Request Payout' button click karo, amount daalo, confirm karo. Status PENDING me chala jayega. Selfysnap team 24 hours me verify karegi. Uske baad 7 working days ka settlement cycle start hoga — status PROCESSING me aayega. 7 din baad status COMPLETED ho jayega aur paisa aapke bank account me credit ho jayega. SMS aur email notification bhi aayega.",
      duration: "10 min",
      level: "Intermediate",
      views: "11.2K",
      color: "from-indigo-500 to-violet-600",
      videoUrl: "/selfysnap-payout.mp4",
      steps: [
        "Seller Dashboard → Payments section kholo",
        "Available Balance card dekho",
        "Request Payout button click karo",
        "Amount daalo — ya 'Withdraw All' select karo",
        "Bank details check karo aur Confirm dabao",
        "Status PENDING ho jayega — 24 hours wait",
        "7-day settlement cycle start hoga",
        "Status COMPLETED hone pe bank me credit",
        "SMS aur email notification aayega",
      ],
    },
  ];

  const filteredItems = learningItems.filter((item) => {
    const matchCategory =
      activeCategory === "all" || item.category === activeCategory;
    const matchSearch =
      !searchQuery ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50/30">
      {/* HEADER */}
      <div className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 px-6 md:px-16 py-16 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-white rounded-full blur-3xl opacity-10"></div>
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-white rounded-full blur-3xl opacity-10"></div>

        <div className="relative max-w-7xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-6 text-sm font-semibold transition-colors"
          >
            <FaArrowLeft />
            Back to Home
          </Link>

          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur border border-white/30 flex items-center justify-center text-white text-3xl">
              <FaGraduationCap />
            </div>
            <div>
              <h1 className="text-3xl md:text-5xl font-bold text-white">
                Learning Hub
              </h1>
              <p className="text-white/90 mt-1 text-sm md:text-base">
                Free video guides for sellers
              </p>
            </div>
          </div>

          <div className="mt-8 max-w-2xl relative">
            <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search videos, guides, tips..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-5 py-4 rounded-2xl bg-white shadow-2xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-white/30 transition-all"
            />
          </div>
        </div>
      </div>

      {/* STATS */}
      <div className="px-6 md:px-16 -mt-8 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              icon: <FaVideo />,
              value: "3",
              label: "Videos",
              color: "from-orange-500 to-red-500",
            },
            {
              icon: <FaUsers />,
              value: "50K+",
              label: "Learners",
              color: "from-blue-500 to-cyan-500",
            },
            {
              icon: <FaClock />,
              value: "40+",
              label: "Minutes",
              color: "from-purple-500 to-pink-500",
            },
            {
              icon: <FaAward />,
              value: "100%",
              label: "Free",
              color: "from-green-500 to-emerald-600",
            },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-5 shadow-xl border border-gray-100 flex items-center gap-4 hover:-translate-y-1 transition-all"
            >
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white text-xl`}
              >
                {stat.icon}
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">
                  {stat.value}
                </p>
                <p className="text-xs text-gray-500 font-semibold">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CATEGORIES */}
      <div className="px-6 md:px-16 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center mb-10">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm transition-all ${
                  activeCategory === cat.id
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg scale-105"
                    : "bg-white text-gray-700 border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50"
                }`}
              >
                {cat.icon}
                {cat.label}
              </button>
            ))}
          </div>

          {/* CARDS */}
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item, i) => (
                <div
                  key={item.id}
                  onClick={() => navigate(`/learning-hub/${item.id}`)}
                  className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl border border-gray-100 transition-all duration-300 cursor-pointer hover:-translate-y-2"
                  style={{
                    animation: `fadeInUp 0.5s ease-out ${i * 0.08}s both`,
                  }}
                >
                  <div
                    className={`relative h-40 bg-gradient-to-br ${item.color} flex items-center justify-center overflow-hidden`}
                  >
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="relative w-16 h-16 rounded-full bg-white/30 backdrop-blur border-2 border-white flex items-center justify-center group-hover:scale-110 transition-transform">
                      <FaPlay className="text-white text-xl ml-1" />
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs font-bold px-2 py-1 rounded">
                      ⏱ {item.duration}
                    </div>
                    <div className="absolute top-2 left-2 bg-white/90 text-gray-800 text-[10px] font-bold px-2 py-1 rounded-full uppercase">
                      {item.category}
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                        {item.level}
                      </span>
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <FaEye /> {item.views}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-indigo-600 transition-colors line-clamp-2">
                      {item.title}
                    </h3>

                    <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-2">
                      {item.description}
                    </p>

                    <div className="flex items-center gap-2 text-indigo-600 text-sm font-bold group-hover:gap-3 transition-all">
                      <span>Watch Video</span>
                      <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="inline-flex p-8 rounded-full bg-gray-100 mb-4">
                <FaSearch className="text-4xl text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-700 mb-2">
                No results found
              </h3>
              <p className="text-gray-500">
                Try a different keyword or category
              </p>
            </div>
          )}
        </div>
      </div>

      {/* CTA */}
      <div className="px-6 md:px-16 py-16">
        <div className="max-w-4xl mx-auto relative bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 rounded-3xl p-8 md:p-12 overflow-hidden shadow-2xl text-center">
          <div className="absolute -top-10 -right-10 w-64 h-64 bg-white rounded-full blur-3xl opacity-20"></div>

          <div className="relative">
            <div className="inline-flex p-4 rounded-2xl bg-white/20 backdrop-blur border border-white/30 mb-4">
              <FaLaptop className="text-3xl text-white" />
            </div>
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-3">
              Still Have Questions?
            </h2>
            <p className="text-white/90 mb-6 max-w-xl mx-auto">
              Our support team is here to help you grow your business on
              Selfysnap
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <a
                href="tel:+919992088843"
                className="bg-white text-orange-600 px-6 py-3 rounded-xl font-bold hover:scale-105 transition-all shadow-lg"
              >
                📞 Call Support
              </a>
              <a
                href="mailto:support@selfysnap.com"
                className="border-2 border-white text-white px-6 py-3 rounded-xl font-bold hover:bg-white hover:text-orange-600 transition-all"
              >
                ✉️ Email Us
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default LearningHub;