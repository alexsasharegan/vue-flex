import { mergeData } from "vue-functional-data-merge";

const Shared = ["start", "end", "center"];
const JustifyContent = Shared.concat(["between", "around"]);
const AlignItems = Shared.concat(["baseline", "stretch"]);
const AlignAxes = Shared.concat(["between", "baseline", "stretch"]);

function boolPropFactory() {
	const props = {};
	for (let i = 0, len = arguments.length; i < len; i++) {
		props[arguments[i]] = { type: Boolean, default: false };
	}
	return props;
}

export const props = Object.assign(
	boolPropFactory(
		"inline",
		"column",
		"reverse",
		"noWrap",
		"wrapReverse",
		"grow"
	),
	{
		tag: {
			type: String,
			default: "div",
		},
		justify: {
			type: String,
			default: null,
			validator: type => JustifyContent.indexOf(type) !== -1,
		},
		align: {
			type: String,
			default: null,
			validator: type => AlignItems.indexOf(type) !== -1,
		},
		// Cannot prefix with `v` because it's parsed as directive.
		alignH: {
			type: String,
			default: null,
			validator: type => AlignAxes.indexOf(type) !== -1,
		},
		// Cannot prefix with `v` because it's parsed as directive.
		alignV: {
			type: String,
			default: null,
			validator: type => AlignAxes.indexOf(type) !== -1,
		},
	}
);

export default {
	functional: true,
	props,
	render(h, { props, data, children }) {
		let componentData = { class: [] };
		let classObj = {};
		let hAxis = "justify-content",
			hProp = "justify",
			vAxis = "align-items",
			vProp = "align";

		if (props.column) {
			hAxis = "align-items";
			hProp = "align";
			vAxis = "justify-content";
			vProp = "justify";
		}

		componentData.class.push(`vf__flex${props.inline ? "--inline" : ""}`);
		componentData.class.push(
			`vf__flex-dir--${props.column ? "column" : "row"}${
				props.reverse ? "-reverse" : ""
			}`
		);
		componentData.class.push(classObj);

		classObj[
			`vf__flex-wrap${props.wrapReverse ? "-reverse" : ""}`
		] = !props.noWrap;
		classObj[`vf__flex-nowrap`] = props.noWrap;
		classObj[`vf__grow-children`] = props.grow;
		classObj[`vf__justify-content-${props.justify}`] = props.justify;
		classObj[`vf__align-items-${props.align}`] = props.align;
		classObj[`vf__${hAxis}-${props.alignH}`] = props.alignH && !props[hProp];
		classObj[`vf__${vAxis}-${props.alignV}`] = props.alignV && !props[vProp];

		return h(props.tag, mergeData(data, componentData), children);
	},
};
