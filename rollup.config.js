const fs = require("fs");
const path = require("path");
const vue = require("rollup-plugin-vue").default;
const buble = require("rollup-plugin-buble");
const resolve = require("rollup-plugin-node-resolve");
const commonjs = require("rollup-plugin-commonjs");
const scss = require("rollup-plugin-scss");
const postcss = require("postcss");
const autoprefixer = require("autoprefixer");
const { terser } = require("rollup-plugin-terser");
const CleanCSS = require("clean-css");
const { camelCase } = require("lodash");
const { name} = require("./package.json");

const base = __dirname;
const src = path.resolve(base, "lib");
const dist = path.resolve(base, "dist");

// Ensure dist directory exists
if (!fs.existsSync(dist)) {
	fs.mkdirSync(dist);
}

module.exports = {
	input: path.resolve(src, "index.js"),
	plugins: [
		vue(),
		scss({
			// Processor will be called with two arguments:
			// - style: the compiled css
			// - id: import id
			processor(css) {
				return postcss([autoprefixer])
					.process(css)
					.then(result => result.css);
			},
			// - styles: the contents of all style tags combined: 'body { color: green }'
			// - styleNodes: an array of style objects: { filename: 'body { ... }' }
			output(styles, styleNodes) {
				postcss([autoprefixer])
					.process(styles)
					.then(({ css }) => {
						fs.writeFileSync(
							`./dist/${name}.css`,
							new CleanCSS().minify(css).styles
						);
					});
			},
		}),
		buble({
			objectAssign: "Object.assign",
		}),
		resolve({ external: ["vue"] }),
		commonjs(),
		terser(),
	],
	output: [
		{
			format: "cjs",
			name: camelCase(name),
			file: `./dist/${name}.common.js`,
			sourcemap: true,
		},
		{
			format: "es",
			file: `./dist/${name}.esm.js`,
			sourcemap: true,
		},
		{
			format: "umd",
			name: camelCase(name),
			file: `./dist/${name}.js`,
			sourcemap: true,
		},
	],
};
