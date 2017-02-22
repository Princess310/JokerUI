import React, {Component} from 'react';
import { Link } from 'react-router';
import styles from './styles.less';

class AppBarMenu extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className='jk-app-bar menu'>
				<Link to='/'>概述</Link>
				<Link to='css'>CSS样式</Link>
				<Link to='components'>组件</Link>
			</div>
		)
	}
}

export default AppBarMenu;