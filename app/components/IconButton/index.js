import React, {Component, PropTypes} from 'react';
import transitions from '../styles/transitions';
import EnhancedButton from '../internal/EnhancedButton';
import FontIcon from '../FontIcon';
import { fade } from '../../utils/colorManipulator';

class IconButton extends Component {
	static propTypes = {
		children: PropTypes.node,
		disabled: PropTypes.bool,
		iconClassName: PropTypes.string,
		iconStyle: PropTypes.object,
		active: PropTypes.bool,
		onMouseEnter: PropTypes.func,
		onMouseLeave: PropTypes.func,
		onTouchStart: PropTypes.func,
		style: PropTypes.object,
	}

	static contextTypes = {
		uiTheme: PropTypes.object.isRequired,
	}

	static defaultProps = {
		disabled: false,
		onMouseEnter: () => {},
		onMouseLeave: () => {},
		onTouchStart: () => {},
	}

	handleMouseEnter = (e) => {
		this.props.onMouseEnter(e);
	}

	handleMouseLeave = (e) => {
		this.props.onMouseLeave(e);
	}

	handleTouchStart = (e) => {
		this.props.onTouchStart(event);
	}

	render() {
		const {
			disabled,
			children,
			active,
			iconClassName,
			iconStyle,
			rippleColor,
			rippleOpacity,
			style,
			...other,
		} = this.props;
		let iconElement;
		let cricleElement;

		const { hoverColor, color, ...otherIconStyle } = Object.assign({}, iconStyle);

		const {
			iconButton,
		} = this.context.uiTheme;

		const defaultTextColor = disabled ? iconButton.disabledTextColor : (color || iconButton.textColor);
		let buttonRippleColor = rippleColor || color || iconButton.buttonFilterColor;

		if(active && hoverColor){
			buttonRippleColor = hoverColor;
		}

		const buttonStyle = Object.assign({}, {
			position: 'relative',
			color: defaultTextColor,
			transition: transitions.easeOut(),
			borderRadius: '50%',
			userSelect: 'none',
			overflow: 'hidden',
			padding: 10,
			margin: 0,
			textAlign: 'center',
			backgroundColor: iconButton.defaultBackgroundColor,
		}, style);

		if(iconClassName){
			iconElement = (
				<FontIcon
					className={iconClassName}
					hoverColor={hoverColor}
					style={
						Object.assign({}, {
							color: disabled ? (hoverColor ? hoverColor: iconButton.disabledTextColor) : (active ? hoverColor : color)
						}, otherIconStyle)
					}
					active={active}
				>
					{children}
				</FontIcon>
			)
		}

		if(active){
			cricleElement = (
				<div style={{
					position: 'absolute',
					top: '0',
					right: '0',
					bottom: '0',
					left: '0',
					backgroundColor: fade(buttonRippleColor, 0.3),
				}} />
			);
		}

		return (
			<EnhancedButton
				centerRipple={true}
				disabled={disabled}
				onMouseLeave={this.handleMouseLeave}
				onMouseEnter={this.handleMouseEnter}
				onMouseOut={this.handleMouseOut}
				touchRippleColor={buttonRippleColor}
				touchRippleOpacity={ rippleOpacity || 0.3}
				style={Object.assign(buttonStyle, this.props.style)}
				{...other}
			>
				{iconElement}
				{cricleElement}
			</EnhancedButton>
		)
	}
}

export default IconButton;