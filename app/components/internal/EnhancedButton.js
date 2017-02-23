import React, {Component, PropTypes} from 'react';
import TouchRipple from './TouchRipple';

function getStyles(props, context, state) {
	const {
		disabled,
		disableTouchRipple,
	} = props;

	const { enhancedButton } = context.uiTheme;

	return {
		border: 8,
		boxSizing: 'border-box',
		display: 'inline-block',
		WebkitTapHighlightColor: enhancedButton.tapHighlightColor,
		cursor: disabled ? 'default' : 'pointer',
		textDecoration: 'none',
		margin: 0,
		padding: 0,
		outline: 'none',
		transform: disableTouchRipple ? null : 'translate(0, 0)',
	}
}

class EnhancedButton extends Component {
	static propTypes = {
		centerRipple: PropTypes.bool,
		children: PropTypes.node,
		disableTouchRipple: PropTypes.bool,
		disabled: PropTypes.bool,
		onBlur: PropTypes.func,
		onClick: PropTypes.func,
		onFocus: PropTypes.func,
		onKeyDown: PropTypes.func,
		onKeyUp: PropTypes.func,
		onKeyboardFocus: PropTypes.func,
		onMouseDown: PropTypes.func,
		onMouseEnter: PropTypes.func,
		onMouseLeave: PropTypes.func,
		onMouseUp: PropTypes.func,
		onTouchEnd: PropTypes.func,
		onTouchStart: PropTypes.func,
		onTouchTap: PropTypes.func,
		style: PropTypes.object,
		touchRippleColor: PropTypes.string,
		touchRippleOpacity: PropTypes.number,
	}

	static contextTypes = {
		uiTheme: PropTypes.object.isRequired
	}

	static defaultProps = {
		onBlur: () => {},
		onClick: () => {},
		onFocus: () => {},
		onKeyDown: () => {},
		onKeyUp: () => {},
		onKeyboardFocus: () => {},
		onMouseDown: () => {},
		onMouseEnter: () => {},
		onMouseLeave: () => {},
		onMouseUp: () => {},
		onTouchEnd: () => {},
		onTouchStart: () => {},
		onTouchTap: () => {},
		centerRipple: true
	}

	state = { isKeyboardFocused: false }

	handleBlur = (e) => {

	}

	handleClick = (e) => {
		
	}

	handleFocus = (e) => {
		
	}

	handleKeyUp = (e) => {
		
	}

	handleKeyDown = (e) => {
		
	}

	handleTouchTap = (e) => {
	}

	createButtonChildren() {
		const {
			centerRipple,
			children,
			disabled,
			disableTouchRipple,
			touchRippleColor,
			touchRippleOpacity,
		} = this.props;

		const touchRipple = (!disabled && !disableTouchRipple) ? (
			<TouchRipple
				centerRipple={centerRipple}
				color={touchRippleColor}
				opacity={touchRippleOpacity}
			>
				{children}
			</TouchRipple>
		) : children;

		return touchRipple;
	}

	render() {
		const {
			centerRipple,
			children,
			disableTouchRipple,
			disabled,
			onBlur,
			onClick,
			onFocus,
			onKeyDown,
			onKeyUp,
			onKeyboardFocus,
			onTouchTap,
			touchRippleColor,
			touchRippleOpacity,
			style,
			...other,
		} = this.props;

		const styles = Object.assign(getStyles(this.props, this.context, this.state), style);

		const props = {
			style: styles,
			ref: 'enhancedButton',
			disabled: disabled,
			onBlur: this.handleBlur,
			onClick: this.handleClick,
			onFocus: this.handleFocus,
			onKeyUp: this.handleKeyUp,
			onKeyDown: this.handleKeyDown,
			onTouchTap: this.handleTouchTap,
			...other,
		}

		 const buttonChildren = this.createButtonChildren();

		return(
			<button {...props}>
				{buttonChildren}
			</button>
		)
	}
}

export default EnhancedButton;