import { describe, expect, it } from 'vitest'
import { getVideoInfo } from '../src/video'

describe('getVideoInfo', () => {
  const videoWithInfo = '0wZi0uErnMQ'
  const videoWithoutInfo = 'abcdefg'

  it('should return video info', async () => {
    const videoInfo = await getVideoInfo(videoWithInfo)
    expect(videoInfo).toMatchInlineSnapshot(`
      {
        "allowRatings": true,
        "author": "163braces",
        "channelId": "UCnmeiFVqv64lAmVaw2PUm7w",
        "isCrawlable": true,
        "isLiveContent": false,
        "isOwnerViewing": false,
        "isPrivate": false,
        "isUnpluggedCorpus": false,
        "lengthSeconds": "74",
        "shortDescription": "Inst:https://soundcloud.com/yoasobimusic/yorunikakeruinst",
        "thumbnail": {
          "thumbnails": [
            {
              "height": 94,
              "url": "https://i.ytimg.com/vi/0wZi0uErnMQ/hqdefault.jpg?sqp=-oaymwEiCKgBEF5IWvKriqkDFQgBFQAAAAAYASUAAMhCPQCAokN4AQ==&rs=AOn4CLAdrGqgekSHWHqDgUEleT3J_bbO-w",
              "width": 168,
            },
            {
              "height": 110,
              "url": "https://i.ytimg.com/vi/0wZi0uErnMQ/hqdefault.jpg?sqp=-oaymwEiCMQBEG5IWvKriqkDFQgBFQAAAAAYASUAAMhCPQCAokN4AQ==&rs=AOn4CLAY8tiJ8J_NPfx4GWJtm5MOmcCHGQ",
              "width": 196,
            },
            {
              "height": 138,
              "url": "https://i.ytimg.com/vi/0wZi0uErnMQ/hqdefault.jpg?sqp=-oaymwEjCPYBEIoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLD4X_XN79Cpn2pQ5TxBR_nW1hvP7Q",
              "width": 246,
            },
            {
              "height": 188,
              "url": "https://i.ytimg.com/vi/0wZi0uErnMQ/hqdefault.jpg?sqp=-oaymwEjCNACELwBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLBcU3kE6D-K0jIkY9JTBTI1oHZ8Yg",
              "width": 336,
            },
            {
              "height": 1080,
              "url": "https://i.ytimg.com/vi/0wZi0uErnMQ/maxresdefault.jpg",
              "width": 1920,
            },
          ],
        },
        "title": "YOASOBI 夜に駆ける cover",
        "videoId": "0wZi0uErnMQ",
        "viewCount": "3856712",
      }
    `)
  })

  it('should return null for a video without info', async () => {
    const videoInfo = await getVideoInfo(videoWithoutInfo)
    expect(videoInfo).toBeNull()
  })
})
