import defaultTheme from './baseThemes/defaultTheme';

export default function getUiThem(uiTheme, ...args) {
	const { palette } = defaultTheme;

	uiTheme = Object.assign({
		fontIcon: {
			defaultColor: palette.blackPalette.dark,
			fontSize: '24px'
		}
	}, defaultTheme, uiTheme, args);

	return uiTheme;
}