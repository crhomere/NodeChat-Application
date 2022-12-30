# Server 

This is a server file that uses the express and http modules to create a web server and the socket.io module to create a real-time communication server. It listens for incoming socket connections, and defines several event listeners to handle different types of events that can be emitted by the sockets.

The server listens on port 8080, and it allows connections from any origin with the GET and POST methods. It also sets the Access-Control-Allow-Origin header to * to allow cross-origin resource sharing.

The server has two predefined channels, Global chat and Funny, which are stored in the STATIC_CHANNELS array. Each channel object has the following properties:

name: the name of the channel
participants: the number of sockets currently connected to the channel
id: the unique identifier for the channel
sockets: an array of socket IDs that are currently connected to the channel
The server listens for the following events:

connection: emitted when a new socket connects to the server
channel-join: emitted when a socket wants to join a channel
send-message: emitted when a socket wants to send a message
disconnect: emitted when a socket disconnects from the server
When a socket connects, the server sends a connection event to the socket with no data. When a socket emits a channel-join event, the server adds the socket to the specified channel (if it's not already in the channel) and updates the number of participants in the channel. When a socket emits a send-message event, the server broadcasts the message to all connected sockets. When a socket disconnects, the server removes the socket from the channel it was connected to (if it was in a channel) and updates the number of participants in the channel.

# Chat

This is a chat application built with React that uses the socket.io-client library to connect to a server and enable real-time communication between multiple users. It has two main components: ChannelList and MessagesPanel.

The ChannelList component displays a list of available chat channels, and the MessagesPanel component displays the messages for the selected channel. The app also has a Chat component, which is the top-level component that manages the state of the app and communicates with the server.

The Chat component has the following state properties:

channels: an array of channels
socket: the socket object used to communicate with the server
channel: the currently selected channel
The Chat component has the following methods:

configureSocket: sets up the socket connection and listens for events from the server
loadChannels: retrieves the list of available channels from the server
handleChannelSelect: handles the selection of a channel by the user
sendMessage: sends a message to the server to be broadcast to all connected sockets
The Chat component also has a componentDidMount lifecycle method that is called after the component has been mounted to the DOM. It calls the loadChannels and configureSocket methods to load the channels from the server and set up the socket connection.

The server URL is defined as http://127.0.0.1:8080, and the app makes a GET request to http://localhost:8080/getChannels to retrieve the list of available channels. When a user selects a channel, the app sends a channel-join event to the server with the channel ID. When a user sends a message, the app sends a send-message event to the server with the message and the channel ID. The server broadcasts the message to all connected sockets, and the app updates the state of the MessagesPanel component to display the new message.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
