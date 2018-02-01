# vue-flex

[![npm version](https://badge.fury.io/js/vue-flex.svg)](https://badge.fury.io/js/vue-flex)
[![npm downloads](https://img.shields.io/npm/dt/vue-flex.svg)](https://www.npmjs.com/package/vue-flex)
[![GitHub issues](https://img.shields.io/github/issues/alexsasharegan/vue-flex.svg?style=flat)](https://github.com/alexsasharegan/vue-flex/issues)
[![GitHub stars](https://img.shields.io/github/stars/alexsasharegan/vue-flex.svg)](https://github.com/alexsasharegan/vue-flex/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/alexsasharegan/vue-flex.svg)](https://github.com/alexsasharegan/vue-flex/network)
[![Twitter](https://img.shields.io/twitter/url/https/github.com/alexsasharegan/vue-flex.svg?style=social)](https://twitter.com/intent/tweet?text=Wow:&url=https%3A%2F%2Fgithub.com%2Falexsasharegan%2Fvue-flex)

A Vue.js functional component to wrap anything in flexbox. (1.8kb gzipped js+css, or 1.2k js & .6k css)

## Getting Started

```js
import Vue from "vue";
// imports the ESM module by default
import VueFlex from "vue-flex";
// Already autoprefixed for vendor prefixes.
// Also namespaced to avoid collisions.
import "vue-flex/dist/vue-flex.css";

Vue.use(VueFlex);
```

### Dist Varieties

The main export is an es2015 module, but commonjs and umd modules are also available:

* Commonjs: `"vue-flex/dist/vue-flex.common.js"`
* UMD: `"vue-flex/dist/vue-flex.js"`

```html
<main>
    <my-navbar></my-navbar>
    <flex-row tag="section">
        <my-sidebar></my-sidebar>
        <flex-col
              tag="main"
              align-v="center"
              align-h="center"
              grow
              wrap
              @click="handleClick"
        >
            <my-content></my-content>
            <my-content></my-content>
            <my-content></my-content>
        </flex-col>
    </flex-row>
</main>
```

## Component Props

|  Prop   |  Type   | Default | Description                                                               |
| :-----: | :-----: | :-----: | ------------------------------------------------------------------------- |
|   tag   | String  | `"div"` | Element tagName _(any valid HTML tag name)_                               |
| inline  | Boolean | `false` | `display: inline-flex`                                                    |
| column  | Boolean | `false` | `flex-direction: column` _(row is default)_                               |
| reverse | Boolean | `false` | `flex-direction: row-reverse|column-reverse`                              |
|  wrap   | Boolean | `false` | `flex-wrap: wrap`                                                         |
| noWrap  | Boolean | `false` | `flex-wrap: nowrap`                                                       |
|  grow   | Boolean | `false` | Applies to all child nodes: `{flex-grow:1;flex-shrink:1;flex-basis:0;}`   |
| justify | String  | `null`  | One of `[ "start", "end", "center", "between", "around" ]`                |
|  align  | String  | `null`  | One of `[ "start", "end", "center", "baseline", "stretch" ]`              |
| alignV  | String  | `null`  | One of `[ "start", "end", "center", ["between", "baseline",] "stretch" ]` |
| alignH  | String  | `null`  | One of `[ "start", "end", "center", ["between", "baseline",] "stretch" ]` |

\* `alignV` and `alignH` just use `align` & `justify` under the hood, but when using the directional flex components, they handle the confusion of which axis is vertical/horizontal.

## v2

Version 2 brings two new components `<flex-row>` & `<flex-col>`. In general, these just wrap the column property and make your markup more declarative. I've also added `alignV` & `alignH` props to all the components. These will use `align-items` & `justify-content` to determine the correct axis to apply your settings. Remembering which axis is vertical when in column direction is a classic confusion for me, so this abstracts that into a much more declarative api.

## Flexbox all the things!

While building a large Vue.js application, I found myself constantly repeating the usage of various CSS flexbox utility classes, so I wrapped all the classes in a simple Vue component. This worked beautifully! But for two problems:

* How do I listen for native events on the `<flex>` component? Do I really have to re-emit all the native events to enable `v-on:event`?
  * _No! You can use the `.native` modifier when binding native event listeners to a custom Vue component. I find this to be a huge stumbling block for beginners because the documentation around this feature is too easy to miss. For more info:_
    * [**Binding Native Events to Custom Components**](https://vuejs.org/v2/guide/components.html#Binding-Native-Events-to-Components)
    * [**`v-on` modifier API reference**](https://vuejs.org/v2/api/#v-on)
* How am I supposed to find anything in the Vue devtools component tree if so many of my components are wrapped in these `<flex>` tags?
  * _If you have a `<ul>` with a bunch of `<flex>` wrapped `<li>`'s, it's annoying. If you use flexbox heavily, it legitimately wastes time performing a vnode scavenger hunt whenever you need to debug a particular item._

## Functional Vue Components

Functional Vue components are a real game changer here. Not only does the modifier-less `v-on:event` syntax work again to bind to native events (when the root element of the component is an HTML Element), but functional components do not appear in Vue devtools. Beyond the debugging experience, there is a performance boost to be had as well. Functional components are stateless (no `data`) and instanceless (no `this` context). This removes the initial overhead of observation and is very beneficial when a component is likely to be rendered many times in your app (think list items in a large list).
