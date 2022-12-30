import React from 'react'; 
import socketClient from 'socket.io-client'; 
import { ChannelList } from './ChannelList'; 
import './chat.scss';
import { MessagesPanel } from './MessagesPanel'; 

const SERVER = 'http://127.0.0.1:8080'; // define the server URL

// define the ChatProps interface
interface ChatProps { }

// define the ChatState interface
interface ChatState {
    channels: any[]; // an array of channels
    socket: any; // the socket object
    channel: any; // the currently selected channel
}

//The code defines a React component called Chat which is responsible for rendering 
//the chat interface and handling the communication with the server. The component 
//has a state object that contains data about the channels, socket connection, 
//and currently selected channel.
export default class Chat extends React.Component<ChatProps, ChatState> {
    socket: any; // define the socket property

    // define the constructor, which takes in the ChatProps props argument
    // and calls the parent class' constructor with the props
    constructor(props: ChatProps) {
        super(props);

        // set the initial state of the component
        this.state = {
            channels: [], // an empty array of channels
            socket: null, // a null socket object
            channel: null, // a null channel object
        };
    }

    // define the componentDidMount lifecycle method, which is called
    // after the component has been mounted to the DOM
    componentDidMount() {
        this.loadChannels(); // load the channels from the server
        this.configureSocket(); // configure the socket connection
    }

    // define the configureSocket method, which sets up the socket connection
    configureSocket = () => {
        // create a new socket connection to the SERVER
        const socket = socketClient(SERVER);
        // listen for a 'connection' event from the socket
        socket.on('connection', () => {
            // if there is a channel selected, join the channel
            if (this.state.channel) {
                this.handleChannelSelect(this.state.channel.id);
            }
        });
        // listen for a 'channel' event from the socket
        socket.on('channel', (channel) => {
            // update the channels in the component's state with the updated channel data
            const channels = this.state.channels;
            channels.forEach((c) => {
                if (c.id === channel.id) {
                    c.participants = channel.participants;
                }
            });
            this.setState({ channels }); // update the component's state
        });
        // listen for a 'message' event from the socket
        socket.on('message', (message) => {
            // update the channels in the component's state with the new message
            const channels = this.state.channels;
            channels.forEach((c) => {
                if (c.id === message.channel_id) {
                    if (!c.messages) {
                        c.messages = [message];
                    } else {
                        c.messages.push(message);
                    }
                }

            });
            this.setState({ channels });
        });
        this.socket = socket;
    };

    // define the loadChannels method, which loads the channels from the server
    loadChannels = async () => {
        // make a GET request to the server to retrieve the channels
        fetch('http://localhost:8080/getChannels')
            .then(async (response) => {
                // parse the response as JSON
                const data = await response.json();
                // update the component's state with the retrieved channels
                this.setState({ channels: data.channels });
            });
    };

    // define the handleChannelSelect method, which handles the selection of a channel
    handleChannelSelect = (id: any) => {
        // find the selected channel in the component's state
        const channel = this.state.channels.find((c) => {
            return c.id === id;
        });
        // update the component's state with the selected channel
        this.setState({ channel });
        // emit a 'channel-join' event to the socket with the selected channel's ID
        this.socket.emit('channel-join', id, (ack: any) => { });
    };

    // define the handleSendMessage method, which handles the sending of a message
    handleSendMessage = (channel_id: any, text: string) => {
        // emit a 'send-message' event to the socket with the message data
        this.socket.emit('send-message', {
            channel_id,
            text,
            senderName: this.socket.id, //The user id is unique for every socket connection
            id: Date.now(),
        });
    };

    // define the render method, which returns the JSX for the component
    render() {
        return (
            // render the component's JSX
            <div className="chat-app">
                <span data-testid='channel-list'><ChannelList channels={this.state.channels} onSelectChannel={this.handleChannelSelect} /></span>
                <span data-testid="messages-panel"><MessagesPanel onSendMessage={this.handleSendMessage} channel={this.state.channel} /></span>
            </div>
        );
    }
}
