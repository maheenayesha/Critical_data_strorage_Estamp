import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import Firs from './Firs';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><Firs /></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
