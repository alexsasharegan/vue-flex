import Flex from "./components/Flex"
import "./styles/main.scss"

export default {
    install(Vue, options = {}) {
        Vue.component("Flex", Flex)
    }
}
