import * as cheerio from 'cheerio'
import { fetch } from 'ofetch'
import { CAPTION_TRACKS_REGEX, YOUTUBE_WATCH_URL } from './constants'
import { parseJSON } from './parse'
import type { CaptionLine, CaptionRaw, GetCaptionsOptions } from './types'

async function getHTMLPageBody(id: string): Promise<string> {
  const url = `${YOUTUBE_WATCH_URL}${id}`
  const response = await fetch(url)
  const body = await response.text()
  return body
}

async function getCaptionTracksText(id: string): Promise<string | null> {
  const body = await getHTMLPageBody(id)
  if (!body.includes('captionTracks'))
    return null

  const match = CAPTION_TRACKS_REGEX.exec(body)
  if (!match)
    return null

  return match[0]
}

async function getCaptionsRaw(id: string, lang: string[] = [], asr = false): Promise<CaptionRaw[] | null> {
  const captionTracksText = await getCaptionTracksText(id)
  if (!captionTracksText)
    return null

  const { captionTracks }: { captionTracks: CaptionRaw[] } = parseJSON(`{${captionTracksText}}`) ?? { captionTracks: [] }

  const captionTracksFiltered = captionTracks.filter(caption =>
    lang.length === 0 || lang.includes(caption.languageCode),
  )

  return captionTracksFiltered.filter(caption => asr || caption.kind !== 'asr')
}

async function processCaptions(urlMap: Map<string, string>): Promise<Map<string, CaptionLine[]>> {
  const resultMap = new Map<string, CaptionLine[]>()

  const promises = Array.from(urlMap.entries()).map(async ([lang, url]) => {
    const res = await fetch(url)
    const xmlText = await res.text()
    const $ = cheerio.load(xmlText, { xmlMode: true })

    const captions: CaptionLine[] = []
    $('text').each((_index, element) => {
      const $element = $(element)
      const start = Number.parseFloat($element.attr('start') ?? '0')
      const text = $element.text()

      captions.push({ start, word: text })
    })

    resultMap.set(lang, captions)
  })

  await Promise.all(promises)
  return resultMap
}

export async function getCaptions(id: string, options?: GetCaptionsOptions): Promise<Map<string, CaptionLine[]> | null> {
  const { lang = [], asr = false } = options ?? {}
  const captionTracks = await getCaptionsRaw(id, lang, asr)
  if (!captionTracks || captionTracks.length === 0)
    return null

  const urlMap = new Map<string, string>()
  captionTracks.forEach((caption) => {
    urlMap.set(caption.languageCode, caption.baseUrl)
  })

  return processCaptions(urlMap)
}
