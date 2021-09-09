import { createFilter } from '@rollup/pluginutils'
import stylelint from 'stylelint'

import { normalizePath, createOutputCollection, displayOutput, Options } from '../utils'

import type { Plugin } from 'vite'

export default function stylelintPlugin(options: Options = {}): Plugin {
  const defaultOptions: Options = {
    include: /.*\.(vue|scss|sass|css|postcss)/,
    exclude: /node_modules/
  }
  const opts = { ...defaultOptions, ...options }
  const filter = createFilter(opts.include, opts.exclude)

  const outputCollection = createOutputCollection()

  return {
    name: 'vite:stylelint',
    async transform(code, id) {
      const file = normalizePath(id)

      if (!filter(id)) {
        return null
      }

      await stylelint
        .lint({
          files: file,
          formatter: 'string'
        })
        .then(({ errored, output }) => {
          if (errored) {
            outputCollection.set(file, output)
          } else if (outputCollection.has(file)) {
            outputCollection.delete(file)
          }
        })
        .catch((error) => {
          // this.error(error)
          console.log(error)
        })
        .finally(() => {
          displayOutput(outputCollection)
        })
    }

    // configureServer() {
    //   console.log('vite-plugin-stylelint enabled')
    // }
  }
}
