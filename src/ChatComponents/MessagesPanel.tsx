import React, { useState, useEffect } from 'react'; // import the React library and the useState and useEffect hooks
import { Message } from './Message'; // import the Message component

// define the MessagesPanelProps interface
interface MessagesPanelProps {
  channel: any; // the current channel
  onSendMessage: (channel_id: any, text: string) => void; // a function that is called when a message is sent
}

// define the MessagesPanel component, which takes in the MessagesPanelProps props argument
export function MessagesPanel(props: MessagesPanelProps) {
  // destructure the props
  const { channel, onSendMessage } = props;
  // use the useState hook to manage the inputValue state variable and setInputValue function
  const [inputValue, setInputValue] = useState('');

  // define the send function, which sends a message if the input value is not empty
  const send = () => {
    if (inputValue && inputValue !== '') {
      onSendMessage(channel.id, inputValue);
      setInputValue('');
    }
  };

  // define the handleInput function, which updates the inputValue state variable when the input value changes
  const handleInput = (e: any) => {
    setInputValue(e.target.value);
  };

  // initialize the list variable to a message to display if there are no messages to show
  let list = <div className="no-content-message">There is no messages to show</div>;
  if (channel && channel.messages) {
    // map the messages to Message components and pass in the necessary props
    list = channel.messages.map((m: any) => (
      <Message key={m.id} senderName={m.senderName} text={m.text} />
    ));
  }  
    // return the JSX for the component
    return (
      // render a div with the "messages-panel" class
      <div className="messages-panel">
        <div className="meesages-list">{list}</div>
        {
          // if there is a channel, render the input and send button
          channel && (
            <div className="messages-input">
              <input type="text" onChange={handleInput} value={inputValue} />
              <button onClick={send}>Send</button>
            </div>
          )
        }
      </div>
    );
  }
  