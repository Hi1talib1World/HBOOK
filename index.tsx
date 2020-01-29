import React, { Component } from 'react';
import { render } from 'react-dom';

import App from './src/App';


interface AppProps { }
interface AppState {
  name: string;
}

render((<App />), document.getElementById('root'));