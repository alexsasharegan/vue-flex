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
              grow
              wrap
              tag="main">
            <my-content></my-content>
            <my-content></my-content>
            <my-content></my-content>
        </flex>
    </flex>
</main>
```
