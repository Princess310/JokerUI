import React, {Component, PropTypes} from 'react';

function getStyles(props, context, state) {
	const { color, hoverColor, active } = props;

	const { fontIcon } = context.uiTheme;
	const defaultColor = color || fontIcon.defaultColor;
	const activeColor = hoverColor || defaultColor;

	return {
		color: active ? activeColor : (state.hovered ? activeColor : defaultColor),
		fontSize: fontIcon.fontSize,
		display: 'inline-block'
	}
}

class FontIcon extends Component {
	static propTypes = {
		/**
		 * color for font icon
		 */
		color: PropTypes.string,
		// color for mouse hover
		hoverColor: PropTypes.string,
		// record the active status, if true, set the color for hoverColor
		active: PropTypes.bool,
		// mouse event to control hover color
		onMouseEnter: PropTypes.func,
		onMouseLeave: PropTypes.func,
		// override the style
		style: PropTypes.object,
	}

	static contextTypes = {
		uiTheme: PropTypes.object.isRequired
	}

	static defaultProps = {
		onMouseEnter: () => {},
		onMouseLeave: () => {},
	}

	state = {
		hovered: false
	}

	handleMouseLeave = (e) => {
		// when mouse leave, should reset the hover color
		this.setState({hovered: false});

		this.props.onMouseLeave && this.props.onMouseLeave(e);
	}

	handleMouseEnter = (e) => {
		this.props.hoverColor && this.setState({ hovered: true });

		this.props.onMouseEnter && this.props.onMouseEnter(e);
	}

	render() {
		const {
			color,
			hoverColor,
			active,
			style,
			...other
		} = this.props;

		const styles = getStyles(this.props, this.context, this.state);

		return (
			<span
				{...other}
				onMouseLeave={this.handleMouseLeave}
				onMouseEnter={this.handleMouseEnter}
				style={Object.assign(styles, style)}
			/>
		)
	}
}

export default FontIcon;