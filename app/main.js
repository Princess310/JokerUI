import React from 'react';
import ReactDOM from 'react-dom';
import {Router, browserHistory} from 'react-router';
import {history, routes} from './routes';

const root = (
	<Router history={browserHistory} routes={routes} />
)

ReactDOM.render(
	root,
	document.body.appendChild(document.createElement('div'))
);
