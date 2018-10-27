$(function () {
    const socket = io();


    socket.on('recv_line', function (data) {
        draw(data.x1, data.y1, data.x2, data.y2);
    });

    const board = document.getElementById('board');
    const context = board.getContext('2d');

    board.width = window.innerWidth;
    board.height = window.innerHeight;

    let isDrawing = false;
    const currentPos = {};

    function draw(x1, y1, x2, y2) {
        context.beginPath();
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.stroke();
        context.closePath();
    }

    board.addEventListener('mousedown', function (event) {
        isDrawing = true;
        currentPos.x = event.clientX;
        currentPos.y = event.clientY;
    });


    board.addEventListener('mouseup', function (event) {
        isDrawing = false;
        //drawline
        // draw(currentPos.x, currentPos.y, event.clientX, event.clientY)
        socket.emit('send_line', {x1: currentPos.x, y1: currentPos.y, x2: event.clientX, y2: event.clientY})

    });


    board.addEventListener('mousemove', function (event) {
        if (isDrawing) {
            //drawline
            // draw(currentPos.x, currentPos.y, event.clientX, event.clientY)
            socket.emit('send_line', {x1: currentPos.x, y1: currentPos.y, x2: event.clientX, y2: event.clientY});
            currentPos.x = event.clientX;
            currentPos.y = event.clientY;

        }
    })

});