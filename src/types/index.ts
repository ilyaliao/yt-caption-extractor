export interface GetCaptionsOptions {
  /**
   * List of language codes.
   *
   * If Empty, all languages will be returned.
   */
  lang?: string[]
  /**
   * If `false`, the ASR captions will be filtered.
   * @default false
   */
  asr?: boolean
}

export interface CaptionLine {
  /**
   * Caption start time.
   */
  start: number
  /**
   * Caption text.
   */
  word: string
}

export interface CaptionRaw {
  baseUrl: string
  name: { simpleText: string }
  vssId: string
  languageCode: string
  kind: 'asr' | 'standard'
  isTranslatable: boolean
  trackName: string
}
