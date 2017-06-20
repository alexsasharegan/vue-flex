<template>
    <component :is="tag"
               :class="flexClassList">
        <slot></slot>
    </component>
</template>

<style lang="scss">
    @import "../styles/flex";
</style>

<script>
import flexPropsMixin from '../mixins/flexProps'

export default {
    mixins: [flexPropsMixin],
}
</script>
