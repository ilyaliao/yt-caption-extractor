/**
 * YouTube watch page base URL
 */
export const YOUTUBE_WATCH_URL = 'https://www.youtube.com/watch?v='

/**
 * Regular expression for matching caption tracks
 */
export const CAPTION_TRACKS_REGEX = /"captionTracks":\[.*?\]/

/**
 * Regular expression for matching video details
 */
export const VIDEO_INFO_REGEX = /"videoDetails":\s*(\{(?:[^{}]|\{(?:[^{}]|\{[^{}]*\})*\})*\})/
