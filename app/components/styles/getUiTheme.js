import defaultTheme from './baseThemes/defaultTheme';
import { fade } from '../../utils/colorManipulator';

export default function getUiThem(uiTheme, ...args) {
	const { palette } = defaultTheme;

	uiTheme = Object.assign({
		fontIcon: {
			defaultColor: palette.blackPalette.dark,
			fontSize: '24px'
		},
		button: {
			height: 36,
			minWidth: 88,
			borderRadius: 2,
		},
		flatButton: {
			buttonFilterColor: '#999999',
			textColor: palette.blackPalette.dark,
			primaryTextColor: palette.primary.normal,
			secondaryTextColor: palette.secondary.light,
			focusColor: fade(palette.blackPalette.full, 0.12),
			pressedColor: fade('#999999', 0.4),
			disabledColor: fade(palette.blackPalette.full, 0.26),
			backgroundColor: palette.transparent,
		},
		raisedButton: {
			textColor: palette.blackPalette.dark,
			defaultBackgroundColor: palette.whitePalette.full,
			primaryTextColor: palette.whitePalette.full,
			primaryColor: palette.primary.normal,
			secondaryTextColor: palette.whitePalette.full,
			secondaryColor: palette.secondary.light,
			disabledTextColor: fade(palette.blackPalette.full, 0.26),
			disabledBackgroundColor: palette.blackPalette.faint,
		},
		floatActionButton: {
			buttonSize: 56,
			miniSize: 40,
			textColor: palette.blackPalette.dark,
			defaultBackgroundColor: palette.whitePalette.full,
			primaryTextColor: palette.whitePalette.full,
			primaryColor: palette.primary.normal,
			secondaryTextColor: palette.whitePalette.full,
			secondaryColor: palette.secondary.light,
			disabledTextColor: fade(palette.blackPalette.full, 0.26),
			disabledBackgroundColor: palette.blackPalette.faint,
		},
		iconButton: {
			defaultBackgroundColor: palette.transparent,
			buttonFilterColor: '#999999',
			textColor: palette.blackPalette.dark,
			disabledTextColor: fade(palette.blackPalette.full, 0.26),
		},
		ripple: {
			color: palette.blackPalette.dark,
		},
		enhancedButton: {
			tapHighlightColor: palette.transparent,
		},
		paper: {
			color: palette.blackPalette.dark,
			backgroundColor: palette.whitePalette.full,
			zDepthShadows: [
				[1, 6, 0.12, 1, 4, 0.24],
				[3, 10, 0.16, 3, 10, 0.23],
				[10, 30, 0.19, 6, 10, 0.23],
				[14, 45, 0.25, 10, 18, 0.22],
				[19, 60, 0.30, 15, 20, 0.22],
			].map((d) => (
				`0 ${d[0]}px ${d[1]}px ${fade(palette.blackPalette.dark, d[2])},
				0 ${d[3]}px ${d[4]}px ${fade(palette.blackPalette.dark, d[5])}`
			))
		},
	}, defaultTheme, uiTheme, args);
	return uiTheme;
}