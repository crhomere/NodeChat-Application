import React, { useState, useEffect } from 'react'; // import the React library and the useState and useEffect hooks
import { Channel } from './Channel'; // import the Channel component

// define the ChannelListProps interface
interface ChannelListProps {
    channels: any[]; // an array of channels
    onSelectChannel: (id: any) => void; // a function that is called when a channel is selected
}

// define the ChannelList functional component, which takes in the ChannelListProps props argument
export const ChannelList: React.FC<ChannelListProps> = ({ channels, onSelectChannel }) => {
    // define the handleClick function, which takes in an ID and calls the onSelectChannel function with the ID
    const handleClick = (id: any) => {
        onSelectChannel(id);
    };

    let list: React.ReactNode = (
        // a message to display if there are no channels to show
        <div className="no-content-message">There is no channels to show</div>
    );
    if (channels && channels.map) {
        // map the channels to Channel components and pass in the necessary props
        list = channels.map((c: any) => (
            <Channel
                key={c.id}
                id={c.id}
                name={c.name}
                participants={c.participants}
                onClick={handleClick}
            />
        ));
    }

    // return the JSX for the component
    return (
        // render the list of Channel components in a div with the "channel-list" class
        <div className="channel-list">{list}</div>
    );
};

