import { describe, expect, it } from 'vitest'
import { getCaptions } from '../src/index'

describe('getCaptions', () => {
  const songWithLyrics = '0wZi0uErnMQ'
  const songWithoutLyrics = 'Pnnw5Tfa0zc'

  it('should retrieve captions for a song with lyrics', async () => {
    const captions = await getCaptions(songWithLyrics)
    expect(captions).not.toBeNull()
    expect(captions?.size).toBeGreaterThan(0)
  })

  it('should retrieve captions for a specified language', async () => {
    const captions = await getCaptions(songWithLyrics, { lang: ['zh-TW'] })
    expect(captions).not.toBeNull()
    expect(captions?.size).toBe(1)
    expect(captions?.has('zh-TW')).toBe(true)
  })

  it('should retrieve captions including ASR when specified', async () => {
    const captionsWithoutASR = await getCaptions(songWithLyrics)
    const captionsWithASR = await getCaptions(songWithLyrics, { asr: true })
    expect(captionsWithASR).not.toBeNull()
    expect(captionsWithASR?.size).toBeGreaterThanOrEqual(captionsWithoutASR?.size ?? 0)
  })

  it('should return null for a song without lyrics', async () => {
    const captions = await getCaptions(songWithoutLyrics)
    expect(captions).not.toBeNull()
    expect(captions?.size).toBe(0)
  })

  it('should return an empty Map when the specified language does not exist', async () => {
    const captions = await getCaptions(songWithLyrics, { lang: ['nonexistent'] })
    expect(captions).not.toBeNull()
    expect(captions?.size).toBe(0)
  })
})
