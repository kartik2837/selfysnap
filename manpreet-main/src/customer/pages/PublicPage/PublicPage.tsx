import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import StorefrontIcon from "@mui/icons-material/Storefront";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";

import { api } from "../../../Config/Api";

interface LegalPageData {
  _id: string;
  slug: string;
  title: string;
  content: string;
  description?: string;
  category: string;
  metaTitle?: string;
  metaDescription?: string;
  views?: number;
  updatedAt: string;
}

interface PublicPageProps {
  slug?: string;
}

const PublicPage: React.FC<PublicPageProps> = ({ slug: slugProp }) => {
  const { slug: slugParam } = useParams<{ slug: string }>();
  const slug = slugProp || slugParam;

  const [page, setPage] = useState<LegalPageData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (slug) fetchPage();
    window.scrollTo(0, 0);
  }, [slug]);

  const fetchPage = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await api.get<LegalPageData>(`/api/legal/${slug}`);
      setPage(data);
      document.title = `${data.metaTitle || data.title} | Selfysnap Seller`;
    } catch (err: any) {
      console.error(err);
      setError("Page not found");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString?: string): string => {
    if (!dateString) return "Recently updated";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "Recently updated";
      return date.toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return "Recently updated";
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20 min-h-[60vh] bg-white">
        <CircularProgress sx={{ color: "#df6b3c" }} />
      </div>
    );
  }

  if (error || !page) {
    return (
      <div className="w-full px-6 py-20 text-center bg-white min-h-screen flex flex-col justify-center items-center">
        <h1 className="text-6xl sm:text-7xl md:text-8xl font-black text-red-500 mb-4">
          404
        </h1>
        <p className="text-gray-700 text-base sm:text-lg md:text-xl font-semibold mb-8 max-w-md">
          Ye page exist nahi karta ya remove ho gaya hai.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-bold shadow-lg shadow-orange-500/40 transition-all hover:scale-105"
        >
          <ArrowBackIcon />
          Go to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full bg-white">
      
      {/* HERO HEADER — IMAGE FULL VISIBLE */}
      <div className="relative w-full overflow-hidden">
        
        {/* Background Image */}
        <img
          src="/seller2.jpg"
          alt="Selfysnap Seller"
          className="absolute inset-0 w-full h-full object-cover object-top"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = "none";
          }}
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/30"></div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/70 to-transparent"></div>

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-16 sm:py-24 md:py-32">
          
          <div className="mb-6 sm:mb-8">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 sm:gap-2 text-white font-bold text-xs sm:text-sm bg-black/40 backdrop-blur-md px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-white/40 hover:bg-black/60 transition-all shadow-lg"
            >
              <ArrowBackIcon sx={{ fontSize: { xs: 14, sm: 16, md: 18 } }} />
              Back to Home
            </Link>
          </div>

          <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1.5 sm:px-5 sm:py-2.5 rounded-full text-[10px] sm:text-xs md:text-sm font-black uppercase tracking-widest mb-4 sm:mb-6 shadow-2xl shadow-orange-500/50 border border-white/30">
            <StorefrontIcon sx={{ fontSize: { xs: 14, sm: 16, md: 18 } }} />
            SELFYSNAP SELLER
          </div>

          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-4 sm:mb-5 md:mb-6 leading-tight tracking-tight text-white max-w-4xl"
            style={{
              textShadow: "0 4px 24px rgba(0,0,0,0.9), 0 2px 8px rgba(0,0,0,0.8)",
            }}
          >
            {page.title}
          </h1>

          {page.description && (
            <p
              className="text-white/95 text-base sm:text-lg md:text-xl lg:text-2xl font-semibold leading-relaxed max-w-3xl mb-5 sm:mb-6 md:mb-8"
              style={{
                textShadow: "0 2px 12px rgba(0,0,0,0.9)",
              }}
            >
              {page.description}
            </p>
          )}

          <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-white/20 backdrop-blur-md border border-white/40 px-3 py-1.5 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm md:text-base font-bold text-white shadow-xl">
            <CalendarMonthIcon sx={{ fontSize: { xs: 14, sm: 16, md: 18 } }} />
            <span className="hidden xs:inline">Last Updated:</span>
            <span className="xs:hidden">Updated:</span>
            {formatDate(page.updatedAt)}
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="w-full bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-8 sm:py-12 md:py-16">
          {page.content ? (
            <div
              className="page-content"
              dangerouslySetInnerHTML={{ __html: page.content }}
            />
          ) : (
            <div className="text-center py-12 sm:py-20 text-gray-400 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
              <p className="text-lg sm:text-2xl font-bold">No content available</p>
              <p className="text-sm sm:text-base mt-2 font-semibold">
                Admin panel se content add karo
              </p>
            </div>
          )}
        </div>
      </div>

      {/* FOOTER CTA */}
      <div className="w-full bg-gradient-to-br from-orange-50 via-red-50 to-orange-50 border-t-4 border-orange-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-8 sm:py-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8">
            
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 text-center sm:text-left">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center flex-shrink-0 shadow-lg">
                <StorefrontIcon sx={{ fontSize: { xs: 22, sm: 26 }, color: "white" }} />
              </div>
              <div>
                <p className="text-sm sm:text-base md:text-lg font-black text-gray-800">
                  Questions? We're here to help!
                </p>
                <p className="text-xs sm:text-sm text-gray-600 font-semibold">
                  Selfysnap Seller Support Team
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
              <a
                href="mailto:support@selfysnap.com"
                className="inline-flex items-center justify-center gap-2 bg-white border-2 border-orange-400 text-orange-600 px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl font-bold text-xs sm:text-sm hover:bg-orange-500 hover:text-white transition-all shadow-sm hover:shadow-md"
              >
                <EmailIcon sx={{ fontSize: 16 }} />
                support@selfysnap.com
              </a>
              <a
                href="tel:+919992088843"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl font-bold text-xs sm:text-sm hover:shadow-lg hover:scale-105 transition-all shadow-md"
              >
                <PhoneIcon sx={{ fontSize: 16 }} />
                +91 99920 88843
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="w-full bg-gray-900 text-white py-4 sm:py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3">
          <p className="text-xs sm:text-sm font-bold text-center sm:text-left">
            © {new Date().getFullYear()}{" "}
            <span className="text-orange-400 font-black">SELFYSNAP</span> SELLER
          </p>
          <p className="text-[10px] sm:text-xs font-semibold text-gray-400">
            Made with <span className="text-red-500">❤️</span> in India
          </p>
        </div>
      </div>

      {/* CONTENT STYLING */}
      <style>{`
        .page-content {
          color: #1f2937;
          line-height: 1.85;
          font-size: 15px;
          font-weight: 500;
          word-wrap: break-word;
          overflow-wrap: break-word;
        }
        .page-content h1 {
          font-size: 24px;
          font-weight: 900;
          background: linear-gradient(135deg, #ea580c, #dc2626);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin: 28px 0 14px;
          line-height: 1.3;
        }
        .page-content h2 {
          font-size: 21px;
          font-weight: 900;
          color: #ea580c;
          margin: 32px 0 14px;
          padding-bottom: 10px;
          border-bottom: 3px solid #fed7aa;
          line-height: 1.3;
        }
        .page-content h2:first-child { margin-top: 0; }
        .page-content h3 {
          font-size: 18px;
          font-weight: 800;
          color: #dc2626;
          margin: 24px 0 10px;
          line-height: 1.4;
        }
        .page-content h4 {
          font-size: 16px;
          font-weight: 800;
          color: #ea580c;
          margin: 20px 0 8px;
        }
        .page-content p {
          margin: 12px 0;
          font-weight: 500;
          color: #374151;
        }
        .page-content ul,
        .page-content ol { margin: 14px 0; padding-left: 22px; }
        .page-content ul li {
          list-style-type: none;
          margin: 10px 0;
          position: relative;
          padding-left: 8px;
          font-weight: 500;
          color: #374151;
        }
        .page-content ul li::before {
          content: "▸";
          color: #ea580c;
          font-weight: 900;
          position: absolute;
          left: -16px;
          font-size: 17px;
        }
        .page-content ol li {
          list-style-type: decimal;
          margin: 10px 0;
          font-weight: 500;
          padding-left: 6px;
          color: #374151;
        }
        .page-content ol li::marker { color: #ea580c; font-weight: 900; }
        .page-content strong,
        .page-content b { color: #c2410c; font-weight: 800; }
        .page-content em { font-style: italic; font-weight: 600; color: #ea580c; }
        .page-content a { color: #ea580c; text-decoration: underline; font-weight: 700; }
        .page-content a:hover { color: #c2410c; }
        .page-content blockquote {
          border-left: 5px solid #f97316;
          padding: 14px 16px;
          margin: 20px 0;
          background: linear-gradient(to right, #fff7ed, #fef3c7);
          border-radius: 0 12px 12px 0;
          color: #7c2d12;
          font-style: italic;
          font-weight: 600;
          font-size: 14px;
        }
        .page-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0;
          font-size: 13px;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
          display: block;
          overflow-x: auto;
          white-space: nowrap;
        }
        .page-content th,
        .page-content td {
          padding: 10px 12px;
          border: 1px solid #e5e7eb;
          text-align: left;
        }
        .page-content th {
          background: linear-gradient(to right, #ea580c, #dc2626);
          font-weight: 900;
          color: #ffffff;
          text-transform: uppercase;
          font-size: 11px;
          letter-spacing: 0.5px;
        }
        .page-content td { font-weight: 500; color: #374151; }
        .page-content tr:nth-child(even) td { background: #fff7ed; }

        @media (min-width: 640px) {
          .page-content { font-size: 16px; line-height: 1.85; }
          .page-content h1 { font-size: 28px; }
          .page-content h2 { font-size: 24px; margin: 36px 0 16px; }
          .page-content h3 { font-size: 20px; }
          .page-content h4 { font-size: 17px; }
          .page-content ul,
          .page-content ol { padding-left: 26px; }
          .page-content ul li { padding-left: 10px; }
          .page-content ul li::before { left: -18px; font-size: 19px; }
          .page-content blockquote { padding: 16px 20px; font-size: 15px; }
          .page-content table {
            font-size: 14px;
            display: table;
            white-space: normal;
          }
          .page-content th,
          .page-content td { padding: 12px 16px; }
        }

        @media (min-width: 1024px) {
          .page-content { font-size: 17px; line-height: 1.9; }
          .page-content h1 { font-size: 34px; margin: 40px 0 18px; }
          .page-content h2 {
            font-size: 28px;
            margin: 44px 0 20px;
            padding-bottom: 12px;
            border-bottom: 4px solid #fed7aa;
          }
          .page-content h3 { font-size: 22px; margin: 30px 0 12px; }
          .page-content h4 { font-size: 19px; }
          .page-content p { margin: 16px 0; }
          .page-content ul,
          .page-content ol { padding-left: 30px; }
          .page-content ul li { padding-left: 10px; margin: 12px 0; }
          .page-content ul li::before { left: -20px; font-size: 20px; }
          .page-content ol li { margin: 12px 0; }
          .page-content blockquote {
            border-left: 5px solid #f97316;
            padding: 20px 24px;
            margin: 28px 0;
            font-size: 17px;
            border-radius: 0 16px 16px 0;
          }
          .page-content table {
            font-size: 16px;
            margin: 28px 0;
            border-radius: 12px;
          }
          .page-content th,
          .page-content td { padding: 16px 20px; }
        }

        @media (min-width: 1280px) {
          .page-content { font-size: 17.5px; }
          .page-content h1 { font-size: 38px; }
          .page-content h2 { font-size: 30px; }
          .page-content h3 { font-size: 24px; }
        }
      `}</style>
    </div>
  );
};

export default PublicPage;