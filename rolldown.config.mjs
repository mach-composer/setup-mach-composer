import {defineConfig} from 'rolldown'

export default defineConfig({
  input: 'src/main.ts',
  platform: 'node',
  output: {
    file: 'dist/index.js',
    format: 'cjs',
    sourcemap: true
  }
})
