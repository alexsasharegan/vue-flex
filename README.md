# vue-flex
A Vue.js functional component to wrap anything in flexbox. (~1kb gzipped js+css)

## Getting Started
```js
import Vue from "vue"
import VueFlex from "vue-flex"
import "vue-flex/dist/vue-flex.css"

Vue.use(VueFlex)
```

```html
<main>
    <my-navbar></my-navbar>
    <flex tag="section">
        <my-sidebar></my-sidebar>
        <flex column
              justify="center"
              align="center"
              <!-- Shorthand for :grow="true" -->
              grow
              wrap
              tag="main"
              <!-- Don't forget to add the .native modifier for DOM events -->
              @click.native="onClick"
              <!-- You can chain other modifiers after .native -->
              @scroll.native.stop
        >
            <my-content></my-content>
            <my-content></my-content>
            <my-content></my-content>
        </flex>
    </flex>
</main>
```

## Props
| Prop | Type | Default | Description |
|:----:|:----:|:-------:|-------------|
| tag | String | `"div"` | Element tagName |
| inline | Boolean | `false` | `display: inline-flex` |
| column | Boolean | `false` | `flex-direction: column` _(row is default)_ |
| reverse | Boolean | `false` | `flex-direction: row-reverse|column-reverse` |
| wrap | Boolean | `false` | `flex-wrap: wrap` |
| noWrap | Boolean | `false` | `flex-wrap: nowrap` |
| grow | Boolean | `false` | Applies to all child nodes: `{flex-grow:1;flex-shrink:1;flex-basis:0;}` |
| justify | String | `null` | One of `[ "start", "end", "center", "between", "around" ]` |
| align | String | `null` | One of `[ "start", "end", "center", "baseline", "stretch" ]` |

## Attaching Event Listeners
It's important to note that when using `v-on:event="handler"` on a Vue component, this listens only to custom event emitted by the component itself.

**In order to access native DOM events, use the `.native` modifier.**

For more info on this, visit these resources from the vuejs.org website:
- [Binding Native Events to Custom Components](https://vuejs.org/v2/guide/components.html#Binding-Native-Events-to-Components)
- [`v-on` modifier API reference](https://vuejs.org/v2/api/#v-on)
