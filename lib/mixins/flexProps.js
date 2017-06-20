const JUSTIFY_CONTENT = ["start", "end", "center", "between", "around"]
const ALIGN_ITEMS = ["start", "end", "center", "baseline", "stretch"]

export default {
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
            validator: type => JUSTIFY_CONTENT.includes(type)
        },
        align: {
            type: String,
            default: null,
            validator: type => ALIGN_ITEMS.includes(type)
        }
    },
    computed: {
        flexClass() {
            let className = []
            if (this.size) className.push(this.size)
            if (this.inline) className.push("inline")
            className.push("flex")

            return "vf__" + className.join("-")
        },

        flexDirection() {
            let direction = ["vf__flex", this.column ? "column" : "row"]
            if (this.reverse) direction.push("reverse")

            return direction.join("-")
        },

        justifyContent() {
            return this.justify ? `vf__justify-content-${this.justify}` : null
        },

        alignItems() {
            return this.align ? `vf__align-items-${this.align}` : null
        },

        flexClassList() {
            return [
                this.flexClass,
                this.flexDirection,
                this.wrap ? "vf__flex-wrap" : null,
                this.noWrap ? "vf__flex-nowrap" : null,
                this.grow ? "vf__grow-children" : null,
                this.justifyContent,
                this.alignItems
            ]
        }
    }
}
