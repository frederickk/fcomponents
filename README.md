# FComponents

v0.2.0

### LitElements/Web components of common UI elements.

---
### Usage

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
### Build

| Command             | Description |
| ------------------- | ----------- |
| `npm run build`     | Runs Webpack build process once |
| `npm run build:dev` | Runs Webpack build in development mode and watches for changes |
| `npm run clean`     | Cleans build files |
| `npm run dev`       | Runs Webpack build process |



