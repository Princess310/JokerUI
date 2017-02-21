import React from 'react';
import {Route, IndexRoute} from 'react-router';
import {createHashHistory} from 'history';

import App from './views/App';
import Dashboard from './views/Dashboard';
import Typography from './views/Typography';

const routes = (
	<Route path="/" component={App}>
		<IndexRoute component={Dashboard}/>
		<Route path="css" component={Typography}></Route>
	</Route>
);

export {routes};