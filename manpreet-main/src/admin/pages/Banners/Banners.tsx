// src/customer/pages/Home/Banners/Banners.tsx

import { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from "react-router-dom";
import { api } from "../../../Config/Api";

interface Banners {
  _id: string;
  title: string;
  subtitle: string;
  description: string;
  mediaType: "image" | "video";
  image: string;
  video: string;
  videoAutoplay: boolean;
  videoLoop: boolean;
  videoMuted: boolean;
  link: string;
  textPosition: "left" | "center" | "right";
  textColor: string;
  overlayOpacity: number;
  buttonText: string;
  buttonColor: string;
}

const BannersCarousel = () => {
  const navigate = useNavigate();
  const [banners, setBanners] = useState<Banners[]>([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);

  // ═══════════════════════════════════════════════
  // 📥 FETCH ACTIVE BANNERS
  // ═══════════════════════════════════════════════
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await api.get("/api/banners/active");
        setBanners(res.data.banners || []);
      } catch (error) {
        console.error("Banners fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBanners();
  }, []);

  // ═══════════════════════════════════════════════
  // ⏱️ AUTO SLIDE (सिर्फ Image के लिए, Video Skip)
  // ═══════════════════════════════════════════════
  useEffect(() => {
    if (banners.length <= 1) return;
    if (banners[current]?.mediaType === "video") return;

    const timer = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearTimeout(timer);
  }, [current, banners]);

  // ═══════════════════════════════════════════════
  // ◀️ ▶️ NAVIGATION
  // ═══════════════════════════════════════════════
  const next = () => setCurrent((prev) => (prev + 1) % banners.length);
  const prev = () =>
    setCurrent((prev) => (prev - 1 + banners.length) % banners.length);

  if (loading || banners.length === 0) return null;

  const banner = banners[current];

  return (
    <div className="relative w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-lg bg-black">
      {/* ═══════════════════════════════════════════ */}
      {/* 🎬 MEDIA (Video या Image) */}
      {/* ═══════════════════════════════════════════ */}
      {banner.mediaType === "video" && banner.video ? (
        <video
          key={banner._id}
          src={banner.video}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay={banner.videoAutoplay}
          loop={banner.videoLoop}
          muted={banner.videoMuted}
          playsInline
        />
      ) : (
        <img
          key={banner._id}
          src={banner.image}
          alt={banner.title}
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://via.placeholder.com/1600x600?text=Banners";
          }}
        />
      )}

      {/* ═══════════════════════════════════════════ */}
      {/* 🌑 OVERLAY GRADIENT */}
      {/* ═══════════════════════════════════════════ */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(90deg, rgba(0,0,0,${banner.overlayOpacity}) 0%, rgba(0,0,0,${
            banner.overlayOpacity * 0.5
          }) 50%, transparent 100%)`,
        }}
      />

      {/* ═══════════════════════════════════════════ */}
      {/* 📝 CONTENT */}
      {/* ═══════════════════════════════════════════ */}
      <div
        className={`absolute inset-0 flex items-center px-6 sm:px-10 lg:px-20 ${
          banner.textPosition === "center"
            ? "justify-center text-center"
            : banner.textPosition === "right"
            ? "justify-end text-right"
            : "justify-start text-left"
        }`}
      >
        <div className="max-w-xl space-y-2 sm:space-y-4">
          {banner.title && (
            <h1
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold drop-shadow-lg"
              style={{ color: banner.textColor }}
            >
              {banner.title}
            </h1>
          )}

          {banner.subtitle && (
            <p
              className="text-sm sm:text-lg md:text-xl opacity-90 drop-shadow"
              style={{ color: banner.textColor }}
            >
              {banner.subtitle}
            </p>
          )}

          {banner.description && (
            <p
              className="text-xs sm:text-sm opacity-80 hidden sm:block"
              style={{ color: banner.textColor }}
            >
              {banner.description}
            </p>
          )}

          {banner.buttonText && (
            <button
              onClick={() => navigate(banner.link)}
              className="mt-2 inline-flex items-center gap-2 text-white font-bold px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all text-sm sm:text-base"
              style={{ backgroundColor: banner.buttonColor }}
            >
              {banner.buttonText} →
            </button>
          )}
        </div>
      </div>

      {/* ═══════════════════════════════════════════ */}
      {/* ◀️ ▶️ ARROWS */}
      {/* ═══════════════════════════════════════════ */}
      {banners.length > 1 && (
        <>
          <IconButton
            onClick={prev}
            className="!absolute !left-2 !top-1/2 !-translate-y-1/2 !bg-white/80 hover:!bg-white !text-gray-800"
            sx={{ width: 40, height: 40 }}
          >
            <ArrowBackIosNewIcon sx={{ fontSize: 16 }} />
          </IconButton>

          <IconButton
            onClick={next}
            className="!absolute !right-2 !top-1/2 !-translate-y-1/2 !bg-white/80 hover:!bg-white !text-gray-800"
            sx={{ width: 40, height: 40 }}
          >
            <ArrowForwardIosIcon sx={{ fontSize: 16 }} />
          </IconButton>
        </>
      )}

      {/* ═══════════════════════════════════════════ */}
      {/* ⚫ DOTS (Pagination) */}
      {/* ═══════════════════════════════════════════ */}
      {banners.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`h-2 rounded-full transition-all ${
                index === current
                  ? "w-8 bg-white"
                  : "w-2 bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BannersCarousel;