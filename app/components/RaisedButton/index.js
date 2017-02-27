import React, {Component, PropTypes} from 'react';
import FlatButton from '../FlatButton';
import Paper from '../Paper';

class RaisedButton extends Component {
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
		zDepth: 1,
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
		const zDepth = this.props.disabled ? 0 : 1;
		this.setState({
			zDepth: zDepth,
		});
	}

	handleMouseUp = (e) => {
		this.setState({
			zDepth: 1,
		});
	}

	handleMouseDown = (e) => {
		this.setState({
			zDepth: 2,
		});
	}

	handleMouseLeave = (e) => {
		this.setState({
			zDepth: 1,
		});
	}

	render() {
		const {
			children,
			style,
			primary,
			secondary,
			disabled,
			...other,
		} = this.props;

		const {
			button,
			raisedButton,
		} = this.context.uiTheme;

		const paperStyle = Object.assign({}, {
			display: 'inline-block'
		}, style);

		let backgroundColor = raisedButton.defaultBackgroundColor;
		let textColor = raisedButton.textColor;

		if(disabled){
			backgroundColor = raisedButton.disabledBackgroundColor;
			textColor = raisedButton.disabledTextColor;
		}else if(primary){
			backgroundColor = raisedButton.primaryColor;
			textColor = raisedButton.primaryTextColor;
		}else if(secondary){
			backgroundColor = raisedButton.secondaryColor;
			textColor = raisedButton.secondaryTextColor;
		}

		const buttonHeight = style && style.height || button.height;

		const buttonStyle = {
			width: '100%',
			height: buttonHeight,
			lineHeight: `${buttonHeight}px`,
			color: textColor,
			backgroundColor: backgroundColor,
		};

		return (
			<Paper style={paperStyle} zDepth={this.state.zDepth}>
				<FlatButton
					label="RaisedButton"
					onMouseUp={this.handleMouseUp}
					onMouseDown={this.handleMouseDown}
					onMouseLeave={this.handleMouseLeave}
					style={buttonStyle}
					disabled={disabled}
					{...other}
				>
					{children}
				</FlatButton>
			</Paper>
		)
	}
}

export default RaisedButton;