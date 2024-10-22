import { YOUTUBE_WATCH_URL } from './constants'

export async function getHTMLPageBody(id: string): Promise<string> {
  const url = `${YOUTUBE_WATCH_URL}${id}`
  const response = await fetch(url)
  const body = await response.text()
  return body
}
