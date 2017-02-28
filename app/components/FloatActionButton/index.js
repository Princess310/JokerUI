import React, {Component, PropTypes} from 'react';
import FlatButton from '../FlatButton';
import Paper from '../Paper';

class FloatActionButton extends Component {
	static propTypes = {
		backgroundColor: PropTypes.string,
		children: PropTypes.node,
		disabled: PropTypes.bool,
		hoverColor: PropTypes.string,
		icon: PropTypes.node,
		// button size to show
		size: PropTypes.number,
		// label for button
		label: PropTypes.string,
		labelPosition: PropTypes.oneOf([
			'before',
			'after'
		]),
		labelStyle: PropTypes.object,
		rippleColor: PropTypes.string,
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
		primary: false,
		secondary: false,
		onMouseEnter: () => {},
		onMouseLeave: () => {},
		onTouchStart: () => {},
	}

	state = {
		zDepth: 2,
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

	componentWillMount() {
		const zDepth = this.props.disabled ? 0 : 2;
		this.setState({
			zDepth: zDepth,
		});
	}

	handleMouseUp = (e) => {
		this.setState({
			zDepth: 2,
		});
	}

	handleMouseDown = (e) => {
		this.setState({
			zDepth: 3,
		});
	}

	handleMouseLeave = (e) => {
		this.setState({
			zDepth: 2,
		});
	}

	render() {
		const {
			children,
			style,
			size,
			primary,
			secondary,
			disabled,
			rippleColor,
			labelStyle,
			...other,
		} = this.props;

		const {
			button,
			FloatActionButton,
		} = this.context.uiTheme;

		const paperStyle = Object.assign({}, {
			display: 'inline-block'
		}, style);

		let backgroundColor = FloatActionButton.defaultBackgroundColor;
		let textColor = FloatActionButton.textColor;

		if(disabled){
			backgroundColor = FloatActionButton.disabledBackgroundColor;
			textColor = FloatActionButton.disabledTextColor;
		}else if(primary){
			backgroundColor = FloatActionButton.primaryColor;
			textColor = FloatActionButton.primaryTextColor;
		}else if(secondary){
			backgroundColor = FloatActionButton.secondaryColor;
			textColor = FloatActionButton.secondaryTextColor;
		}

		const buttonSize = size ? size : FloatActionButton.buttonSize;

		const buttonStyle = {
			width: buttonSize,
			height: buttonSize,
			minWidth: FloatActionButton.miniSize,
			minHeight: FloatActionButton.miniSize,
			borderRadius: '50%',
			lineHeight: `${buttonSize}px`,
			color: textColor,
			backgroundColor: backgroundColor,
		};

		const buttonLabelStyle = Object.assign({
			paddingLeft: 0,
			paddingRight: 0,
		}, labelStyle);

		return (
			<Paper style={paperStyle} zDepth={this.state.zDepth} circle={true}>
				<FlatButton
					rippleColor={rippleColor ? rippleColor : textColor}
					rippleOpacity={!(primary || secondary) ? 0.1 : 0.16}
					onMouseUp={this.handleMouseUp}
					onMouseDown={this.handleMouseDown}
					onMouseLeave={this.handleMouseLeave}
					style={buttonStyle}
					disabled={disabled}
					labelStyle={buttonLabelStyle}
					{...other}
				>
					{children}
				</FlatButton>
			</Paper>
		)
	}
}

export default FloatActionButton;