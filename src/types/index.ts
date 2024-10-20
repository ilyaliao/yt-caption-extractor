/**
 * 獲取字幕的選項
 */
export interface GetCaptionsOptions {
  /**
   * 語言代碼列表
   */
  lang?: string[]
  /**
   * 是否過濾掉由自動語音識別 (ASR) 產生的字幕
   *
   * @default false
   */
  asr?: boolean
}

/**
 * 格式化後的字幕行
 */
export interface CaptionLine {
  /**
   * 字幕開始時間（以秒為單位）
   */
  start: number
  /**
   * 字幕文字
   */
  word: string
}

/**
 * 原始的字幕資料
 */
export interface CaptionRaw {
  baseUrl: string
  name: { simpleText: string }
  vssId: string
  languageCode: string
  kind: 'asr' | 'standard' // 根據實際情況調整
  isTranslatable: boolean
  trackName: string
}
