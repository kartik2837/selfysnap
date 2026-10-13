const OrderStatus = Object.freeze({
    PENDING: "PENDING",
    PLACED: "PLACED",
    CONFIRMED: "CONFIRMED",
    PACKED: "PACKED",             // Seller packed the order
    ASSIGNED: "ASSIGNED",           // Delivery partner assigned
    SHIPPED: "SHIPPED",            // Picked up by delivery partner
    IN_TRANSIT: "IN_TRANSIT",         // In transit (webhook update)
    OUT_FOR_DELIVERY: "OUT_FOR_DELIVERY",   // Out for delivery (webhook update)
    DELIVERED: "DELIVERED",          // Delivered to customer
    CANCELLED: "CANCELLED",          // Cancelled by seller/admin/user
    RETURNED: "RETURNED",           // Return processed
    RTO: "RTO",               // Return To Origin (COD failed)
});
module.exports = OrderStatus;