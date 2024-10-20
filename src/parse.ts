export function parseJSON<T = any>(text: string): T | null {
  try {
    return JSON.parse(text) as T
  }
  catch {
    // 移除錯誤日誌
    return null
  }
}
