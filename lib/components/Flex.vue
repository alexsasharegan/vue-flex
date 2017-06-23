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
import flexMixin from '../mixins/flexMixin'

export default {
    mixins: [flexMixin],
}
</script>
