import "core-js/stable";
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import 'antd/dist/antd.css';
import register from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
register();
