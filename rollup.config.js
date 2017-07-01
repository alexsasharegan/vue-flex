const fs = require("fs")
const path = require("path")
const vue = require("rollup-plugin-vue")
const buble = require("rollup-plugin-buble")
const resolve = require("rollup-plugin-node-resolve")
const commonjs = require("rollup-plugin-commonjs")
const uglify = require("rollup-plugin-uglify")
const scss = require("rollup-plugin-scss")
const postcss = require("postcss")
const autoprefixer = require("autoprefixer")
const { minify } = require("uglify-es")
const CleanCSS = require("clean-css")
const { camelCase } = require("lodash")
const { name, dependencies } = require("./package.json")

const base = __dirname
const src = path.resolve(base, "lib")
const dist = path.resolve(base, "dist")

// Ensure dist directory exists
if (!fs.existsSync(dist)) {
    fs.mkdirSync(dist)
}

module.exports = {
    entry: path.resolve(src, "index.js"),
    // external: Object.keys(dependencies),
    moduleName: name,
    plugins: [
        vue(),
        scss({
            // Processor will be called with two arguments:
            // - style: the compiled css
            // - id: import id
            processor(css) {
                console.log(css)
                return postcss([autoprefixer]).process(css).then(result => result.css)
            },
            // - styles: the contents of all style tags combined: 'body { color: green }'
            // - styleNodes: an array of style objects: { filename: 'body { ... }' }
            output(styles, styleNodes) {
                postcss([autoprefixer]).process(styles).then(({ css }) => {
                    fs.writeFileSync(`./dist/${name}.css`, new CleanCSS().minify(css).styles)
                })
            }
        }),
        buble(),
        resolve({ external: ["vue"] }),
        commonjs(),
        uglify({}, minify)
    ],
    globals: {},
    targets: [
        {
            format: "cjs",
            moduleName: camelCase(name),
            dest: `./dist/${name}.common.js`,
            sourceMap: true
        },
        {
            format: "es",
            dest: `./dist/${name}.esm.js`,
            sourceMap: true
        },
        {
            format: "umd",
            moduleName: camelCase(name),
            dest: `./dist/${name}.js`,
            sourceMap: true
        }
    ]
}
