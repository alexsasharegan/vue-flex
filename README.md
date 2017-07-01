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
