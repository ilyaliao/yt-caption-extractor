# yt-caption-extractor

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![JSDocs][jsdocs-src]][jsdocs-href]
[![License][license-src]][license-href]

Extract YouTube Video **lyrics** and **video information**.

## Usage

```bash
npm i yt-caption-extractor
```

```ts
import { getCaptions, getVideoInfo } from 'yt-caption-extractor'

const captions = await getCaptions('SX_ViT4Ra7k')
console.log(captions)

const videoInfo = await getVideoInfo('SX_ViT4Ra7k')
console.log(videoInfo)
```

## Why?

This library is tailor-made for [maru.re](https://maru.re/), designed to extract **lyrics** and **video information** from YouTube videos. Initially, I considered using [ytdl-core](https://github.com/distubejs/ytdl-core), but due to its large size and lack of ESM support, so I took an afternoon to create this library.

## License

[MIT](./LICENSE) License © 2024-PRESENT [Ilya Liao](https://github.com/ilyaliao)

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/yt-caption-extractor?style=flat&colorA=080f12&colorB=1fa669
[npm-version-href]: https://npmjs.com/package/yt-caption-extractor
[npm-downloads-src]: https://img.shields.io/npm/dm/yt-caption-extractor?style=flat&colorA=080f12&colorB=1fa669
[npm-downloads-href]: https://npmjs.com/package/yt-caption-extractor
[bundle-src]: https://img.shields.io/bundlephobia/minzip/yt-caption-extractor?style=flat&colorA=080f12&colorB=1fa669&label=minzip
[bundle-href]: https://bundlephobia.com/result?p=yt-caption-extractor
[license-src]: https://img.shields.io/github/license/ilyaliao/yt-caption-extractor.svg?style=flat&colorA=080f12&colorB=1fa669
[license-href]: https://github.com/ilyaliao/yt-caption-extractor/blob/main/LICENSE
[jsdocs-src]: https://img.shields.io/badge/jsdocs-reference-080f12?style=flat&colorA=080f12&colorB=1fa669
[jsdocs-href]: https://www.jsdocs.io/package/yt-caption-extractor
