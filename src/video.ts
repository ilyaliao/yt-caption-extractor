import { VIDEO_INFO_REGEX, YOUTUBE_WATCH_URL } from './constants'
import { parseJSON } from './parse'
import type { VideoInfo } from './types'

export async function getHTMLPageBody(id: string): Promise<string> {
  const url = `${YOUTUBE_WATCH_URL}${id}`
  const response = await fetch(url)
  const body = await response.text()
  return body
}

export async function getVideoInfo(id: string): Promise<VideoInfo | null> {
  const body = await getHTMLPageBody(id)

  const videoDetailsMatch = body.match(VIDEO_INFO_REGEX)
  if (!videoDetailsMatch) {
    return null
  }

  const videoDetailsString = videoDetailsMatch[1]
  const videoDetails = parseJSON<VideoInfo>(videoDetailsString)
  return videoDetails
}
