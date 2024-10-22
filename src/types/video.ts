export interface Thumbnail {
  url: string
  width: number
  height: number
}

export interface VideoThumbnail {
  thumbnails: Thumbnail[]
}

export interface VideoInfo {
  /** Unique identifier for the video */
  videoId: string
  /** Title of the video */
  title: string
  /** Duration of the video in seconds */
  lengthSeconds: string
  /** Array of keywords associated with the video */
  keywords: string[]
  /** Unique identifier for the channel */
  channelId: string
  /** Indicates if the current viewer is the owner of the video */
  isOwnerViewing: boolean
  /** Brief description of the video */
  shortDescription: string
  /** Indicates if the video can be crawled by search engines */
  isCrawlable: boolean
  /** Thumbnail information for the video */
  thumbnail: VideoThumbnail
  /** Indicates if ratings are allowed for the video */
  allowRatings: boolean
  /** Number of views for the video */
  viewCount: string
  /** Name of the video author */
  author: string
  /** Indicates if the video is private */
  isPrivate: boolean
  /** Indicates if the video is part of an unplugged corpus */
  isUnpluggedCorpus: boolean
  /** Indicates if the content is live */
  isLiveContent: boolean
}
