# vue-flex
More documentation and examples to come! Feel free to peruse the tiny source :)

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
