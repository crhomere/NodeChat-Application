//This is a script to run automatic unit tests. 
//Right now it only checks if the core components 
//render but it can be updated to do more through tests
import { render } from '@testing-library/react';
import Chat from './Chat';

describe('Chat component', () => {
  it('renders without crashing', () => {
    render(<Chat />);
  });

  it('renders the channel list and messages panel', () => {
    const { getByTestId } = render(<Chat />);
    expect(getByTestId('channel-list')).toBeInTheDocument();
    expect(getByTestId('messages-panel')).toBeInTheDocument();
  });
});
