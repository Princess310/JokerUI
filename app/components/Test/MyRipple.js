import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import Dom from '../../utils/dom';
import Paper from '../Paper';

class MyRipple extends Component {
	constructor(props) {
		super(props);
		this.state = {
			rippeRadius: 200,
			rippleTop: 0,
			rippleLeft: 0,
		};
	}

	handleMouseDown = (e) => {
		// we should get the node off set first
		const el = ReactDOM.findDOMNode(this);
		const elWidth = el.offsetWidth;
		const elHeight = el.offsetHeight;
		const elOfsset = Dom.offset(el);
		const pageX = e.pageX;
		const pageY = e.pageY;
		// then, we can get postion for ripple dom
		const top = pageY - elOfsset.top;
		const left = pageX - elOfsset.left;
		const style = this._ripple.style;
		style.opacity = '1';
		style.transform = 'scale(1)';

		this.setState({
			rippleTop: top,
			rippleLeft: left,
		});
	}

	handleMouseUp = (e) => {
		const style = this._ripple.style;

		style.opacity = 0;
		style.transform = 'scale(0)';
	}

	handleMouseMove = (e) => {
		
	}

	handleMouseLeave = (e) => {
	}

	render() {
		const { style, children } = this.props;
		const styles = {
			position: 'relative',
			width: '400px',
			height: '400px',
			cursor: 'pointer',
			overflow: 'hidden',
			textAlign: 'center',
			userSelect: 'none',
		};
		const { rippeRadius, rippleTop, rippleLeft } = this.state;

		const rippleStyle = {
			position: 'absolute',
			top: (rippleTop - rippeRadius / 2),
			left: (rippleLeft - rippeRadius / 2),
			transform: 'scale(0)',
			width: rippeRadius,
			height: rippeRadius,
			borderRadius: '50%',
			backgroundColor: 'rgba(0, 0, 0, 0.32)',
			opacity: 0.1,
			transition: 'transform 1s cubic-bezier(0.23, 1, 0.32, 1), opacity 2s cubic-bezier(0.23, 1, 0.32, 1)',
		};
		
		const rippleElement = (
			<div
				ref={(ref) => this._ripple = ref}
				style={rippleStyle}
			></div>
		);

		return(
			<Paper
				style={Object.assign(styles, style)}
				onMouseMove={this.handleMouseMove}
				onMouseDown={this.handleMouseDown}
				onMouseUp={this.handleMouseUp}
			>
				{rippleElement}
				{children}
			</Paper>
		)
	}
}

export default MyRipple;