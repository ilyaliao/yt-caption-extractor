import * as cheerio from 'cheerio'
import { YOUTUBE_WATCH_URL } from './constants'
import { extractBetweenMarkers } from './detect'
import { parseJSON } from './parse'
import type { CaptionLine, CaptionRaw, GetCaptionsOptions } from './types'

function createWatchPageUrl(videoId: string): string {
  return `${YOUTUBE_WATCH_URL}${videoId}&hl='en'&bpctr=${Math.ceil(Date.now() / 1000)}&has_verified=1`
}

async function getHTMLPageBody(id: string): Promise<string> {
  const url = createWatchPageUrl(id)
  const response = await fetch(url)
  const body = await response.text()
  return body
}

async function getPlayerResponseText(id: string): Promise<string | null> {
  const body = await getHTMLPageBody(id)
  const text = extractBetweenMarkers(body, 'var ytInitialPlayerResponse = ', ';</script>')

  if (text == null)
    return null

  return text
}

async function getCaptionsRaw(id: string, lang: string[] = [], asr = false): Promise<CaptionRaw[] | null> {
  try {
    const playerResponseText = await getPlayerResponseText(id)
    if (!playerResponseText)
      return null

    const playerResponse = parseJSON(playerResponseText)
    const captionTracks: CaptionRaw[] = playerResponse?.captions?.playerCaptionsTracklistRenderer?.captionTracks ?? []

    const captionTracksFiltered = captionTracks.filter(caption => lang.length === 0 || lang.includes(caption.languageCode))
    return asr ? captionTracksFiltered : captionTracksFiltered.filter(caption => caption.kind !== 'asr')
  }
  catch {
    return null
  }
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

  if (!captionTracks || captionTracks.length === 0) {
    return null
  }

  const urlMap = new Map<string, string>()
  captionTracks.forEach((caption) => {
    urlMap.set(caption.languageCode, caption.baseUrl)
  })

  return processCaptions(urlMap)
}
