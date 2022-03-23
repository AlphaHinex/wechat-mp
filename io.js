const Server = require('socket.io').Server;

const io = module.exports = {};

io.server = new Server();

io.server.on('connection', (socket) => {
    io.server.allSockets().then((sockets) => {
        console.debug(sockets.size + ' socket(s) connected');
    });
});
