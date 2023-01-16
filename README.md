# FComponents

v0.3.0

### LitElements/Web components of common UI elements.

---
### Install

```
$npm i -D @frederickk/fcomponents
```

If using webpack, add this to your config.

```js
  module: {
    rules: [{
      test: /\.css|\.s(c|a)ss$/,
      use: [
        {
          loader: 'lit-scss-loader',
          options: {},
        },
        'extract-loader',
        'css-loader',
        'sass-loader'
      ],
      include: [
        // You need to tell WebPack where to look for the component SCSS files.
        path.resolve(__dirname, 'node_modules/@frederickk/fcomponents/components'),
      ],
    }],
  }
```

---
### Usage

## Button Debounce

Extends `HTMLButtonElement`

**API**

| Property | Description |
| --- |
| `active`
| `disabled`

| Event | Description |
| ------ |
| `click-debounce`
| `disabled`


**Events**

`click-debounce` CustomEvent

```js
const buttonDebounce = document.querySelector('button-toggle');
buttonDebounce.addEventListener('on', () => {
  console.log('button is toggled on');
});
```

Or if you using the element within another LitElement

```ts
return html`
  <button-debounce @click-debounce=$"{this.handlerOnEvent_}"></button-debounce>
`;

protected handlerOnEvent_() {
  console.log('button is toggled on');
};
```

## Button Toggle

Extends [`Button Debounce`](#button-debounce);

The **Button Toggle** is a button with 2 states `on` and `off`. Theses states can have different visuals by using the `slot` property within your element.

**Properties**

| Property | Description |
| --- |
| `active`
| `disabled`

**Events**

| Event            | Type             | Description |
| ---------------- | ---------------- | |
| `click-debounce` | `CustomEvent`    | inherited from [**Button Debounce**](#button-debounce) |
| `on`             | `CustomEvent`    | |
| `off`            | `CustomEvent`    | |


`click-debounce` CustomEvent


`on`

```js
const buttonToggle = document.querySelector('button-toggle');
buttonToggle.addEventListener('on', () => {
  console.log('button is toggled on');
});
```

Or if you using the element within another LitElement

```ts
return html`
  <button-toggle @on=$"{this.handlerOnEvent_}">
    <span slot="off">Off</span>
    <span slot="on">On</span>
  </button-toggle>
`;

protected handlerOnEvent_() {
  console.log('button is toggled on');
};
```

`off` CustomEvent

```ts
const buttonToggle = document.querySelector('button-toggle');
buttonToggle.addEventListener('off', () => {
  console.log('button is toggled off');
});
```

Or if you using the element within another LitElement

```js
return html`
  <button-toggle @off=$"{this.handlerOffEvent_}">
    <span slot="off">Off</span>
    <span slot="on">On</span>
  </button-toggle>
`;

protected handlerOffEvent_() {
  console.log('button is toggled off');
};
```


```html
  <button-toggle>
    <span slot="off">Off</span>
    <span slot="on">On</span>
  </button-toggle>
```


---
### Build

| Command             | Description |
| ------------------- | ----------- |
| `npm run build`     | Runs Webpack build process once |
| `npm run build:dev` | Runs Webpack build in development mode and watches for changes |
| `npm run clean`     | Cleans build files |
| `npm run dev`       | Runs Webpack build process |



