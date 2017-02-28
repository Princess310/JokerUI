import React, {Component, PropTypes} from 'react';
import transitions from '../styles/transitions';
import EnhancedButton from '../internal/EnhancedButton';
import createFragment from 'react-addons-create-fragment';

class FlatButton extends Component {
	static propTypes = {
		backgroundColor: PropTypes.string,
		children: PropTypes.node,
		disabled: PropTypes.bool,
		hoverColor: PropTypes.string,
		icon: PropTypes.node,
		// label for button
		label: PropTypes.string,
		labelPosition: PropTypes.oneOf([
			'before',
			'after'
		]),
		labelStyle: PropTypes.object,
		rippleColor: PropTypes.string,
		rippleOpacity: PropTypes.number,
		// palette primary color
		primary: PropTypes.bool,
		// palette second color
		secondary: PropTypes.bool,
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
		label: '',
		labelStyle: {},
		labelPosition: 'after',
		onMouseEnter: () => {},
		onMouseLeave: () => {},
		onTouchStart: () => {},
	}

	state = {
		hovered: false,
		touch: false
	}

	// so good to have a check for disabled
	componentWillReceiveProps(nextProps) {
		if (nextProps.disabled) {
			this.setState({
				hovered: false,
			});
		}
	}

	handleMouseEnter = (e) => {
		if (!this.state.touch) this.setState({hovered: true});
		this.props.onMouseEnter(e);
	}

	handleMouseLeave = (e) => {
		this.setState({hovered: false});
		this.props.onMouseLeave(e);
	}

	handleTouchStart = (e) => {
		this.setState({touch: true});
		this.props.onTouchStart(event);
	}

	render() {
		const {
			children,
			disabled,
			hoverColor,
			backgroundColor,
			icon,
			label,
			labelStyle,
			labelPosition,
			primary,
			secondary,
			rippleColor,
			rippleOpacity,
			style,
			...other,
		} = this.props;

		const {
			button,
			flatButton,
		} = this.context.uiTheme;

		const defaultTextColor = disabled ? flatButton.disabledColor : (
			primary ? flatButton.primaryTextColor : (
				secondary ? flatButton.secondaryTextColor : flatButton.textColor
			)
		)

		const buttonRippleColor = rippleColor || flatButton.buttonFilterColor;
		const hovered = !disabled && this.state.hovered;

		const buttonStyle = Object.assign({}, {
			position: 'relative',
			height: button.height,
			minWidth: button.minWidth,
			lineHieght: `${button.height}px`,
			color: defaultTextColor,
			transition: transitions.easeOut(),
			borderRadius: button.borderRadius,
			userSelect: 'none',
			overflow: 'hidden',
			backgroundColor: hovered ? (hoverColor || flatButton.focusColor) : (backgroundColor || flatButton.backgroundColor),
			padding: 0,
			margin: 0,
			textAlign: 'center',
		}, style);

		let iconCloned;
		const labelStyleIcon = {};

		if (icon) {
			const iconStyles = Object.assign({
				verticalAlign: 'middle',
				marginLeft: label && labelPosition !== 'before' ? 12 : 0,
				marginRight: label && labelPosition === 'before' ? 12 : 0,
			}, icon.props.style);
			iconCloned = React.cloneElement(icon, {
				color: icon.props.color || buttonStyle.color,
				style: iconStyles,
			});

		    if (labelPosition === 'before') {
			    labelStyleIcon.paddingRight = 8;
		    } else {
			    labelStyleIcon.paddingLeft = 8;
		    }
		}

		const mergedLabelStyle = Object.assign({}, {
			letterSpacing: 0,
			paddingLeft: 16,
			paddingRight: 16,
		}, labelStyleIcon, labelStyle);

		const labelElement = label ? (
			<span style={mergedLabelStyle}>{label}</span>
		) : undefined;

		const childenFragment = labelPosition === 'before' ? {
			labelElement,
			iconCloned,
			children
		} : {
			children,
			iconCloned,
			labelElement
		}

		const buttonChildren = createFragment(childenFragment);

		return (
			<EnhancedButton
				{...other}
				disabled={disabled}
				onMouseLeave={this.handleMouseLeave}
				onMouseEnter={this.handleMouseEnter}
				onTouchStart={this.handleTouchStart}
				style={buttonStyle}
				touchRippleColor={buttonRippleColor}
				touchRippleOpacity={ rippleOpacity || 0.3}
			>
				{buttonChildren}
			</EnhancedButton>
		)
	}
}

export default FlatButton;