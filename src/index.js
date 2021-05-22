import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { initializeApp } from 'firebase/app';
import 'bootstrap/dist/css/bootstrap.min.css';
import registerServiceWorker from './registerServiceWorker';
import { firebaseConfig } from './config';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import "react-bootstrap/dist/react-bootstrap.min.js";


initializeApp(firebaseConfig);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
