import React from 'react';
import { render } from 'react-dom';
import { Chat } from './ChatComponents/Chat';
import './index.css';

render(
  <React.StrictMode>
    <Chat />
  </React.StrictMode>,
  document.getElementById('root')
);

