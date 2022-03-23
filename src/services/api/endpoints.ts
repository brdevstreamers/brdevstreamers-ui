import config from "../../utils/config";

export const endpoints = {
  base: {
    url: config.baseUrl,
  },
  channels: {
    url: "public/streams",
  },
  contributors: {
    url: "public/contributors",
  },
  vods: {
    url: "public/vods",
  },
  tags: {
    url: "public/tags",
  },
};
