// 1. Import `extendTheme`
import { extendTheme } from "@chakra-ui/react";

// 2. Call `extendTheme` and pass your custom values
export const theme = extendTheme({
	fonts: {
		heading: 'Codystar, sans-serif'
	},
	colors: {
		brand: {
			10: "#343a40",
			20: "#495057",
			30: "#ced4da",
			40: "#f1f3f5",
			50: "#1098ad",
			60: "#ffa94d",
		},
	},
});
