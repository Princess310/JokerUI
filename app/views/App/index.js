import React from 'react';
import AppBar from '../AppBar';
import Grid from '../../components/Grid';
import UiThemeProvider from '../../components/styles/UiThemeProvider';
import styles from './app.less';

export default class App extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<UiThemeProvider>
				<div>
					<AppBar/>
					{this.props.children}
					<Grid />
				</div>
			</UiThemeProvider>
		);
	}
}