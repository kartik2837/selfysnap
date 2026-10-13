// paymentStatus.js
const PaymentStatus = {
    PENDING: "PENDING",      // Generic pending (online payment initiated)
    COD_PENDING: "COD_PENDING",  // COD order placed — awaiting delivery
    PROCESSING: "PROCESSING",
    PAID: "PAID",         // Online payment confirmed
    COMPLETED: "COMPLETED",
    FAILED: "FAILED",
    REFUNDED: "REFUNDED",     // Refund processed after cancel/return
};

module.exports = PaymentStatus;
