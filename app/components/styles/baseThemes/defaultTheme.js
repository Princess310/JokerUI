/**
 * Default Theme for UI: Make Sure All the theme color things defined here.
 */
import { indigo, pink, grey, blackPalette, whitePalette, black, white, transparent } from '../colors';

export default {
	palette: {
		primary: {
			light: indigo['100'],
			normal: indigo['500'],
			deep: indigo['700'],
		},
		secondary: {
			light: pink['A100'],
			normal: pink['A200'],
			deep: pink['A400'],
		},
		grey: grey,
		accent: pink['A200'],
		blackPalette, whitePalette,
		black, white, transparent
	},
}