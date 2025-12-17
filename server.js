const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const path = require('path');

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
    console.log('A world has connected to the bridge.');

    // Listen for the "hover trigger" from Member 1
    socket.on('upside-down-signal', (letter) => {
        console.log(`Breach detected! Letter: ${letter}`);
        // Broadcast to Member 2 (The Real World)
        io.emit('real-world-flicker', letter);
    });

    socket.on('disconnect', () => {
        console.log('A world has disconnected.');
    });
});

const PORT = 3000;
http.listen(PORT, () => {
    console.log(`Bridge is active at http://localhost:${PORT}`);
    console.log(`Upside Down: http://localhost:${PORT}/upside-down`);
    console.log(`Real World: http://localhost:${PORT}/real-world`);
});