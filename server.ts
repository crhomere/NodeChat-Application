
const express = require('express');// import the express framework
const http = require('http'); // import the http module

const app = express(); // create an express app
const server = http.createServer(app); // create an http server using the express app
const io: any = require('socket.io')(server,  { // create a socket.io server using the http server
    cors: { // specify the cors options
        origin: '*', // allow connections from any origin
        methods: ['GET', 'POST'], // allow GET and POST methods
    },
});
const PORT = 8080; // specify the port for the server to listen on

const STATIC_CHANNELS: { // define the type for the STATIC_CHANNELS array
    name: string; // the channel name is a string
    participants: number; // the number of participants in the channel is a number
    id: number; // the channel id is a number
    sockets: string[]; // the sockets connected to the channel is an array of strings
}[] = [ // define the STATIC_CHANNELS array with two objects
        {
            name: 'Global chat', // the first channel has the name 'Global chat'
            participants: 0, // there are currently 0 participants in this channel
            id: 1, // the channel id is 1
            sockets: [], // there are currently no sockets connected to this channel
        },
        {
            name: 'Funny', // the second channel has the name 'Funny'
            participants: 0, // there are currently 0 participants in this channel
            id: 2, // the channel id is 2
            sockets: [], // there are currently no sockets connected to this channel
        },
    ];

app.use((req, res, next) => { // middleware function to set the Access-Control-Allow-Origin header
    res.setHeader('Access-Control-Allow-Origin', '*'); // allow connections from any origin
    next(); // call the next middleware function
});

server.listen(PORT, () => { // start the server and listen on the specified port
    console.log(`listening on *:${PORT}`); // log a message to the console
});

io.on('connection', (socket) => { // listen for a new socket connection
    console.log('new client connected'); // log a message to the console
    socket.emit('connection', null); // send a 'connection' event to the socket with no data
    socket.on('channel-join', (id) => { // listen for a 'channel-join' event from the socket
        console.log('channel join', id); // log a message to the console with the channel id
        STATIC_CHANNELS.forEach((c) => { // loop through the STATIC_CHANNELS array
            if (c.id === id) { // if the channel id matches the id passed in the event
                if (c.sockets.indexOf(socket.id) === -1) { // if the socket is not already in the channel
                    c.sockets.push(socket.id); // add the socket to the channel
                    c.participants++; // increment the number of participants in the channel
                    io.emit('channel', c); // send a 'channel' event to all sockets with the updated channel data
                }
            } else { // if the channel id does not match the id passed in the event
                const index = c.sockets.indexOf(socket.id); // find the index of the socket in the channel
                if (index !== -1) { // if the socket is in the channel
                    c.sockets.splice(index, 1); // remove the socket from the channel
                    c.participants--; // decrement the number of participants in the channel
                    io.emit('channel', c); // send a 'channel' event to all sockets with the updated channel data
                }
            }
        });

        return id; // return the id of the channel that the socket joined
    });
    socket.on('send-message', (message) => { // listen for a 'send-message' event from the socket
        io.emit('message', message); // send a 'message' event to all sockets with the message data
    });

    socket.on('disconnect', () => { // listen for a 'disconnect' event from the socket
        STATIC_CHANNELS.forEach((c) => { // loop through the STATIC_CHANNELS array
            const index = c.sockets.indexOf(socket.id); // find the index of the socket in the channel
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
app.get('/getChannels', (req, res) => { // listen for a GET request to the '/getChannels' route
    res.json({ // send a JSON response
        channels: STATIC_CHANNELS, // with the STATIC_CHANNELS array
    });
});
