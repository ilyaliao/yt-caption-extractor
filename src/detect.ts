/**
 * Extracts the string content between two markers.
 */
export function extractBetweenMarkers(
  str: string,
  start: string | RegExp,
  end: string | RegExp,
): string | null {
  let startIndex: number
  if (start instanceof RegExp) {
    const startMatch = str.match(start)
    if (!startMatch)
      return null
    startIndex = startMatch.index! + startMatch[0].length
  }
  else {
    startIndex = str.indexOf(start)
    if (startIndex === -1)
      return null
    startIndex += start.length
  }

  const remainingStr = str.slice(startIndex)

  let endIndex: number
  if (end instanceof RegExp) {
    const endMatch = remainingStr.match(end)
    if (!endMatch)
      return null
    endIndex = endMatch.index!
  }
  else {
    endIndex = remainingStr.indexOf(end)
    if (endIndex === -1)
      return null
  }

  return remainingStr.slice(0, endIndex)
}
