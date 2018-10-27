const express = require('express');
const srv = express();
const socketio = require('socket.io');

const server = require('http').createServer(srv);
const io = socketio(server);
const SERVER_PORT = process.env.PORT || 2345

srv.use('/public', express.static(__dirname + '/public_html'))

io.on('connection', function (socket) {
    console.log(socket.id);
    socket.on('send_line', function (data) {
        io.emit('recv_line', data);
    })
});

server.listen(SERVER_PORT, () => {
    console.log("Server is up and running!")
});
