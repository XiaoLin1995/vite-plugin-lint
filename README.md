# vite-plugin-eslint

ESLint and StyleLint plugin for vite.

Forked from [vite-plugin-eslint](https://github.com/gxmari007/vite-plugin-eslint) and [@amatlash/vite-plugin-stylelint](https://github.com/AMatlash/vite-plugin-stylelint)

## Install

```
npm install vite-plugin-lint --save-dev
# or
yarn add vite-plugin-lint --dev
```

## Usage

```js
import { defineConfig } from 'vite'
import { eslintPlugin, stylelintPlugin } from 'vite-plugin-lint'

export default defineConfig({
  plugins: [eslintPlugin(), stylelintPlugin()]
})
```

## EslintPlugin Options

### `cache`

- Type: `boolean`
- Default: `false`

Decrease execution time.

### `fix`

- Type: `boolean`
- Default: `false`

Auto fix source code.

### `include`

- Type: `string | string[] | RegExp`
- Default: `['src/**/*.js', 'src/**/*.jsx', 'src/**/*.ts', 'src/**/*.tsx', 'src/**/*.vue']`

A single file, or array of files, to include when linting.

### `exclude`

- Type: `string | string[] | RegExp`
- Default: `'node_modules'`

A single file, or array of files, to exclude when linting.

### `formatter`

- Type: `string | ESLint.Formatter`
- Default: `stylish`

Custom error formatter or the name of a built-in formatter.

### `throwOnWarning`

- Type: `boolean`
- Default: `true`

The warings found will be emitted, default to true.

### `throwOnError`

- Type: `boolean`
- Default: `true`

The errors found will be emitted, default to true.

## StylelintPlugin Options

### `include`

- Type: `string | string[] | RegExp`
- Default: `/.*\.(vue|scss|sass|css|postcss)/`

A single file, or array of files, to include when linting.

### `exclude`

- Type: `string | string[] | RegExp`
- Default: `'node_modules'`

A single file, or array of files, to exclude when linting.

==`@import 'xxxx.scss'` is not support in vite2==

## License

MIT
