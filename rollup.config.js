import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
// import alias from 'rollup-plugin-path-alias'
import uglify from 'rollup-plugin-uglify'

import {resolve as resolvePath} from 'path'

const {plugins, presets} = require('./.babelrc.js')

const rollupPlugins = [
 // alias({
 //  paths: {
 //   '@effector/effector': resolvePackage('effector'),
 //   '@effector/store': resolvePackage('store'),
 //   '@effector/derive': resolvePackage('derive'),
 //  },
 //  extensions: ['js'],
 // }),
 resolve({
  jail: resolvePath(__dirname, 'src'),
 }),
 babel({
  presets,
  plugins,
  runtimeHelpers: true,
 }),
 uglify({
  mangle: {
   toplevel: true,
  },
  compress: {
   pure_getters: true,
  },
  output: {
   comments: /#/i,
   // beautify: true,
   // indent_level: 2,
  },
 }),
]

export default [
 {
  input: 'src/index.js',
  output: [
   {
    file: resolvePath(__dirname, 'npm/effector/effector.es.js'),
    format: 'es',
    name: 'effector',
    sourcemap: true,
   },
   {
    file: resolvePath(__dirname, 'npm/effector/effector.cjs.js'),
    format: 'cjs',
    name: 'effector',
    sourcemap: true,
   },
  ],

  plugins: rollupPlugins,
 },
 {
  input: 'src/react/index.js',
  output: [
   {
    file: resolvePath(__dirname, 'npm/react/effector-react.es.js'),
    format: 'es',
    name: 'effector-react',
    sourcemap: true,
   },
   {
    file: resolvePath(__dirname, 'npm/react/effector-react.cjs.js'),
    format: 'cjs',
    name: 'effector-react',
    sourcemap: true,
   },
  ],

  plugins: rollupPlugins,
 },
]