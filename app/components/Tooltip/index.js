import React, {Component, PropTypes} from 'react';
import transitions from '../styles/transitions';

function getStyles(props, context, state) {
	const verticalPosition = props.verticalPosition;
	const horizontalPosition = props.horizontalPosition;
	const touchMarginOffset = props.touch ? 10 : 0;
	const touchOffsetTop = props.touch ? -20 : -10;
	const offset = verticalPosition === 'bottom' ?
		14 + touchMarginOffset : -14 - touchMarginOffset;

	const { toolTip, zIndex } = context.uiTheme;

	const styles = {
		wrapper: {
			position: 'absolute',
			top: 0,
			right: 0,
			bottom: 0,
			left: 0,
			zIndex: zIndex.toolTip,
		},
		root: {
			position: 'absolute',
			top: -10000,
			fontSize: '10px',
			lineHeight: '22px',
			padding: '0 8px',
			color: toolTip.color,
			borderRadius: 2,
			userSelect: 'none',
			opacity: 0,
			overflow: 'hidden',
			right: horizontalPosition === 'left' ? 12 : null,
			left: horizontalPosition === 'center' ?
				(state.offsetWidth - 48) / 2 * -1 : null,
			transition: `${transitions.easeOut('0ms', 'top', '450ms')}, ${
				transitions.easeOut('450ms', 'transform', '0ms')}, ${
				transitions.easeOut('450ms', 'opacity', '0ms')}`,
		},
		label: {
			position: 'relative',
			whiteSpace: 'nowrap',
		},
		ripple: {
			position: 'absolute',
			left: horizontalPosition === 'center' ? '50%' :
			horizontalPosition === 'left' ? '100%' : '0%',
			top: verticalPosition === 'bottom' ? 0 : '100%',
			transform: 'translate(-50%, -50%)',
			borderRadius: '50%',
			backgroundColor: 'transparent',
			transition: `${transitions.easeOut('0ms', 'width', '450ms')}, ${
			transitions.easeOut('0ms', 'height', '450ms')}, ${
			transitions.easeOut('450ms', 'backgroundColor', '0ms')}`,
		},
		rootWhenShown: {
			top: verticalPosition === 'top' ?
				touchOffsetTop : 36,
			opacity: 0.9,
			transform: `translate(0px, ${offset}px)`,
			transition: `${transitions.easeOut('0ms', 'top', '0ms')}, ${
			transitions.easeOut('450ms', 'transform', '0ms')}, ${
			transitions.easeOut('450ms', 'opacity', '0ms')}`,
		},
		rootWhenTouched: {
			fontSize: '14px',
			lineHeight: '32px',
			padding: '0 16px',
		},
		rippleWhenShown: {
			backgroundColor: toolTip.rippleBackgroundColor,
			transition: `${transitions.easeOut('450ms', 'width', '0ms')}, ${
			transitions.easeOut('450ms', 'height', '0ms')}, ${
			transitions.easeOut('450ms', 'backgroundColor', '0ms')}`,
		},
	};

	return styles;
}

class ToolTip extends Component {
	static propTypes = {
		horizontalPosition: PropTypes.oneOf(['left', 'right', 'center']),
		verticalPosition: PropTypes.oneOf(['top', 'bottom']),
		label: PropTypes.node.isRequired,
		show: PropTypes.bool,
		touch: PropTypes.bool,
		style: PropTypes.object,
	}

	static contextTypes = {
		uiTheme: PropTypes.object.isRequired,
	}

	static defaultProps = {
		horizontalPosition: 'center',
		verticalPosition: 'top',
	}

	state = {
		shown: false,
		offsetWidth: null,
	}

	componentDidMount() {
		this.setRippleSize();
		this.setToolTipPosition();
	}

	componentDidUpdate() {
		this.setRippleSize();
	}

	showToolTip = () => {
		this.setState({
			shown: true
		});
		this.setToolTipPosition();
	}

	hideToolTip = () => {
		this.setState({
			shown: false
		});
		this.setToolTipPosition();
	}

	setRippleSize() {
		const ripple = this.refs.ripple;
		const toolTip = this.refs.toolTip;
		const toolTipWidth = parseInt(toolTip.offsetWidth, 10) /
			(this.props.horizontalPosition === 'center' ? 2 : 1);
		const toolTipHeight = parseInt(toolTip.offsetHeight, 10);

		const rippleDiameter = Math.ceil((Math.sqrt(Math.pow(toolTipHeight, 2) +
								Math.pow(toolTipWidth, 2) ) * 2));
		if (this.state.shown) {
			ripple.style.height = `${rippleDiameter}px`;
			ripple.style.width = `${rippleDiameter}px`;
		} else {
			ripple.style.width = '0px';
			ripple.style.height = '0px';
		}
	}

	setToolTipPosition() {
		this.setState({offsetWidth: this.refs.toolTip.offsetWidth});
	}

	render() {
		const {
			horizontalPosition,
			verticalPosition,
			label,
			touch,
			style,
			...other,
		} = this.props;

		const styles = getStyles(this.props, this.context, this.state);

		return(
			<div
				style={styles.wrapper}
				onMouseEnter={this.showToolTip}
				onMouseLeave={this.hideToolTip}
			>
				<div
					ref="toolTip"
					style={Object.assign(
						styles.root,
						this.state.shown && styles.rootWhenShown,
						this.props.touch && styles.rootWhenTouched,
						this.props.style
					)}
				>
					<div
						ref="ripple"
						style={Object.assign(
							styles.ripple,
							this.state.shown && styles.rippleWhenShown
						)}
					/>
					<span style={styles.label}>
						{label}
					</span>
				</div>
			</div>
		)
	}
}

export default ToolTip;