const JUSTIFY_CONTENT = ["start", "end", "center", "between", "around"]
const ALIGN_ITEMS = ["start", "end", "center", "baseline", "stretch"]

function isArray(obj) {
    return Object.prototype.toString.call(obj) === "[object Array]"
}

function normalizeClassToArray(c) {
    let classArray = []
    let classObj = {}

    if (isArray(c)) {
        classArray = [...c]
    } else if (typeof a === "object") {
        Object.assign(classObj, c)
    } else if (typeof a === "undefined") {
        return classArray
    } else {
        // String value
        classArray.push(c)
    }

    if (Object.keys(classObj).length > 0) {
        return [classObj]
    } else {
        return classArray
    }
}

function mergeClasses(...classes) {
    return classes.reduce((memo, c) => [...memo, ...normalizeClassToArray(c)], [])
}

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
        ...["inline", "column", "reverse", "wrap", "noWrap", "grow"].reduce(
            (memo, prop) => Object.assign(memo, { [prop]: { type: Boolean, default: false } }),
            {}
        ),
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

    render(h, { props, children, data: dataProps }) {
        const data = {
            ...dataProps,
            class: mergeClasses(dataProps.class, flexClassList(props))
        }

        return h(props.tag, data, children)
    }
}
