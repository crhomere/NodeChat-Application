import React, { useState, useEffect } from 'react'; // import the React library and the useState and useEffect hooks

// define the MessageProps interface
interface MessageProps {
  senderName: string; // the name of the sender of the message
  text: string; // the text of the message
}

// define the Message functional component, which takes in the MessageProps props argument
export const Message: React.FC<MessageProps> = ({ senderName, text }) => {
  // return the JSX for the component
  return (
    // render a div with the "message-item" class
    <div className="message-item">
      <div>
        <b>{senderName}</b>
      </div>
      <span>{text}</span>
    </div>
  );
};
