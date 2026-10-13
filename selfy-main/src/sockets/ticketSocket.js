module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log('🔌 Socket connected:', socket.id);

        // Customer joins their room
        socket.on('customer:join', (userId) => {
            socket.join(`user-${userId}`);
            console.log(`👤 Customer ${userId} joined`);
        });

        // Admin joins
        socket.on('admin:join', (adminId) => {
            socket.join('admin-room');
            socket.join(`admin-${adminId}`);
            console.log(`👨‍💼 Admin ${adminId} joined`);
        });

        // Join ticket chat
        socket.on('ticket:join', (ticketId) => {
            socket.join(`ticket-${ticketId}`);
            console.log(`🎫 Joined ticket: ${ticketId}`);
        });

        // Typing indicator
        socket.on('ticket:typing', ({ ticketId, userId, role }) => {
            socket.to(`ticket-${ticketId}`).emit('ticket:typing', {
                userId, role
            });
        });

        socket.on('disconnect', () => {
            console.log('❌ Socket disconnected:', socket.id);
        });
    });
};