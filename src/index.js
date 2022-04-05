import React from 'react';
// import ReactDOM from 'react-dom';
import * as ReactDOMClient from 'react-dom/client';
import App from './App.js';
import './index.css';

const root = ReactDOMClient.createRoot(document.querySelector('#root'));
root.render(<App />);
