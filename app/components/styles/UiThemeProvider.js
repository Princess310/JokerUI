import {Component, PropTypes} from 'react';
import getUiTheme from './getUiTheme';

class UiThemeProvider extends Component {
	static propTypes = {
		children: PropTypes.element,
		uiTheme: PropTypes.object,
	}

	static childContextTypes = {
		uiTheme: PropTypes.object.isRequired,
	}

	getChildContext() {
		return {
			uiTheme: this.props.uiTheme || getUiTheme(),
		};
	}

	render() {
		return this.props.children;
	}
}

export default UiThemeProvider;
