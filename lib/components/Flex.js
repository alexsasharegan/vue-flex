function flexClasses(props) {
    return [
        `vf__${props.inline ? "inline-" : ""}flex`,
        `vf__flex-${props.column ? "column" : "row"}${props.reverse ? "-reverse" : ""}`,
        props.wrap ? "vf__flex-wrap" : null,
        props.noWrap ? "vf__flex-nowrap" : null,
        props.grow ? "vf__grow-children" : null,
        props.justify ? `vf__justify-content-${props.justify}` : null,
        props.align ? `vf__align-items-${props.align}` : null
    ]
}

const SHARED = ["start", "end", "center"]
const JUSTIFY_CONTENT = SHARED.concat(["between", "around"])
const ALIGN_ITEMS = SHARED.concat(["baseline", "stretch"])

function boolPropFactory(propList) {
    let props = {}

    propList.forEach(p => (props[p] = { type: Boolean, default: false }))

    return props
}

export default {
    functional: true,

    props: Object.assign(
        {
            tag: {
                type: String,
                default: "div"
            },

            justify: {
                type: String,
                default: null,
                validator: type => JUSTIFY_CONTENT.indexOf(type) !== -1
            },

            align: {
                type: String,
                default: null,
                validator: type => ALIGN_ITEMS.indexOf(type) !== -1
            }
        },
        boolPropFactory(["inline", "column", "reverse", "wrap", "noWrap", "grow"])
    ),
    render(h, { props, data, children }) {
        return h(
            props.tag,
            Object.assign({}, data, {
                class: [data.class, flexClasses(props)]
            }),
            children
        )
    }
}
