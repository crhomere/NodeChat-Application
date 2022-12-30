import React, { useState, useEffect } from 'react'; // import the React library and the useState and useEffect hooks

// define the ChannelProps interface
interface ChannelProps {
  id: any; // the ID of the channel
  name: string; // the name of the channel
  participants: number; // the number of participants in the channel
  onClick: (id: any) => void; // a function that is called when the channel is clicked
}

// define the Channel functional component, which takes in the ChannelProps props argument
export const Channel: React.FC<ChannelProps> = ({ id, name, participants, onClick }) => {
  // define the click function, which calls the onClick function with the ID of the channel
  const click = () => {
    onClick(id);
  };

  // return the JSX for the component
  return (
    // render a div with the "channel-item" class and an onClick event that calls the click function
    <div className="channel-item" onClick={click}>
      <div>{name}</div> 
      <span>{participants}</span>
    </div>
  );
};
