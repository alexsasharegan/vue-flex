import { mergeData } from "vue-functional-data-merge";
import Flex from "./Flex";

export default {
	functional: true,
	inheritAttrs: false,
	render(h, { props, data, children }) {
		return h(
			Flex,
			mergeData(data, {
				props: {
					column: false,
				},
			}),
			children
		);
	},
};
