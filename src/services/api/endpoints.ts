import config from "../../utils/config";

export const endpoints = {
  base: {
    url: config.baseUrl,
  },
  channels: {
    url: "public/streams",
  },
  vods: {
    url: "public/vods",
  },
  tags: {
    url: "public/tags",
  },
};
