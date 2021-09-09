import qs from 'querystring'
import path from 'path'
import type { ESLint } from 'eslint'
import { clearTimeout, setTimeout } from 'timers'

export interface Options {
  /** The cache is enabled by default to decrease execution time */
  cache?: boolean
  /** auto fix source code */
  fix?: boolean
  /**
   * A single file, or array of files, to include when linting.
   * @default eslint /.*\.(vue|js|jsx|ts|tsx)/
   * @default stylelint /.*\.(vue|scss|sass|css|postcss)/
   */
  include?: string | string[] | RegExp
  /**
   * A single file, or array of files, to exclude when linting.
   * @default /node_modules/
   */
  exclude?: string | string[] | RegExp
  /** Custom error formatter or the name of a built-in formatter */
  formatter?: string | ESLint.Formatter
  /** The warings found will be emitted */
  throwOnWarning?: boolean
  /** The errors found will be emitted */
  throwOnError?: boolean
}

export function normalizePath(id: string): string {
  return path.relative(process.cwd(), id).split('?')[0].split(path.sep).join('/')
}

export function checkVueFile(id: string): boolean {
  if (!id.includes('?')) return false

  const rawQuery = id.split('?', 2)[1]

  return qs.parse(rawQuery).vue !== null ? true : false
}

/**
 * Collection of stylelint formatted outputs.
 * Helps to prevent loosing previously added outputs on any Vite dev-server update.
 * @key filePath
 * @value stylelinter output
 */
export type OutputCollection = Map<string, string>

/**
 * Creates specific Map to handle linter outputs
 */
export function createOutputCollection(): OutputCollection {
  return new Map<string, string>()
}

/**
 * Debounce timeout for disaplying outputs
 */
let timeoutId: NodeJS.Timeout

/**
 * Displays error stack via terminal (debounced)
 */
export function displayOutput(collection: OutputCollection): void {
  clearTimeout(timeoutId)
  timeoutId = setTimeout(() => {
    debouncedDisplayOutput(collection)
  }, 200)
}

/**
 * Debounced function to prevent multiple output display at dev-server updates
 */
function debouncedDisplayOutput(collection: OutputCollection): void {
  collection.forEach((output) => {
    console.log(output)
  })
}
