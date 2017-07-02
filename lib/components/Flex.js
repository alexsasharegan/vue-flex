function flexClasses(props) {
    return [
        `${props.inline ? "inline-" : ""}flex`,
        `flex-${props.column ? "column" : "row"}${props.reverse ? "-reverse" : ""}`,
        props.wrap ? "flex-wrap" : null,
        props.noWrap ? "flex-nowrap" : null,
        props.grow ? "grow-children" : null,
        props.justify ? `justify-content-${props.justify}` : null,
        props.align ? `align-items-${props.align}` : null
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
