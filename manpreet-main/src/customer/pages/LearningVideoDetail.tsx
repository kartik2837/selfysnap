import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaArrowLeft,
  FaPlay,
  FaClock,
  FaEye,
  FaStar,
  FaCheckCircle,
  FaShare,
  FaThumbsUp,
  FaWhatsapp,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaDownload,
  FaBookOpen,
  FaLightbulb,
} from "react-icons/fa";

/* 🔥 SAME 3 VIDEOS */
const learningItems = [
  {
    id: 1,
    category: "seller",
    title: "Seller Registration — Zero to First Product",
    description:
      "Complete guide: signup, KYC, dashboard tour, aur pehla product list karna.",
    fullDescription:
      "Is video me aap seekhenge ki Selfysnap pe seller kaise bante hain. Step-by-step process: website pe jaana, 'Become a Seller' button click karna, account create karna, KYC complete karna, documents upload karna. Admin 24-48 hours me verify karega. Uske baad dashboard ka poora tour aur pehla product list karne ka tarika.",
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
      "Is video me aap seekhenge poora payout process. Payments dashboard me Available Balance dikhega. 'Request Payout' button click karo, amount daalo, confirm karo. Status PENDING me chala jayega. Selfysnap team 24 hours me verify karegi. Uske baad 7 working days ka settlement cycle start hoga. 7 din baad status COMPLETED ho jayega aur paisa aapke bank account me credit ho jayega.",
    duration: "10 min",
    level: "Intermediate",
    views: "11.2K",
    color: "from-indigo-500 to-violet-600",
    videoUrl: "/selfysnap payout.mp4",
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

const LearningVideoDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);

  const item = learningItems.find((x) => x.id === Number(id));

  if (!item) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          ❌ Video Not Found
        </h1>
        <p className="text-gray-600 mb-6">
          Ye video nahi mili. Doosri video try karo.
        </p>
        <button
          onClick={() => navigate("/learning-hub")}
          className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all"
        >
          Back to Learning Hub
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50/30">
      {/* HEADER */}
      <div
        className={`relative bg-gradient-to-br ${item.color} px-6 md:px-16 py-10 overflow-hidden`}
      >
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-white rounded-full blur-3xl opacity-10"></div>
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-white rounded-full blur-3xl opacity-10"></div>

        <div className="relative max-w-5xl mx-auto">
          <button
            onClick={() => navigate("/learning-hub")}
            className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-6 text-sm font-semibold transition-colors"
          >
            <FaArrowLeft />
            Back to Learning Hub
          </button>

          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/20 backdrop-blur border border-white/30 text-white uppercase tracking-wider">
              {item.category}
            </span>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/20 backdrop-blur border border-white/30 text-white">
              {item.level}
            </span>
          </div>

          <h1 className="text-2xl md:text-4xl font-bold text-white mb-4 leading-tight">
            {item.title}
          </h1>

          <div className="flex items-center gap-5 text-white/90 text-sm flex-wrap">
            <span className="flex items-center gap-2">
              <FaClock /> {item.duration}
            </span>
            <span className="flex items-center gap-2">
              <FaEye /> {item.views} views
            </span>
            <span className="flex items-center gap-2">
              <FaStar className="text-yellow-300" /> 4.9 rating
            </span>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="px-6 md:px-16 py-10">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT: VIDEO + DESCRIPTION */}
          <div className="lg:col-span-2 space-y-6">
            {/* VIDEO PLAYER */}
            <div className="relative bg-black rounded-2xl overflow-hidden shadow-2xl">
              <video
                className="w-full h-[280px] md:h-[420px] object-cover"
                controls
                playsInline
                preload="metadata"
              >
                <source src={item.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>

            {/* ACTION BAR */}
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setLiked(!liked)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm transition-all ${
                    liked
                      ? "bg-indigo-600 text-white"
                      : "bg-white text-gray-700 border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50"
                  }`}
                >
                  <FaThumbsUp />
                  {liked ? "Liked" : "Like"}
                </button>

                <button className="flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm bg-white text-gray-700 border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all">
                  <FaDownload />
                  Save
                </button>

                <button className="flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm bg-white text-gray-700 border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all">
                  <FaShare />
                  Share
                </button>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href="#"
                  className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-green-500 hover:text-white hover:border-green-500 transition-all"
                >
                  <FaWhatsapp />
                </a>
                <a
                  href="#"
                  className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all"
                >
                  <FaFacebook />
                </a>
                <a
                  href="#"
                  className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-sky-500 hover:text-white hover:border-sky-500 transition-all"
                >
                  <FaTwitter />
                </a>
                <a
                  href="#"
                  className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-blue-700 hover:text-white hover:border-blue-700 transition-all"
                >
                  <FaLinkedin />
                </a>
              </div>
            </div>

            {/* DESCRIPTION */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                <span className="h-1 w-6 bg-indigo-500 rounded-full"></span>
                Description
              </h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {item.fullDescription}
              </p>
            </div>

            {/* STEPS */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-5 flex items-center gap-3">
                <span className="h-1 w-6 bg-green-500 rounded-full"></span>
                Steps You'll Learn
              </h2>

              <ul className="space-y-3">
                {item.steps.map((step, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 hover:bg-indigo-50 transition-all group"
                  >
                    <div className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xs flex-shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                      {i + 1}
                    </div>
                    <span className="text-sm text-gray-700 font-medium leading-relaxed">
                      {step}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* RIGHT: SIDEBAR */}
          <div className="space-y-6">
            {/* AUTHOR CARD */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-center">
              <div
                className={`w-20 h-20 rounded-full bg-gradient-to-br ${item.color} mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold`}
              >
                S
              </div>
              <h3 className="font-bold text-gray-800 mb-1">Selfysnap Team</h3>
              <p className="text-xs text-gray-500 mb-3">
                Seller Success Coach
              </p>
              <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                <FaCheckCircle className="text-green-500" />
                <span>Verified Expert</span>
              </div>
            </div>

            {/* RELATED */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <FaBookOpen className="text-indigo-500" />
                Related Videos
              </h3>

              <div className="space-y-3">
                {learningItems
                  .filter((x) => x.id !== item.id)
                  .map((related) => (
                    <button
                      key={related.id}
                      onClick={() =>
                        navigate(`/learning-hub/${related.id}`)
                      }
                      className="w-full text-left p-3 rounded-xl hover:bg-indigo-50 transition-all group"
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-10 h-10 rounded-lg bg-gradient-to-br ${related.color} flex items-center justify-center text-white text-sm flex-shrink-0`}
                        >
                          <FaPlay className="text-[10px] ml-0.5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-bold text-gray-800 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                            {related.title}
                          </p>
                          <p className="text-[10px] text-gray-500 mt-1">
                            {related.duration}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
              </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-6 text-white text-center shadow-lg">
              <FaLightbulb className="text-3xl mx-auto mb-3" />
              <h3 className="font-bold mb-2">Need More Help?</h3>
              <p className="text-xs text-white/90 mb-4">
                Our support team is here for you
              </p>
              <a
                href="tel:+919992088843"
                className="inline-block bg-white text-indigo-600 px-5 py-2.5 rounded-xl font-bold text-sm hover:scale-105 transition-all"
              >
                 Call Support
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
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

export default LearningVideoDetail;