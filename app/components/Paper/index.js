import React, {Component, PropTypes} from 'react';

function getStyles(props, context, state) {
	const {
		circle,
		zDepth,
		rounded,
	} = props;

	const { paper } = context.uiTheme;

	return {
		color: paper.color,
		boxSizing: 'border-box',
		backgroundColor: paper.backgroundColor,
		WebkitTapHighlightColor: 'rgba(0,0,0,0)',
		boxShadow: paper.zDepthShadows[zDepth - 1],
		borderRadius: circle ? '50%' : rounded ? '2px' : '0px',
	}
}

class FontIcon extends Component {
	static propTypes = {
		// children for paper
		children: PropTypes.node,
		// set to be circlular paper
		circle: PropTypes.bool,
		// z-index of depth to show shadow things
		zDepth: PropTypes.oneOf([1, 2, 3, 4, 5]),
		// override the style
		style: PropTypes.object,
	}

	static contextTypes = {
		uiTheme: PropTypes.object.isRequired
	}

	static defaultProps = {
		circle: false,
		rounded: true,
		zDepth: 1,
	}

	render() {
		const {
			children,
			circle,
			style,
			rounded,
			zDepth,
			...other
		} = this.props;

		const styles = getStyles(this.props, this.context);

		return (
			<div
				{...other}
				style={Object.assign(styles, style)}
			>
				{children}
			</div>
		)
	}
}

export default FontIcon;