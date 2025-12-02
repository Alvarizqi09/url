// src/hooks/queryKeys.js
export const queryKeys = {
  urls: {
    all: ["urls"],
    byUser: (userId) => ["urls", userId],
    detail: (urlId, userId) => ["urls", "detail", urlId, userId],
  },
  clicks: {
    all: ["clicks"],
    byUrls: (urlIds) => ["clicks", "urls", urlIds],
    byUrl: (urlId) => ["clicks", "url", urlId],
  },
  auth: {
    user: ["auth", "user"],
  },
};
