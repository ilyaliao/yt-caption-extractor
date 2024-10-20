import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    'src/index',
  ],
  externals: ['cheerio'],
  declaration: true,
  clean: true,
  rollup: {
    emitCJS: true,
  },
})
