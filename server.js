const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
    console.log('A world has connected to the bridge.');

    socket.on('upside-down-signal', (letter) => {
        // Corrected backticks for the console log
        console.log(`Breach detected! Letter: ${letter}`);
        io.emit('real-world-flicker', letter);
    });

    socket.on('disconnect', () => {
        console.log('A world has disconnected.');
    });
});

// Port configuration for Render
const PORT = process.env.PORT || 3000; 

http.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
