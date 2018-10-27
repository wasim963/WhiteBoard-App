const express = require('express');
const srv = express();
const socketio = require('socket.io');

const server = require('http').createServer(srv);
const io = socketio(server);

srv.use('/public', express.static(__dirname + '/public_html'))

io.on('connection', function (socket) {
    console.log(socket.id);
    socket.on('send_line', function (data) {
        io.emit('recv_line', data);
    })
});

server.listen(1208, () => {
    console.log("Server is up and running at 1208!")
});
