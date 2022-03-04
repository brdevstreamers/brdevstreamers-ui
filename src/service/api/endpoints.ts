export const endpoints = {
  base: {
    url: process.env.NEXT_PUBLIC_API_URL || "https://brstreamers.dev:8000/public/",
  },
  streams: {
    url: "streams",
  },
  vods: {
    url: "vods",
  },
};
