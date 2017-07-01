const JUSTIFY_CONTENT = ["start", "end", "center", "between", "around"]
const ALIGN_ITEMS = ["start", "end", "center", "baseline", "stretch"]

function baseClass({ inline }) {
    let className = []
    if (inline) className.push("inline")
    className.push("flex")

    return "vf__" + className.join("-")
}

function flexDirection({ reverse, column }) {
    let direction = ["vf__flex", column ? "column" : "row"]
    if (reverse) direction.push("reverse")

    return direction.join("-")
}

function flexClassList(props) {
    return [
        baseClass(props),
        flexDirection(props),
        props.wrap ? "vf__flex-wrap" : null,
        props.noWrap ? "vf__flex-nowrap" : null,
        props.grow ? "vf__grow-children" : null,
        props.justify ? `vf__justify-content-${props.justify}` : null,
        props.align ? `vf__align-items-${props.align}` : null
    ]
}

export default {
    functional: true,

    props: {
        tag: {
            type: String,
            default: "div"
        },
        inline: { type: Boolean },
        column: { type: Boolean },
        reverse: { type: Boolean },
        wrap: { type: Boolean },
        noWrap: { type: Boolean },
        grow: { type: Boolean },
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

    render(h, { props, children, data }) {
        return h(
            props.tag,
            {
                ...data,
                class: flexClassList(props)
            },
            children
        )
    }
}
