# Server 

The server.ts file (built in NodeJS) uses the express and http modules to create a web server and the socket.io module to create a real-time communication server. It listens for incoming socket connections, and defines several event listeners to handle different types of events that can be emitted by the sockets.

The server listens on port 8080, and it allows connections from any origin with the GET and POST methods. It also sets the Access-Control-Allow-Origin header to * to allow cross-origin resource sharing.

The server has two predefined channels, Global chat and Funny, which are stored in the STATIC_CHANNELS array. Each channel object has the following properties:

* name: the name of the channel
* participants: the number of sockets currently connected to the channel
* id: the unique identifier for the channel
* sockets: an array of socket IDs that are currently connected to the channel

The server listens for the following events:

* connection: emitted when a new socket connects to the server
* channel-join: emitted when a socket wants to join a channel
* send-message: emitted when a socket wants to send a message
* disconnect: emitted when a socket disconnects from the server

When a socket connects, the server sends a connection event to the socket with no data. When a socket emits a channel-join event, the server adds the socket to the specified channel (if it's not already in the channel) and updates the number of participants in the channel. When a socket emits a send-message event, the server broadcasts the message to all connected sockets. When a socket disconnects, the server removes the socket from the channel it was connected to (if it was in a channel) and updates the number of participants in the channel.

To start up the server run the following commands in console: 
## 'tsc server.ts' 
  * This complies the typescript code into javascript
## 'node server.js'
  * This starts the server

A successful start of the sever should look like the following: 
<img width="642" alt="image" src="https://user-images.githubusercontent.com/87340993/210110739-2d86478b-cae3-4d65-b9e2-f1e04f8d0e58.png">

# Chat

This is a chat application built with React that uses the socket.io-client library to connect to a server and enable real-time communication between multiple users. It has two main components: ChannelList and MessagesPanel.

The ChannelList component displays a list of available chat channels, and the MessagesPanel component displays the messages for the selected channel. The app also has a Chat component, which is the top-level component that manages the state of the app and communicates with the server.


The Chat component also has a componentDidMount lifecycle method that is called after the component has been mounted to the DOM. It calls the loadChannels and configureSocket methods to load the channels from the server and set up the socket connection.

The server URL is defined as http://127.0.0.1:8080, and the app makes a GET request to http://localhost:8080/getChannels to retrieve the list of available channels. When a user selects a channel, the app sends a channel-join event to the server with the channel ID. When a user sends a message, the app sends a send-message event to the server with the message and the channel ID. The server broadcasts the message to all connected sockets, and the app updates the state of the MessagesPanel component to display the new message.

The Chat component has the following state properties:

* channels: an array of channels
* socket: the socket object used to communicate with the server
* channel: the currently selected channel

The Chat component has the following methods:

* configureSocket: sets up the socket connection and listens for events from the server
* loadChannels: retrieves the list of available channels from the server
* handleChannelSelect: handles the selection of a channel by the user
* sendMessage: sends a message to the server to be broadcast to all connected sockets

To run the chat application run the following command in console: 
### `npm start` or
### `npm run start`

To test communication between two different users, copy and paste the url into another browser and have them side by side like in the below picture: 
<img width="1268" alt="image" src="https://user-images.githubusercontent.com/87340993/210110400-7efe4f24-b09f-45c3-b1f0-8254c1cf0f60.png">

# Testing

The ChatComponent folder contains unit tests for the Chat component. The tests ensure that the component:

* Renders without crashing
* Renders the channel-list and messages-panel elements

To run the tests, you'll need to have the following dependencies installed:

* @testing-library/react
* react

To run the tests, you can use a testing library or tool of your choice, such as Jest. Here's an example of how you might run the tests using Jest:

Copy code
jest path/to/Chat.test.js

You can also add more tests to this script to cover additional functionality of the Chat component. Just make sure to import any necessary dependencies and to use the describe and it functions to structure your tests.

To run the test script for this project run the following command:

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

A successful test looks like the following:
<img width="404" alt="image" src="https://user-images.githubusercontent.com/87340993/210110550-304dc5b6-11d7-4813-aabc-57079ee89ab7.png">



