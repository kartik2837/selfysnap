// src/util/formatOrderId.ts

/**
 * MongoDB Order ID को "SELFY_YEAR_ID" Format में बदलता है
 * 
 * Example:
 *   "6a94fbb2077d778c327e03da" → "SELFY_2026_657484"
 *   "507f1f77bcf86cd799439011" → "SELFY_2026_439011"
 *   "abc123def456"             → "SELFY_2026_123456"
 */

export const formatOrderId = (orderId: string | undefined | null): string => {
  // अगर ID नहीं है
  if (!orderId) return "SELFY_2026_000000";

  // अगर पहले से ही SELFY_ format में है तो वापस वही दें
  if (orderId.startsWith("SELFY_")) return orderId;

  // सिर्फ Hex Characters निकालें
  const cleanId = orderId.replace(/[^a-fA-F0-9]/g, "");

  // आखिरी 6 Characters लें
  const last6 = cleanId.slice(-6);

  // Hex को Decimal Number में बदलें
  const numeric = parseInt(last6, 16) % 1000000;

  // 6 Digit में Format करें
  const paddedNumber = String(numeric).padStart(6, "0");

  // Current Year
  const year = new Date().getFullYear();

  // Format: SELFY_2026_657484
  return `SELFY_${year}_${paddedNumber}`;
};

/**
 * सिर्फ Number वाला Short ID (बिना SELFY_ prefix के)
 * Example: "SELFY_2026_657484" → "657484"
 */
export const getShortOrderNumber = (
  orderId: string | undefined | null
): string => {
  const formatted = formatOrderId(orderId);
  return formatted.split("_").pop() || "000000";
};