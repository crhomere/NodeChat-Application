var express = require('express'); // import the express framework
var http = require('http'); // import the http module
var app = express(); // create an express app
var server = http.createServer(app); // create an http server using the express app
var io = require('socket.io')(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});
var PORT = 8080; // specify the port for the server to listen on
var STATIC_CHANNELS = [
    {
        name: 'Global chat',
        participants: 0,
        id: 1,
        sockets: []
    },
    {
        name: 'Funny',
        participants: 0,
        id: 2,
        sockets: []
    },
];
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*'); // allow connections from any origin
    next(); // call the next middleware function
});
server.listen(PORT, function () {
    console.log("listening on *:".concat(PORT)); // log a message to the console
});
io.on('connection', function (socket) {
    console.log('new client connected'); // log a message to the console
    socket.emit('connection', null); // send a 'connection' event to the socket with no data
    socket.on('channel-join', function (id) {
        console.log('channel join', id); // log a message to the console with the channel id
        STATIC_CHANNELS.forEach(function (c) {
            if (c.id === id) { // if the channel id matches the id passed in the event
                if (c.sockets.indexOf(socket.id) === -1) { // if the socket is not already in the channel
                    c.sockets.push(socket.id); // add the socket to the channel
                    c.participants++; // increment the number of participants in the channel
                    io.emit('channel', c); // send a 'channel' event to all sockets with the updated channel data
                }
            }
            else { // if the channel id does not match the id passed in the event
                var index = c.sockets.indexOf(socket.id); // find the index of the socket in the channel
                if (index !== -1) { // if the socket is in the channel
                    c.sockets.splice(index, 1); // remove the socket from the channel
                    c.participants--; // decrement the number of participants in the channel
                    io.emit('channel', c); // send a 'channel' event to all sockets with the updated channel data
                }
            }
        });
        return id; // return the id of the channel that the socket joined
    });
    socket.on('send-message', function (message) {
        io.emit('message', message); // send a 'message' event to all sockets with the message data
    });
    socket.on('disconnect', function () {
        STATIC_CHANNELS.forEach(function (c) {
            var index = c.sockets.indexOf(socket.id); // find the index of the socket in the channel
            if (index !== -1) { // if the socket is in the channel
                c.sockets.splice(index, 1); // remove the socket from the channel
                c.participants--; // decrement the number of participants in the channel
                io.emit('channel', c); // send a 'channel' event to all sockets with the updated channel data
            }
        });
    });
});
/**
 * @description This methods retrieves the static channels
 */
app.get('/getChannels', function (req, res) {
    res.json({
        channels: STATIC_CHANNELS
    });
});
