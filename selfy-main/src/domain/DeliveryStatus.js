// domain/DeliveryStatus.js
const DeliveryStatus = Object.freeze({
    PENDING: 'pending',
    SHIPPED: 'shipped',
    IN_TRANSIT: 'in_transit',
    OUT_FOR_DELIVERY: 'out_for_delivery',
    DELIVERED: 'delivered',
    RTO: 'rto',
});

module.exports = DeliveryStatus;