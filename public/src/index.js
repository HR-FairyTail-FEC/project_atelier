import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import '../../public/dist/styles.css';

const container = document.getElementById('app');

const root = ReactDOM.createRoot(container);

root.render(<App />);