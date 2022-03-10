export const getEmbedUrl = (channel: string): string => {
  return (
    "https://player.twitch.tv/?channel=" +
    channel +
    "&parent=" +
    process.env.REACT_APP_DOMAIN +
    "&enableExtensions=false&muted=false&volume=1.0&quality=auto&controls=true&allowFullScreen=true"
  );
};
