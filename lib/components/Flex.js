function classReducer(memo, s) {
    // Filter truthy values so we only apply the prefix to a class name
    if (s) {
        memo.push("vf__" + s)
    }

    return memo
}

function baseClass({ inline }) {
    return `${inline ? "inline-" : ""}flex`
}

function flexDirection({ column, reverse }) {
    return `flex-${column ? "column" : "row"}${reverse ? "-reverse" : ""}`
}

function flexClasses(props) {
    return [
        baseClass(props),
        flexDirection(props),
        props.wrap ? "flex-wrap" : null,
        props.noWrap ? "flex-nowrap" : null,
        props.grow ? "grow-children" : null,
        props.justify ? `justify-content-${props.justify}` : null,
        props.align ? `align-items-${props.align}` : null
    ]
        .reduce(classReducer, [])
        .join(" ")
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

    props: {
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
        },

        ...boolPropFactory(["inline", "column", "reverse", "wrap", "noWrap", "grow"])
    },

    render(h, { props, data, children }) {
        return h(
            props.tag,
            Object.assign({}, data, {
                staticClass: data.staticClass ? `${data.staticClass} ${flexClasses(props)}` : flexClasses(props)
            }),
            children
        )
    }
}
