export const endpoints = {
  base: {
    url: process.env.REACT_APP_PUBLIC_URL || "http://localhost:8000/public",
  },
  private: {
    url: process.env.REACT_APP_API_URL || "http://localhost:8000/api",
  },
  streams: {
    url: "streams",
  },
  vods: {
    url: "vods",
  },
};
