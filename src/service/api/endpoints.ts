export const endpoints = {
  base: {
    url: process.env.REACT_APP_API_URL || "http://localhost:8080",
  },
  channels: {
    url: "streams",
  },
  vods: {
    url: "vods",
  },
  tags: {
    url: "tags",
  },
  stats: {
    url: "stats",
  },
  stats_summary: {
    url: "stats/summary",
  },
};
