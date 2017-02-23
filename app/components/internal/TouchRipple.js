import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import ReactTransitionGroup from 'react-addons-transition-group';
import Dom from '../../utils/dom';
import CircleRipple from './CircleRipple';

// Remove the first element of the array
const shift = ([, ...newArray]) => newArray;
function getStyles(props, context, state) {
	return {
		position: 'absolute',
		top: 0,
		left: 0,
		height: '100%',
		width: '100%',
		overflow: 'hidden',
	};
}

class TouchRipple extends Component {
	static propTypes = {
		centerRipple: PropTypes.bool,
		children: PropTypes.node,
		color: PropTypes.string,
		opacity: PropTypes.number,
	}

	static contextTypes = {
		uiTheme: PropTypes.object.isRequired,
	}

	state = {
		hasRipples: false,
		nextKey: 0,
		ripples: [],
	}

	getRippleStyle(e) {
		const el = ReactDOM.findDOMNode(this);
		const elHeight = el.offsetHeight;
		const elWidth = el.offsetWidth;
		const offset = Dom.offset(el);
		const isTouchEvent = e.touches && e.touches.length;
		const pageX = isTouchEvent ? e.touches[0].pageX : e.pageX;
		const pageY = isTouchEvent ? e.touches[0].pageY : e.pageY;
		const pointerX = pageX - offset.left;
		const pointerY = pageY - offset.top;
		const topLeftDiag = Math.hypot(pointerX, pointerY);
		const topRightDiag = Math.hypot(elWidth - pointerX, pointerY);
		const botRightDiag = Math.hypot(elWidth - pointerX, elHeight - pointerY);
		const botLeftDiag = Math.hypot(pointerX, elHeight - pointerY);
		const rippleRadius = Math.max(
			topLeftDiag, topRightDiag, botRightDiag, botLeftDiag
		);
		const rippleSize = rippleRadius * 2;
		const left = pointerX - rippleRadius;
		const top = pointerY - rippleRadius;

		return {
			height: rippleSize,
			width: rippleSize,
			top: top,
			left: left,
		}
	}

	start(e, isRippleTouchGenerated) {
		const { ripple } = this.context.uiTheme;
		const {
			centerRipple,
			color,
			opacity
		} = this.props;

		let ripples = this.state.ripples;

		ripples = [
			...ripples, (
				<CircleRipple
					key={this.state.nextKey}
					style={!centerRipple ? this.getRippleStyle(e) : {}}
					color={color || ripple.color}
					opacity={opacity}
					touchGenerated={isRippleTouchGenerated}
				/>
			)
		];

		this.setState({
			hasRipples: true,
			nextKey: this.state.nextKey + 1,
			ripples: ripples,
		});
	}

	end() {
		const currentRipples = this.state.ripples;

		this.setState({
			ripples: shift(currentRipples),
		});
	}

	handleMouseUp = (e) => {
		this.end();
	}

	handleMouseDown = (e) => {
		if (e.button === 0) {
			this.start(e, false);
		}
	}

	handleMouseLeave = (e) => {
		this.end();
	}

	handleTouchStart = (e) => {
		e.stopPropagation();

		this.start(event, true);
	}

	handleTouchEnd = (e) => {
		this.end();
	}

	render() {
		const {
			style,
			...other
		} = this.props;
		const { hasRipples, ripples } = this.state;

		const styles = Object.assign(getStyles(this.props, this.context, this.state), style);
		let rippleGroup;

		if(hasRipples){
			rippleGroup = (
				<ReactTransitionGroup style={styles}>
					{ripples}
				</ReactTransitionGroup>
			);
		}

		return (
			<div
				onMouseUp={this.handleMouseUp}
				onMouseDown={this.handleMouseDown}
				onMouseLeave={this.handleMouseLeave}
				onTouchStart={this.handleTouchStart}
				onTouchEnd={this.handleTouchEnd}
			>
				{rippleGroup}
				{this.props.children}
			</div>
		)
	}
}

export default TouchRipple;