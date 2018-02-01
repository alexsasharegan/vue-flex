import * as components from "./components";
import "./styles/main.scss";

export default {
	install(Vue) {
		for (const component in components) {
			if (Object.hasOwnProperty.call(components, component)) {
				Vue.component(component, components[component]);
			}
		}
	},
	name: "vue-flex",
};
