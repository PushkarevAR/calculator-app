import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import calculate from './utils/calculate';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);

console.log(
  calculate('100/2/2/2'),
);
